#!/usr/bin/env node

/**
 * Integrated File Management System
 * Manages both student HTML files and teacher dashboard files from Google Sheets
 * Combines functionality of student-file-manager.js and teacher dashboard generation
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');

// Import the existing student file manager
const StudentFileManager = require('./student-file-manager.js');

class IntegratedFileManager {
    constructor() {
        // Initialize student manager
        this.studentManager = new StudentFileManager();
        
        // Teacher-specific properties
        this.sheetsId = '1e2ppEZlcrZENPHMMyIAtNxqCvqHnxCl_FuR3NUX046I';
        this.teacherTemplatePath = path.join(__dirname, 'Teacher-Template.html');
        this.teachersDir = __dirname;
        
        // Column mapping (same as student manager)
        this.columnMap = {
            ASSIGNED_TEACHER: 0,    // Column A - Teacher Name
            STUDENT_NAME: 1,        // Column B
            CONTRACT: 2,            // Column C
            LEVEL: 3,               // Column D
            FINISHED_ACTIVITIES: 4, // Column E
            WORKPLACE: 5,           // Column F
            ROLE: 6,                // Column G
            NATIONALITY: 7,         // Column H
            LOCATION: 8,            // Column I
            EMAIL: 9,               // Column J
            WHATSAPP: 10,           // Column K
            IMAGE_URL: 11,          // Column L
            CLASS_LINK: 12,         // Column M
            CLASS_IDENTIFIER: 13,   // Column N
            LEARNING_OBJECTIVE: 14, // Column O
            VOCABULARY_URL: 15      // Column P
        };
        
        this.existingTeacherFiles = new Set();
        this.scanExistingTeacherFiles();
    }

    /**
     * Scan existing teacher dashboard files
     */
    scanExistingTeacherFiles() {
        try {
            const files = fs.readdirSync(this.teachersDir);
            files.forEach(file => {
                if (file.endsWith('-Teacher-Dashboard.html')) {
                    const teacherName = file.replace('-Teacher-Dashboard.html', '').replace(/-/g, ' ');
                    this.existingTeacherFiles.add(teacherName);
                }
            });
            console.log(`📁 Found ${this.existingTeacherFiles.size} existing teacher dashboard files`);
        } catch (error) {
            console.error('❌ Error scanning teacher files:', error.message);
        }
    }

    /**
     * Fetch data from Google Sheets (reuse student manager's method)
     */
    async fetchSheetData() {
        return this.studentManager.fetchStudentsData();
    }

    /**
     * Extract unique teachers from student data
     */
    extractTeachers(studentsData) {
        const teacherMap = new Map();
        
        studentsData.forEach(student => {
            const teacherName = student.assignedTeacher;
            
            if (teacherName && teacherName.trim()) {
                const teacher = teacherName.trim();
                
                if (!teacherMap.has(teacher)) {
                    teacherMap.set(teacher, {
                        name: teacher,
                        students: [],
                        fileName: this.generateTeacherFileName(teacher)
                    });
                }
                
                // Add student to teacher's list
                teacherMap.get(teacher).students.push(student);
            }
        });
        
        console.log(`📊 Found ${teacherMap.size} unique teachers from student data`);
        return Array.from(teacherMap.values());
    }

    /**
     * Generate teacher dashboard filename
     */
    generateTeacherFileName(teacherName) {
        return teacherName.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '-') + '-Teacher-Dashboard.html';
    }

    /**
     * Read teacher template
     */
    readTeacherTemplate() {
        try {
            return fs.readFileSync(this.teacherTemplatePath, 'utf8');
        } catch (error) {
            throw new Error(`Failed to read teacher template: ${error.message}`);
        }
    }

    /**
     * Update teacher configuration in template
     */
    updateTeacherConfig(template, teacher) {
        // Extract unique platforms from teacher's students
        const platforms = [...new Set(teacher.students
            .map(s => s.contract)
            .filter(c => c && c.trim())
        )];
        
        // If no platforms found, use defaults
        if (platforms.length === 0) {
            platforms.push('MIM', 'Linked', 'Italki', 'Preply');
        }
        
        // Count active classes
        const activeClasses = teacher.students.filter(s => s.classLink && s.classLink.trim()).length;
        
        // Generate teacher configuration
        const configScript = `
    <!-- TEACHER CONFIGURATION -->
    <script>
        const TEACHER_CONFIG = {
            // Basic Information - Auto-generated from Google Sheets
            teacherName: '${teacher.name}',
            teacherTitle: 'English Teacher',
            headerTitle: "${teacher.name}'s Dashboard",
            
            // Google Sheets URL - Using the main sheet
            sheetUrl: 'https://docs.google.com/spreadsheets/d/${this.sheetsId}/edit',
            
            // Profile Image - Default avatar, teacher can update later
            profileImage: 'https://ui-avatars.com/api/?name=${encodeURIComponent(teacher.name)}&size=300&background=667eea&color=ffffff',
            
            // Website Information
            websiteUrl: 'https://www.mimlanguageservices.com/',
            websiteLogo: 'https://static.wixstatic.com/media/593d03_21d7db92a5cc4b1c9633f867764de873~mv2.png',
            
            // Tab Configuration
            tabs: {
                home: { show: true, label: 'Home' },
                students: { show: true, label: 'Students' },
                invoicing: { show: true, label: 'Invoicing' },
                work: { show: true, label: 'Call' }
            },
            
            // Student Platforms - Dynamic based on assigned students
            platforms: ${JSON.stringify(platforms)},
            
            // GitHub Pages Base URL for student profiles
            githubPagesUrl: 'https://mimlanguageservices.github.io/Students/',
            
            // Auto-generated metadata
            totalStudents: ${teacher.students.length},
            activeClasses: ${activeClasses},
            assignedTeacher: '${teacher.name}',
            lastUpdated: '${new Date().toLocaleString()}'
        };
    </script>`;
        
        // Replace the template configuration
        const configRegex = /<!-- TEACHER CONFIGURATION -->[\s\S]*?<\/script>/;
        return template.replace(configRegex, configScript);
    }

    /**
     * Create or update teacher dashboard file
     */
    createTeacherFile(teacher) {
        try {
            const template = this.readTeacherTemplate();
            const updatedHtml = this.updateTeacherConfig(template, teacher);
            
            const filePath = path.join(this.teachersDir, teacher.fileName);
            fs.writeFileSync(filePath, updatedHtml, 'utf8');
            
            console.log(`✅ Created/Updated: ${teacher.fileName} (${teacher.students.length} students)`);
            return true;
        } catch (error) {
            console.error(`❌ Error creating ${teacher.fileName}:`, error.message);
            return false;
        }
    }

    /**
     * Delete teacher dashboard file
     */
    deleteTeacherFile(teacherName) {
        try {
            const fileName = this.generateTeacherFileName(teacherName);
            const filePath = path.join(this.teachersDir, fileName);
            
            // SAFETY CHECK: Only delete teacher dashboard files
            if (!fileName.endsWith('-Teacher-Dashboard.html')) {
                console.log(`🛡️  PROTECTED: Refusing to delete non-teacher file: ${fileName}`);
                return false;
            }
            
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
                console.log(`🗑️  Deleted: ${fileName}`);
                return true;
            }
            return false;
        } catch (error) {
            console.error(`❌ Error deleting teacher file:`, error.message);
            return false;
        }
    }

    /**
     * Sync all teacher dashboard files
     */
    async syncTeacherFiles(studentsData) {
        console.log('\n🔄 Syncing teacher dashboards...');
        
        const teachers = this.extractTeachers(studentsData);
        const currentTeachers = new Set(teachers.map(t => t.name));
        
        let created = 0;
        let updated = 0;
        let deleted = 0;
        
        // Create/Update files for current teachers
        for (const teacher of teachers) {
            if (this.existingTeacherFiles.has(teacher.name)) {
                if (this.createTeacherFile(teacher)) updated++;
            } else {
                if (this.createTeacherFile(teacher)) created++;
            }
        }
        
        // Delete files for teachers no longer in the sheet
        for (const existingTeacher of this.existingTeacherFiles) {
            if (!currentTeachers.has(existingTeacher)) {
                if (this.deleteTeacherFile(existingTeacher)) deleted++;
            }
        }
        
        // Update the existing files set
        this.existingTeacherFiles = currentTeachers;
        
        console.log(`\n📈 Teacher sync complete:`);
        console.log(`   ✅ Created: ${created} dashboards`);
        console.log(`   🔄 Updated: ${updated} dashboards`);
        console.log(`   🗑️  Deleted: ${deleted} dashboards`);
        console.log(`   👥 Total: ${teachers.length} teacher dashboards`);
        
        return { created, updated, deleted, total: teachers.length };
    }

    /**
     * Full sync - both students and teachers
     */
    async syncAll() {
        console.log('🔄 Starting integrated sync (Students + Teachers)...\n');
        
        try {
            // First sync student files
            const studentResults = await this.studentManager.syncAllFiles();
            
            // Get the student data for teacher sync
            const studentsData = await this.studentManager.fetchStudentsData();
            
            // Then sync teacher dashboards
            const teacherResults = await this.syncTeacherFiles(studentsData);
            
            console.log('\n📊 === FULL SYNC SUMMARY ===');
            console.log(`   📚 Students: ${studentResults.total} files`);
            console.log(`   👥 Teachers: ${teacherResults.total} dashboards`);
            console.log(`   ✅ Total files managed: ${studentResults.total + teacherResults.total}`);
            
            return { students: studentResults, teachers: teacherResults };
        } catch (error) {
            console.error('❌ Integrated sync failed:', error.message);
            throw error;
        }
    }

    /**
     * Push all changes to GitHub
     */
    async pushToGitHub() {
        return this.studentManager.pushToGitHub();
    }

    /**
     * Start auto-sync for both students and teachers
     */
    startAutoSync(intervalMinutes = 2) {
        console.log(`🔄 Starting integrated auto-sync every ${intervalMinutes} minutes...`);
        
        // Initial sync
        this.syncAll().then(() => this.pushToGitHub());
        
        const interval = setInterval(async () => {
            try {
                console.log(`\n⏰ Integrated auto-sync triggered at ${new Date().toLocaleTimeString()}`);
                await this.syncAll();
                await this.pushToGitHub();
            } catch (error) {
                console.error('❌ Auto-sync failed:', error.message);
            }
        }, intervalMinutes * 60 * 1000);
        
        // Graceful shutdown
        process.on('SIGINT', () => {
            console.log('\n🛑 Stopping integrated auto-sync...');
            clearInterval(interval);
            process.exit(0);
        });
        
        return interval;
    }

    /**
     * List all managed files
     */
    async listAll() {
        console.log('\n📋 === MANAGED FILES SUMMARY ===\n');
        
        // List students
        await this.studentManager.listStudents();
        
        // List teachers
        const studentsData = await this.studentManager.fetchStudentsData();
        const teachers = this.extractTeachers(studentsData);
        
        console.log(`👥 Teachers with dashboards (${teachers.length}):`);
        teachers.forEach((teacher, index) => {
            const fileExists = this.existingTeacherFiles.has(teacher.name) ? '✅' : '❌';
            const platforms = [...new Set(teacher.students.map(s => s.contract).filter(c => c))].join(', ');
            console.log(`   ${index + 1}. ${fileExists} ${teacher.name} - ${teacher.students.length} students (${platforms || 'No platforms'})`);
        });
        console.log();
    }
}

