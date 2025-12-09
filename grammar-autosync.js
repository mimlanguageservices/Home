#!/usr/bin/env node

/**
 * English Grammar Files Auto-Sync System
 * Automatically syncs grammar lesson files to GitHub
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class GrammarAutoSync {
    constructor() {
        this.grammarDir = path.join(__dirname, 'English-Grammar');
        this.gitRemote = 'grammar'; // We'll add this remote to push to separate repo
    }

    /**
     * Check if there are changes in the English-Grammar folder
     */
    hasChanges() {
        try {
            // Check for changes in the English-Grammar directory
            const status = execSync('git status --porcelain English-Grammar/', {
                cwd: __dirname,
                encoding: 'utf8'
            });

            return status.trim().length > 0;
        } catch (error) {
            console.error('❌ Error checking git status:', error.message);
            return false;
        }
    }

    /**
     * Get list of changed files
     */
    getChangedFiles() {
        try {
            const status = execSync('git status --porcelain English-Grammar/', {
                cwd: __dirname,
                encoding: 'utf8'
            });

            const lines = status.trim().split('\n').filter(l => l);
            return lines.map(line => {
                const parts = line.trim().split(/\s+/);
                return {
                    status: parts[0],
                    file: parts.slice(1).join(' ')
                };
            });
        } catch (error) {
            console.error('❌ Error getting changed files:', error.message);
            return [];
        }
    }

    /**
     * Commit and push changes to GitHub
     */
    async pushToGitHub() {
        try {
            if (!this.hasChanges()) {
                console.log('✅ No changes to commit in English-Grammar folder');
                return { pushed: false, reason: 'no changes' };
            }

            const changedFiles = this.getChangedFiles();
            console.log(`\n📝 Changes detected in English-Grammar:`);
            changedFiles.forEach(file => {
                const statusSymbol = file.status.includes('M') ? '📝' :
                                   file.status.includes('A') ? '➕' :
                                   file.status.includes('D') ? '➖' : '📄';
                console.log(`   ${statusSymbol} ${file.file}`);
            });

            // Stage all changes in English-Grammar directory
            console.log('\n📦 Staging changes...');
            execSync('git add English-Grammar/', {
                cwd: __dirname,
                stdio: 'inherit'
            });

            // Create commit message
            const timestamp = new Date().toLocaleString();
            const commitMessage = `Grammar update: ${timestamp} - Grammar lesson files updated`;

            console.log('💾 Creating commit...');
            execSync(`git commit -m "${commitMessage}"`, {
                cwd: __dirname,
                stdio: 'inherit'
            });

            // Push to main repository (students remote)
            console.log('🚀 Pushing to GitHub (students repository)...');
            execSync('git push students master', {
                cwd: __dirname,
                stdio: 'inherit'
            });

            console.log(`\n✅ Grammar files successfully pushed to GitHub!`);
            console.log(`   📊 Files updated: ${changedFiles.length}`);
            console.log(`   ⏰ Timestamp: ${timestamp}`);

            return {
                pushed: true,
                filesCount: changedFiles.length,
                timestamp
            };

        } catch (error) {
            console.error('❌ Failed to push to GitHub:', error.message);
            throw error;
        }
    }

    /**
     * List all grammar files
     */
    listGrammarFiles() {
        try {
            const files = fs.readdirSync(this.grammarDir)
                .filter(file => file.endsWith('.html'))
                .sort();

            console.log(`\n📚 Grammar Lesson Files (${files.length}):\n`);

            const a1Files = files.filter(f => f.startsWith('A1-'));
            const a2Files = files.filter(f => f.startsWith('A2-'));
            const b1Files = files.filter(f => f.startsWith('B1-'));

            console.log(`   📗 A1 Level: ${a1Files.length} lessons`);
            a1Files.forEach((file, i) => {
                console.log(`      ${i + 1}. ${file}`);
            });

            console.log(`\n   📘 A2 Level: ${a2Files.length} lessons`);
            a2Files.forEach((file, i) => {
                console.log(`      ${i + 1}. ${file}`);
            });

            console.log(`\n   📙 B1 Level: ${b1Files.length} lessons`);
            b1Files.forEach((file, i) => {
                console.log(`      ${i + 1}. ${file}`);
            });

            console.log();
        } catch (error) {
            console.error('❌ Error listing grammar files:', error.message);
        }
    }

    /**
     * Start auto-sync
     */
    startAutoSync(intervalMinutes = 5) {
        console.log(`🔄 Starting Grammar Auto-Sync every ${intervalMinutes} minutes...\n`);
        console.log(`📁 Monitoring: ${this.grammarDir}`);
        console.log(`🌐 Repository: GitHub (students/master)\n`);

        // Initial push
        this.pushToGitHub().catch(err => {
            console.error('❌ Initial sync failed:', err.message);
        });

        const interval = setInterval(async () => {
            try {
                console.log(`\n⏰ Grammar auto-sync triggered at ${new Date().toLocaleTimeString()}`);
                await this.pushToGitHub();
            } catch (error) {
                console.error('❌ Auto-sync failed:', error.message);
            }
        }, intervalMinutes * 60 * 1000);

        // Graceful shutdown
        process.on('SIGINT', () => {
            console.log('\n🛑 Stopping Grammar auto-sync...');
            clearInterval(interval);
            process.exit(0);
        });

        return interval;
    }
}

// CLI Interface
if (require.main === module) {
    const manager = new GrammarAutoSync();
    const args = process.argv.slice(2);

    async function main() {
        if (args.length === 0) {
            console.log(`
📚 English Grammar Files Auto-Sync System

This tool automatically syncs grammar lesson files to GitHub

Usage:
  node grammar-autosync.js <command> [options]

Commands:
  sync            - Sync grammar files to GitHub now
  auto [minutes]  - Start auto-sync (default: 5 minutes)
  list            - List all grammar lesson files
  status          - Check current status

Examples:
  node grammar-autosync.js sync
  node grammar-autosync.js auto 10
  node grammar-autosync.js list
            `);
            return;
        }

        const command = args[0].toLowerCase();

        try {
            switch (command) {
                case 'sync':
                    await manager.pushToGitHub();
                    break;

                case 'auto':
                    const minutes = parseInt(args[1]) || 5;
                    manager.startAutoSync(minutes);
                    break;

                case 'list':
                    manager.listGrammarFiles();
                    break;

                case 'status':
                    const hasChanges = manager.hasChanges();
                    const changes = manager.getChangedFiles();
                    console.log(`\n📊 Grammar Files Status:\n`);
                    if (hasChanges) {
                        console.log(`   ⚠️  ${changes.length} file(s) with changes:`);
                        changes.forEach(file => {
                            console.log(`      ${file.status} ${file.file}`);
                        });
                    } else {
                        console.log(`   ✅ All files synced - no changes`);
                    }
                    console.log();
                    break;

                default:
                    console.error(`❌ Unknown command: ${command}`);
                    console.log('Use "node grammar-autosync.js" to see available commands');
            }
        } catch (error) {
            console.error('❌ Command failed:', error.message);
            process.exit(1);
        }
    }

    main();
}

module.exports = GrammarAutoSync;
