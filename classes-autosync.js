#!/usr/bin/env node

/**
 * Classes Files Auto-Sync System
 * Automatically syncs class lesson files to GitHub
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class ClassesAutoSync {
    constructor() {
        this.classesDir = path.join(__dirname, 'Classes');
    }

    /**
     * Check if there are changes in the Classes folder
     */
    hasChanges() {
        try {
            // Check for changes in the Classes directory
            const status = execSync('git status --porcelain Classes/', {
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
            const status = execSync('git status --porcelain Classes/', {
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
                console.log('✅ No changes to commit in Classes folder');
                return { pushed: false, reason: 'no changes' };
            }

            const changedFiles = this.getChangedFiles();
            console.log(`\n📝 Changes detected in Classes:`);
            changedFiles.forEach(file => {
                const statusSymbol = file.status.includes('M') ? '📝' :
                                   file.status.includes('A') ? '➕' :
                                   file.status.includes('D') ? '➖' :
                                   file.status.includes('?') ? '🆕' : '📄';
                console.log(`   ${statusSymbol} ${file.file}`);
            });

            // Stage all changes in Classes directory
            console.log('\n📦 Staging changes...');
            execSync('git add Classes/', {
                cwd: __dirname,
                stdio: 'inherit'
            });

            // Create commit message
            const timestamp = new Date().toLocaleString();
            const commitMessage = `Classes update: ${timestamp} - Class lesson files updated`;

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

            console.log(`\n✅ Class files successfully pushed to GitHub!`);
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
     * List all class files
     */
    listClassFiles() {
        try {
            const files = fs.readdirSync(this.classesDir)
                .filter(file => file.endsWith('.html'))
                .sort();

            console.log(`\n📚 Class Lesson Files (${files.length}):\n`);

            files.forEach((file, i) => {
                console.log(`   ${i + 1}. ${file}`);
            });

            console.log();
        } catch (error) {
            console.error('❌ Error listing class files:', error.message);
        }
    }

    /**
     * Start auto-sync
     */
    startAutoSync(intervalMinutes = 5) {
        console.log(`🔄 Starting Classes Auto-Sync every ${intervalMinutes} minutes...\n`);
        console.log(`📁 Monitoring: ${this.classesDir}`);
        console.log(`🌐 Repository: GitHub (students/master)\n`);

        // Initial push
        this.pushToGitHub().catch(err => {
            console.error('❌ Initial sync failed:', err.message);
        });

        const interval = setInterval(async () => {
            try {
                console.log(`\n⏰ Classes auto-sync triggered at ${new Date().toLocaleTimeString()}`);
                await this.pushToGitHub();
            } catch (error) {
                console.error('❌ Auto-sync failed:', error.message);
            }
        }, intervalMinutes * 60 * 1000);

        // Graceful shutdown
        process.on('SIGINT', () => {
            console.log('\n🛑 Stopping Classes auto-sync...');
            clearInterval(interval);
            process.exit(0);
        });

        return interval;
    }
}

// CLI Interface
if (require.main === module) {
    const manager = new ClassesAutoSync();
    const args = process.argv.slice(2);

    async function main() {
        if (args.length === 0) {
            console.log(`
📚 Classes Files Auto-Sync System

This tool automatically syncs class lesson files to GitHub

Usage:
  node classes-autosync.js <command> [options]

Commands:
  sync            - Sync class files to GitHub now
  auto [minutes]  - Start auto-sync (default: 5 minutes)
  list            - List all class lesson files
  status          - Check current status

Examples:
  node classes-autosync.js sync
  node classes-autosync.js auto 10
  node classes-autosync.js list
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
                    manager.listClassFiles();
                    break;

                case 'status':
                    const hasChanges = manager.hasChanges();
                    const changes = manager.getChangedFiles();
                    console.log(`\n📊 Class Files Status:\n`);
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
                    console.log('Use "node classes-autosync.js" to see available commands');
            }
        } catch (error) {
            console.error('❌ Command failed:', error.message);
            process.exit(1);
        }
    }

    main();
}

module.exports = ClassesAutoSync;