// CLI Interface
if (require.main === module) {
    const manager = new IntegratedFileManager();
    const args = process.argv.slice(2);
    
    async function main() {
        if (args.length === 0) {
            console.log(`
🎓 Integrated File Management System

This tool manages BOTH student profile pages AND teacher dashboards from Google Sheets

Usage:
  node integrated-file-manager.js <command> [options]

Commands:
  sync            - Sync all student files AND teacher dashboards
  auto [minutes]  - Start auto-sync (default: 2 minutes)
  list            - List all students and teachers
  
Features:
  ✅ Creates student profile HTML files (Column B)
  ✅ Creates teacher dashboard files (Column A - unique values)
  ✅ Updates all files when Google Sheets changes
  ✅ Removes files when entries are deleted
  ✅ Pushes all changes to GitHub automatically

Examples:
  node integrated-file-manager.js sync
  node integrated-file-manager.js auto 5
  node integrated-file-manager.js list
            `);
            return;
        }
        
        const command = args[0].toLowerCase();
        
        try {
            switch (command) {
                case 'sync':
                    await manager.syncAll();
                    await manager.pushToGitHub();
                    break;
                    
                case 'auto':
                    const minutes = parseInt(args[1]) || 2;
                    manager.startAutoSync(minutes);
                    break;
                    
                case 'list':
                    await manager.listAll();
                    break;
                    
                default:
                    console.error(`❌ Unknown command: ${command}`);
                    console.log('Use "node integrated-file-manager.js" to see available commands');
            }
        } catch (error) {
            console.error('❌ Command failed:', error.message);
            process.exit(1);
        }
    }
    
    main();
}

module.exports = IntegratedFileManager;