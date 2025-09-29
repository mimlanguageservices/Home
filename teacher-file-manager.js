#!/usr/bin/env node

/**
 * Dynamic Teacher HTML File Management System
 * Creates and updates teacher dashboard files based on unique teachers in Column A of Google Sheets
 * Uses Teacher-Template.html to generate personalized dashboards for each teacher
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

class TeacherFileManager {
    constructor() {
        this.sheetsId = '1e2ppEZlcrZENPHMMyIAtNxqCvqHnxCl_FuR3NUX046I';
        this.templatePath = path.join(__dirname, 'Teacher-Template.html');
        this.teachersDir = __dirname;
        
        // Column mapping
        this.columnMap = {
            ASSIGNED_TEACHER: 0,    // Column A - Teacher Name (dropdown)
            STUDENT_NAME: 1,        // Column B
            CONTRACT: 2,            // Column C
            LEVEL: 3,               // Column D
            // ... rest of columns same as student manager
        };
        
        this.existingTeacherFiles = new Set();
        this.scanExistingFiles();
    }

    /**
     * Scan existing teacher HTML files
     */
    scanExistingFiles() {
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
            console.error('❌ Error scanning existing files:', error.message);
        }
    }

    /**
     * Fetch data from Google Sheets
     */
    async fetchSheetData() {
        return new Promise((resolve, reject) => {
            const url = `https://docs.google.com/spreadsheets/d/${this.sheetsId}/export?format=csv&gid=0`;

            https.get(url, (response) => {
                let data = '';

                // Handle redirects
                if (response.statusCode === 301 || response.statusCode === 302 || response.statusCode === 307) {
                    const redirectUrl = response.headers.location;
                    console.log(`🔄 Following redirect...`);

                    https.get(redirectUrl, (redirectResponse) => {
                        redirectResponse.on('data', chunk => data += chunk);
                        redirectResponse.on('end', () => {
                            resolve(data);
                        });
                    }).on('error', reject);
                } else {
                    response.on('data', chunk => data += chunk);
                    response.on('end', () => {
                        resolve(data);
                    });
                }
            }).on('error', reject);
        });
    }

    /**
     * Parse CSV data to get unique teachers and their students
     */
    parseTeacherData(csvData) {
        const lines = csvData.split('\n');
        const teacherMap = new Map(); // Map of teacher name to their students
        
        // Skip header row
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;
            
            const columns = this.parseCSVLine(line);
            const teacherName = columns[this.columnMap.ASSIGNED_TEACHER];
            const studentName = columns[this.columnMap.STUDENT_NAME];
            
            // Only process rows with both teacher and student names
            if (teacherName && teacherName.trim() && studentName && studentName.trim()) {
                const teacher = teacherName.trim();
                
                if (!teacherMap.has(teacher)) {
                    teacherMap.set(teacher, {
                        name: teacher,
                        students: [],
                        fileName: this.generateTeacherFileName(teacher)
                    });
                }
                
                // Add student data to teacher
                teacherMap.get(teacher).students.push({
                    name: studentName.trim(),
                    contract: columns[this.columnMap.CONTRACT] || '',
                    workplace: columns[this.columnMap.WORKPLACE] || '',
                    role: columns[this.columnMap.ROLE] || '',
                    level: columns[this.columnMap.LEVEL] || '',
                    imageUrl: columns[this.columnMap.IMAGE_URL] || '',
                    classLink: columns[this.columnMap.CLASS_LINK] || '',
                    whatsapp: columns[this.columnMap.WHATSAPP] || '',
                    vocabularyUrl: columns[this.columnMap.VOCABULARY_URL] || ''
                });
            }
        }
        
        console.log(`📊 Found ${teacherMap.size} unique teachers in Google Sheets`);
        return Array.from(teacherMap.values());
    }

    /**
     * Parse a CSV line handling quoted values
     */
    parseCSVLine(line) {
        const result = [];
        let current = '';
        let inQuotes = false;

        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            const nextChar = line[i + 1];

            if (char === '"') {
                if (inQuotes && nextChar === '"') {
                    current += '"';
                    i++; // Skip next quote
                } else {
                    inQuotes = !inQuotes;
                }
            } else if (char === ',' && !inQuotes) {
                result.push(current);
                current = '';
            } else {
                current += char;
            }
        }

        result.push(current);
        return result;
    }

    /**
     * Generate filename from teacher name
     */
    generateTeacherFileName(teacherName) {
        return teacherName.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '-') + '-Teacher-Dashboard.html';
    }

    /**
     * Read template file
     */
    readTemplate() {
        try {
            return fs.readFileSync(this.templatePath, 'utf8');
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
        
        // If no platforms found, use default set
        if (platforms.length === 0) {
            platforms.push('MIM', 'Linked', 'Italki', 'Preply');
        }
        
        // Count active classes (students with class links)
        const activeClasses = teacher.students.filter(s => s.classLink && s.classLink.trim()).length;
        
        // Generate teacher configuration
        const configScript = `
    <!-- TEACHER CONFIGURATION -->
    <script>
        const TEACHER_CONFIG = {
            // Basic Information
            teacherName: '${teacher.name}',
            teacherTitle: 'English Teacher',
            headerTitle: "${teacher.name}'s Dashboard",
            
            // Google Sheets URL - Using the main sheet
            sheetUrl: 'https://docs.google.com/spreadsheets/d/${this.sheetsId}/edit',
            
            // Profile Image - Default placeholder, teacher can update later
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
            
            // Student Platforms - Dynamic based on teacher's students
            platforms: ${JSON.stringify(platforms)},
            
            // GitHub Pages Base URL for student profiles
            githubPagesUrl: 'https://mimlanguageservices.github.io/Students/',
            
            // Auto-generated metadata
            totalStudents: ${teacher.students.length},
            activeClasses: ${activeClasses},
            assignedTeacher: '${teacher.name}'
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
            const template = this.readTemplate();
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
     * Sync all teacher files with Google Sheets data
     */
    async syncAllTeacherFiles() {
        console.log('🔄 Starting teacher dashboard sync...');
        
        try {
            // Fetch data
            const csvData = await this.fetchSheetData();
            const teachers = this.parseTeacherData(csvData);
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
            console.log(`   ✅ Created: ${created} files`);
            console.log(`   🔄 Updated: ${updated} files`);
            console.log(`   🗑️  Deleted: ${deleted} files`);
            console.log(`   👥 Total: ${teachers.length} teacher dashboards\n`);
            
            return { created, updated, deleted, total: teachers.length };
        } catch (error) {
            console.error('❌ Teacher sync failed:', error.message);
            throw error;
        }
    }

    /**
     * List all teachers and their student counts
     */
    async listTeachers() {
        try {
            const csvData = await this.fetchSheetData();
            const teachers = this.parseTeacherData(csvData);
            
            console.log(`\n👥 Teachers in Google Sheets (${teachers.length}):`);
            teachers.forEach((teacher, index) => {
                const fileExists = this.existingTeacherFiles.has(teacher.name) ? '✅' : '❌';
                const platforms = [...new Set(teacher.students.map(s => s.contract).filter(c => c))].join(', ');
                console.log(`   ${index + 1}. ${fileExists} ${teacher.name} - ${teacher.students.length} students (${platforms || 'No platforms'})`);
            });
            console.log();
            
            return teachers;
        } catch (error) {
            console.error('❌ Error listing teachers:', error.message);
            return [];
        }
    }
}

// CLI Interface
if (require.main === module) {
    const manager = new TeacherFileManager();
    const args = process.argv.slice(2);
    
    async function main() {
        if (args.length === 0) {
            console.log(`
🎓 Teacher Dashboard Management System

Usage:
  node teacher-file-manager.js <command>

Commands:
  sync     - Sync all teacher dashboard files with Google Sheets
  list     - List all teachers and their student counts
  
This tool automatically:
  - Reads Column A (Assigned Teacher) from Google Sheets
  - Creates a personalized dashboard for each unique teacher
  - Updates dashboards when teacher assignments change
  - Removes dashboards for teachers no longer in the sheet

Examples:
  node teacher-file-manager.js sync
  node teacher-file-manager.js list
            `);
            return;
        }
        
        const command = args[0].toLowerCase();
        
        try {
            switch (command) {
                case 'sync':
                    await manager.syncAllTeacherFiles();
                    break;
                    
                case 'list':
                    await manager.listTeachers();
                    break;
                    
                default:
                    console.error(`❌ Unknown command: ${command}`);
                    console.log('Use "node teacher-file-manager.js" to see available commands');
            }
        } catch (error) {
            console.error('❌ Command failed:', error.message);
            process.exit(1);
        }
    }
    
    main();
}

module.exports = TeacherFileManager;