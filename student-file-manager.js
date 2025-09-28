#!/usr/bin/env node

/**
 * Dynamic Student HTML File Management System
 * Creates, deletes, and edits HTML files based on Google Sheets Database
 * Based on Template.html with 4 tabs: Profile, Vocabulary, Finished Activities, Contact
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');

class StudentFileManager {
    constructor() {
        this.sheetsId = '1e2ppEZlcrZENPHMMyIAtNxqCvqHnxCl_FuR3NUX046I';
        this.templatePath = path.join(__dirname, 'Template.html');
        this.studentsDir = __dirname;

        // Column mapping based on the Google Sheets structure
        this.columnMap = {
            ASSIGNED_TEACHER: 0,    // Column A (unused)
            STUDENT_NAME: 1,        // Column B (key field for HTML creation)
            CONTRACT: 2,            // Column C (unused)
            WORKPLACE: 5,           // Column F
            FINISHED_ACTIVITIES: 4, // Column E (URLs for finished activities tab - reverse order)
            ROLE: 6,                // Column G
            NATIONALITY: 7,         // Column H
            LOCATION: 8,            // Column I
            EMAIL: 9,               // Column J (contains mailto function)
            WHATSAPP: 10,           // Column K (WhatsApp number - prepend https://wa.me/)
            IMAGE_URL: 11,          // Column L (Profile Picture)
            CLASS_LINK: 12,         // Column M (Class Link on Contact Teacher Page)
            VOCABULARY_URL: 13,     // Column N (keeping for vocabulary tab)
            LEARNING_OBJECTIVE: 14  // Column O (keeping for learning objectives)
        };

        this.existingFiles = new Set();
        this.protectedFolders = ['PROTECTED_WORKSPACE', 'working classes', 'attempted codes'];
        this.scanExistingFiles();
    }

    /**
     * Scan existing student HTML files
     */
    scanExistingFiles() {
        try {
            const files = fs.readdirSync(this.studentsDir);
            files.forEach(file => {
                if (file.endsWith('-Page.html') && file !== 'Template.html') {
                    const studentName = file.replace('-Page.html', '').replace(/-/g, ' ');
                    this.existingFiles.add(studentName);
                }
            });
            console.log(`📁 Found ${this.existingFiles.size} existing student files`);
        } catch (error) {
            console.error('❌ Error scanning existing files:', error.message);
        }
    }

    /**
     * Fetch student data from Google Sheets
     */
    async fetchStudentsData() {
        return new Promise((resolve, reject) => {
            const url = `https://docs.google.com/spreadsheets/d/${this.sheetsId}/export?format=csv&gid=0`;

            https.get(url, (response) => {
                let data = '';

                // Handle redirects
                if (response.statusCode === 301 || response.statusCode === 302 || response.statusCode === 307) {
                    const redirectUrl = response.headers.location;
                    console.log(`🔄 Following redirect: ${redirectUrl}`);

                    https.get(redirectUrl, (redirectResponse) => {
                        redirectResponse.on('data', chunk => data += chunk);
                        redirectResponse.on('end', () => {
                            try {
                                const students = this.parseCSVData(data);
                                resolve(students);
                            } catch (error) {
                                reject(error);
                            }
                        });
                    }).on('error', reject);
                } else {
                    response.on('data', chunk => data += chunk);
                    response.on('end', () => {
                        try {
                            const students = this.parseCSVData(data);
                            resolve(students);
                        } catch (error) {
                            reject(error);
                        }
                    });
                }
            }).on('error', reject);
        });
    }

    /**
     * Parse CSV data into student objects
     */
    parseCSVData(csvData) {
        const lines = csvData.split('\n');
        const students = [];

        // Skip header row
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;

            const columns = this.parseCSVLine(line);

            // Only process rows with student names (Column B)
            const studentName = columns[this.columnMap.STUDENT_NAME];
            if (!studentName || !studentName.trim()) continue;

            const student = {
                assignedTeacher: columns[this.columnMap.ASSIGNED_TEACHER] || '',
                name: studentName.trim(),
                contract: columns[this.columnMap.CONTRACT] || '',
                workplace: columns[this.columnMap.WORKPLACE] || '',
                email: columns[this.columnMap.EMAIL] || '',
                phone: columns[this.columnMap.WHATSAPP] || '', // Using WhatsApp number for phone
                imageUrl: columns[this.columnMap.IMAGE_URL] || 'https://via.placeholder.com/100x100?text=Student',
                role: columns[this.columnMap.ROLE] || 'Student',
                classLink: columns[this.columnMap.CLASS_LINK] || '',
                whatsapp: columns[this.columnMap.WHATSAPP] || '',
                nationality: columns[this.columnMap.NATIONALITY] || '',
                location: columns[this.columnMap.LOCATION] || '',
                learningObjective: columns[this.columnMap.LEARNING_OBJECTIVE] || '',
                vocabularyUrl: columns[this.columnMap.VOCABULARY_URL] || '',
                finishedActivities: columns[this.columnMap.FINISHED_ACTIVITIES] || '',
                fileName: this.generateFileName(studentName.trim())
            };

            students.push(student);
        }

        console.log(`📊 Parsed ${students.length} students from Google Sheets`);
        return students;
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
     * Generate filename from student name
     */
    generateFileName(studentName) {
        return studentName.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '-') + '-Page.html';
    }

    /**
     * Read template file
     */
    readTemplate() {
        try {
            return fs.readFileSync(this.templatePath, 'utf8');
        } catch (error) {
            throw new Error(`Failed to read template: ${error.message}`);
        }
    }

    /**
     * Create placeholders mapping for template replacement
     */
    createPlaceholders(student) {
        // Generate WhatsApp link if phone is provided
        const whatsappLink = student.phone ?
            `https://wa.me/${student.phone.replace(/[^0-9]/g, '')}` : '';

        // Generate class link icon based on the class link
        let classLinkIcon = '';
        if (student.classLink) {
            if (student.classLink.includes('teams')) {
                classLinkIcon = '🎥'; // Teams
            } else if (student.classLink.includes('zoom')) {
                classLinkIcon = '📹'; // Zoom
            } else if (student.classLink.includes('meet')) {
                classLinkIcon = '💻'; // Google Meet
            } else {
                classLinkIcon = '🔗'; // Generic link
            }
        }

        // Clean phone number for WhatsApp
        const phoneClean = student.phone ? student.phone.replace(/[^0-9]/g, '') : '';

        // Generate HTML for finished activities from comma-separated links
        const finishedActivitiesHtml = this.generateFinishedActivitiesHtml(student.finishedActivities);

        // Process vocabulary URL to hide Google Sheets UI
        const processedVocabularyUrl = this.processVocabularyUrl(student.vocabularyUrl);

        return {
            '{{STUDENT_NAME}}': student.name,
            '{{STUDENT_PHOTO}}': student.imageUrl,
            '{{ASSIGNED_TEACHER}}': student.assignedTeacher,
            '{{CONTRACT}}': student.contract,
            '{{WORKPLACE}}': student.workplace,
            '{{EMAIL}}': student.email,
            '{{PHONE}}': student.phone,
            '{{PHONE_NUMBER}}': student.phone,
            '{{PHONE_NUMBER_CLEAN}}': phoneClean,
            '{{ROLE}}': student.role,
            '{{CLASS_LINK}}': student.classLink,
            '{{CLASS_LINK_ICON}}': classLinkIcon,
            '{{WHATSAPP}}': student.whatsapp,
            '{{WHATSAPP_LINK}}': whatsappLink,
            '{{LEVEL}}': student.level,
            '{{LEARNING_OBJECTIVES}}': student.learningObjective,
            '{{VOCABULARY_URL}}': processedVocabularyUrl,
            '{{FINISHED_ACTIVITIES}}': student.finishedActivities,
            '{{FINISHED_ACTIVITIES_HTML}}': finishedActivitiesHtml,
            '{{NATIONALITY}}': student.nationality || '',
            '{{LOCATION}}': student.location || ''
        };
    }

    /**
     * Process vocabulary URL to hide Google Sheets UI elements
     */
    processVocabularyUrl(vocabularyUrl) {
        if (!vocabularyUrl || !vocabularyUrl.trim()) {
            return '';
        }

        // Check if it's a Google Sheets URL
        if (vocabularyUrl.includes('docs.google.com/spreadsheets')) {
            try {
                const url = new URL(vocabularyUrl);

                // Remove existing parameters that might conflict
                url.searchParams.delete('usp');
                url.searchParams.delete('embedded');
                url.searchParams.delete('rm');
                url.searchParams.delete('chrome');
                url.searchParams.delete('headers');

                // Add parameters to hide UI elements (keeping /edit for shared sheets)
                url.searchParams.set('rm', 'minimal');           // Remove most UI elements
                url.searchParams.set('embedded', 'true');        // Embed mode
                url.searchParams.set('chrome', 'false');         // Hide chrome
                url.searchParams.set('headers', 'false');        // Hide headers
                url.searchParams.set('widget', 'true');          // Widget mode
                url.searchParams.set('single', 'true');          // Single sheet view

                return url.toString();
            } catch (error) {
                // If URL parsing fails, return original URL
                console.warn('Failed to process vocabulary URL:', error);
                return vocabularyUrl;
            }
        }

        // If not a Google Sheets URL, return as-is
        return vocabularyUrl;
    }

    /**
     * Generate HTML for finished activities from comma-separated links
     */
    generateFinishedActivitiesHtml(finishedActivitiesString) {
        if (!finishedActivitiesString || !finishedActivitiesString.trim()) {
            return '<div style="text-align: center; color: #666; padding: 40px;"><p>No finished activities yet.</p></div>';
        }

        // Split by comma and clean up links, then reverse to show newest first
        const links = finishedActivitiesString.split(',').map(link => link.trim()).filter(link => link).reverse();

        if (links.length === 0) {
            return '<div style="text-align: center; color: #666; padding: 40px;"><p>No finished activities yet.</p></div>';
        }

        let html = '<div style="display: grid; gap: 15px;">';

        links.forEach((link, index) => {
            // Extract title from the final part of the URL path
            let title = `Activity ${index + 1}`;

            try {
                // Parse the URL and extract the last path segment
                const urlParts = link.split('/');
                const lastPart = urlParts[urlParts.length - 1];

                if (lastPart && lastPart !== '') {
                    // Remove file extensions and clean up the title
                    title = lastPart
                        .replace(/\.(html?|php|asp|jsp)$/i, '') // Remove common web file extensions
                        .replace(/[-_]/g, ' ') // Replace hyphens and underscores with spaces
                        .replace(/\s+/g, ' ') // Replace multiple spaces with single space
                        .trim(); // Remove leading/trailing spaces

                    // Capitalize first letter of each word
                    if (title) {
                        title = title.split(' ').map(word => {
                            if (word.length > 0) {
                                return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
                            }
                            return word;
                        }).join(' ');
                    }

                    // If title is empty after cleaning, fall back to generic
                    if (!title || title.trim() === '') {
                        title = `Activity ${index + 1}`;
                    }
                } else {
                    // If no last part found, use generic title
                    title = `Activity ${index + 1}`;
                }
            } catch (error) {
                // If URL parsing fails, use generic title
                title = `Activity ${index + 1}`;
            }

            html += `
                <div style="background: rgba(255, 255, 255, 0.8); border: 1px solid rgba(0, 0, 0, 0.1); border-radius: 12px; padding: 20px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05); cursor: pointer; transition: all 0.3s ease;"
                     onmouseover="this.style.background='rgba(255, 255, 255, 0.95)'; this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 15px rgba(0, 0, 0, 0.1)';"
                     onmouseout="this.style.background='rgba(255, 255, 255, 0.8)'; this.style.transform='translateY(0px)'; this.style.boxShadow='0 2px 10px rgba(0, 0, 0, 0.05)';"
                     onclick="window.open('${this.escapeHtml(link)}', '_blank')">
                    <div style="display: flex; align-items: center; margin-bottom: 10px;">
                        <span style="color: #48bb78; font-size: 1.2rem; margin-right: 10px;">✓</span>
                        <h4 style="color: #2d3748; margin: 0; font-size: 1.1rem; font-weight: 600;">${this.escapeHtml(title)}</h4>
                        <span style="color: #4c51bf; font-size: 0.8rem; margin-left: 10px;">🔗 Click to open</span>
                    </div>
                    <p style="color: #4a5568; margin: 8px 0; font-size: 0.9rem; line-height: 1.4; word-break: break-all;">${this.escapeHtml(link)}</p>
                </div>
            `;
        });

        html += '</div>';
        return html;
    }

    /**
     * Escape HTML characters
     */
    escapeHtml(text) {
        if (!text) return '';
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    /**
     * Replace placeholders in template
     */
    replacePlaceholders(template, placeholders) {
        let result = template;

        for (const [placeholder, value] of Object.entries(placeholders)) {
            const regex = new RegExp(placeholder.replace(/[{}]/g, '\\$&'), 'g');
            result = result.replace(regex, value || '');
        }

        return result;
    }

    /**
     * Create HTML file for a student
     */
    createStudentFile(student) {
        try {
            const template = this.readTemplate();
            const placeholders = this.createPlaceholders(student);
            const htmlContent = this.replacePlaceholders(template, placeholders);

            const filePath = path.join(this.studentsDir, student.fileName);
            fs.writeFileSync(filePath, htmlContent, 'utf8');

            console.log(`✅ Created: ${student.fileName}`);
            return true;
        } catch (error) {
            console.error(`❌ Error creating ${student.fileName}:`, error.message);
            return false;
        }
    }

    /**
     * Update existing HTML file for a student
     */
    updateStudentFile(student) {
        return this.createStudentFile(student); // Same as create - overwrites
    }

    /**
     * Delete HTML file for a student
     */
    deleteStudentFile(studentName) {
        try {
            const fileName = this.generateFileName(studentName);
            const filePath = path.join(this.studentsDir, fileName);

            // SAFETY CHECK: Only delete student page files
            if (!fileName.endsWith('-Page.html')) {
                console.log(`🛡️  PROTECTED: Refusing to delete non-student file: ${fileName}`);
                return false;
            }

            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
                console.log(`🗑️  Deleted: ${fileName}`);
                return true;
            } else {
                console.log(`⚠️  File not found: ${fileName}`);
                return false;
            }
        } catch (error) {
            console.error(`❌ Error deleting ${studentName}:`, error.message);
            return false;
        }
    }

    /**
     * Sync all student files with Google Sheets data
     */
    async syncAllFiles() {
        console.log('🔄 Starting full sync with Google Sheets...');

        try {
            const students = await this.fetchStudentsData();
            const currentStudents = new Set(students.map(s => s.name));

            let created = 0;
            let updated = 0;
            let deleted = 0;

            // Create/Update files for current students
            for (const student of students) {
                if (this.existingFiles.has(student.name)) {
                    if (this.updateStudentFile(student)) updated++;
                } else {
                    if (this.createStudentFile(student)) created++;
                }
            }

            // Delete files for students no longer in the sheet
            for (const existingStudent of this.existingFiles) {
                if (!currentStudents.has(existingStudent)) {
                    if (this.deleteStudentFile(existingStudent)) deleted++;
                }
            }

            // Update the existing files set
            this.existingFiles = currentStudents;

            console.log(`\n📈 Sync complete:`);
            console.log(`   ✅ Created: ${created} files`);
            console.log(`   🔄 Updated: ${updated} files`);
            console.log(`   🗑️  Deleted: ${deleted} files`);
            console.log(`   📁 Total: ${students.length} student files\n`);

            return { created, updated, deleted, total: students.length };
        } catch (error) {
            console.error('❌ Sync failed:', error.message);
            throw error;
        }
    }

    /**
     * Push changes to GitHub repository
     */
    async pushToGitHub() {
        try {
            console.log('📤 Checking for changes to push to GitHub...');

            // Check if there are any changes
            const status = execSync('git status --porcelain', { encoding: 'utf8', cwd: this.studentsDir });

            if (!status.trim()) {
                console.log('📊 No changes to push to GitHub');
                return false;
            }

            console.log('📝 Changes detected, pushing to GitHub...');

            // Add all changes
            execSync('git add .', { cwd: this.studentsDir });

            // Create commit with timestamp
            const timestamp = new Date().toLocaleString();
            const commitMessage = `Auto-sync update: ${timestamp} - Student files updated from Google Sheets`;

            execSync(`git commit -m "${commitMessage}"`, { cwd: this.studentsDir });

            // Push to GitHub
            execSync('git push', { cwd: this.studentsDir });

            console.log('✅ Successfully pushed changes to GitHub');
            return true;

        } catch (error) {
            console.error('❌ Failed to push to GitHub:', error.message);
            return false;
        }
    }

    /**
     * Watch for changes and auto-sync (polling method)
     */
    startAutoSync(intervalMinutes = 1) {
        console.log(`🔄 Starting auto-sync every ${intervalMinutes} minutes...`);

        const interval = setInterval(async () => {
            try {
                console.log(`\n⏰ Auto-sync triggered at ${new Date().toLocaleTimeString()}`);
                await this.syncAllFiles();

                // Push changes to GitHub if any were made
                await this.pushToGitHub();
            } catch (error) {
                console.error('❌ Auto-sync failed:', error.message);
            }
        }, intervalMinutes * 60 * 1000);

        // Graceful shutdown
        process.on('SIGINT', () => {
            console.log('\n🛑 Stopping auto-sync...');
            clearInterval(interval);
            process.exit(0);
        });

        return interval;
    }

    /**
     * Create a specific student file by name
     */
    async createStudentByName(studentName) {
        try {
            const students = await this.fetchStudentsData();
            const student = students.find(s => s.name.toLowerCase() === studentName.toLowerCase());

            if (student) {
                return this.createStudentFile(student);
            } else {
                console.error(`❌ Student '${studentName}' not found in Google Sheets`);
                return false;
            }
        } catch (error) {
            console.error(`❌ Error creating student '${studentName}':`, error.message);
            return false;
        }
    }

    /**
     * List all students in Google Sheets
     */
    async listStudents() {
        try {
            const students = await this.fetchStudentsData();
            console.log(`\n👥 Students in Google Sheets (${students.length}):`);
            students.forEach((student, index) => {
                const fileExists = this.existingFiles.has(student.name) ? '✅' : '❌';
                console.log(`   ${index + 1}. ${fileExists} ${student.name} (${student.level || 'No level'}) - ${student.fileName}`);
            });
            console.log();
            return students;
        } catch (error) {
            console.error('❌ Error listing students:', error.message);
            return [];
        }
    }

    /**
     * Get student info by name
     */
    async getStudentInfo(studentName) {
        try {
            const students = await this.fetchStudentsData();
            const student = students.find(s => s.name.toLowerCase() === studentName.toLowerCase());

            if (student) {
                console.log(`\n👤 Student Info: ${student.name}`);
                console.log(`   📧 Email: ${student.email || 'Not provided'}`);
                console.log(`   📱 Phone: ${student.phone || 'Not provided'}`);
                console.log(`   🏢 Workplace: ${student.workplace || 'Not provided'}`);
                console.log(`   📚 Level: ${student.level || 'Not provided'}`);
                console.log(`   🎯 Objective: ${student.learningObjective || 'Not provided'}`);
                console.log(`   👨‍🏫 Teacher: ${student.assignedTeacher || 'Not assigned'}`);
                console.log(`   📄 File: ${student.fileName}`);
                console.log();
                return student;
            } else {
                console.error(`❌ Student '${studentName}' not found`);
                return null;
            }
        } catch (error) {
            console.error(`❌ Error getting student info:`, error.message);
            return null;
        }
    }
}

// CLI Interface
if (require.main === module) {
    const manager = new StudentFileManager();
    const args = process.argv.slice(2);

    async function main() {
        if (args.length === 0) {
            console.log(`
🎓 Student HTML File Management System

Usage:
  node student-file-manager.js <command> [options]

Commands:
  sync                     - Sync all files with Google Sheets
  auto [minutes]          - Start auto-sync (default: 5 minutes)
  create <student-name>   - Create HTML file for specific student
  delete <student-name>   - Delete HTML file for specific student
  list                    - List all students in Google Sheets
  info <student-name>     - Show detailed info for a student

Examples:
  node student-file-manager.js sync
  node student-file-manager.js auto 10
  node student-file-manager.js create "John Doe"
  node student-file-manager.js list
  node student-file-manager.js info "Jane Smith"
            `);
            return;
        }

        const command = args[0].toLowerCase();

        try {
            switch (command) {
                case 'sync':
                    await manager.syncAllFiles();
                    break;

                case 'auto':
                    const minutes = parseInt(args[1]) || 1;
                    await manager.syncAllFiles(); // Initial sync
                    manager.startAutoSync(minutes);
                    break;

                case 'create':
                    if (!args[1]) {
                        console.error('❌ Please provide a student name');
                        return;
                    }
                    await manager.createStudentByName(args[1]);
                    break;

                case 'delete':
                    if (!args[1]) {
                        console.error('❌ Please provide a student name');
                        return;
                    }
                    manager.deleteStudentFile(args[1]);
                    break;

                case 'list':
                    await manager.listStudents();
                    break;

                case 'info':
                    if (!args[1]) {
                        console.error('❌ Please provide a student name');
                        return;
                    }
                    await manager.getStudentInfo(args[1]);
                    break;

                default:
                    console.error(`❌ Unknown command: ${command}`);
                    console.log('Use "node student-file-manager.js" to see available commands');
            }
        } catch (error) {
            console.error('❌ Command failed:', error.message);
            process.exit(1);
        }
    }

    main();
}

module.exports = StudentFileManager;