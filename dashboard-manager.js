class DashboardManager {
    constructor() {
        this.SHEET_URL = 'https://docs.google.com/spreadsheets/d/1dG7H6DZCWeU5hhTJbIkzkE3IXZB_AKPiEvXM5pl6G-U/gviz/tq?tqx=out:csv';
        this.studentsData = [];
        this.platformContainers = {
            'MIM': 'mim-container',
            'Linked': 'linked-container',
            'Italki': 'italki-container',
            'Preply': 'preply-container'
        };
    }

    async initialize() {
        try {
            await this.loadStudentsData();
            this.showPlatform('MIM'); // Show MIM students by default
            return true;
        } catch (error) {
            console.error('Failed to initialize dashboard:', error);
            return false;
        }
    }

    async loadStudentsData() {
        try {
            const response = await fetch(this.SHEET_URL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const csvText = await response.text();
            const { headers, data } = this.parseCSV(csvText);
            this.studentsData = data;
            console.log('Data loaded successfully:', data.length, 'records');
        } catch (error) {
            console.error('Error loading student data:', error);
            throw error;
        }
    }

    parseCSV(csvText) {
        const lines = csvText.split('\n');
        const result = [];
        const headers = lines[0].split(',').map(header => header.trim().replace(/"/g, ''));

        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line) {
                const values = this.parseCSVLine(line);
                const row = {};
                for (let j = 0; j < headers.length; j++) {
                    // Keep using letter mapping for compatibility
                    const colLetter = String.fromCharCode(65 + j);
                    row[colLetter] = values[j].trim();
                }
                result.push(row);
            }
        }
        
        return { headers, data: result };
    }

    parseCSVLine(line) {
        const values = [];
        let currentValue = '';
        let insideQuotes = false;

        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            
            if (char === '"') {
                insideQuotes = !insideQuotes;
            } else if (char === ',' && !insideQuotes) {
                values.push(currentValue.replace(/"/g, ''));
                currentValue = '';
            } else {
                currentValue += char;
            }
        }
        
        values.push(currentValue.replace(/"/g, ''));
        return values;
    }

    showPlatform(platform) {
        const containerId = this.platformContainers[platform];
        if (!containerId) {
            console.error('Invalid platform:', platform);
            return;
        }

        const container = document.getElementById('mim-container'); // Using mim-container for all platforms
        if (!container) {
            console.error('Container not found for platform:', platform);
            return;
        }

        const platformStudents = this.getStudentsByPlatform(platform);
        
        if (platformStudents.length === 0) {
            container.innerHTML = this.createEmptyMessage(platform);
            return;
        }

        container.innerHTML = platformStudents.map(student => this.createStudentCard(student)).join('');
    }

    getStudentsByPlatform(platform) {
        return this.studentsData.filter(student => {
            const studentPlatform = student['D'];
            return studentPlatform && studentPlatform.trim().toUpperCase() === platform.toUpperCase();
        });
    }

    createStudentCard(student) {
        const name = student['B'] || 'Unknown Student';
        const profileUrl = student['C'] || '#';
        const whatsappUrl = student['K'] || '#';
        const callUrl = student['M'] || '#';

        return `
            <div class="student-card" onclick="window.open('${this.sanitizeUrl(profileUrl)}', '_blank')">
                <img src="https://via.placeholder.com/60x60?text=${encodeURIComponent(name.charAt(0))}" 
                     alt="${this.sanitizeHtml(name)}" class="student-picture">
                <div class="student-name">${this.sanitizeHtml(name)}</div>
                <div class="student-buttons">
                    <button class="student-btn" 
                            onclick="event.stopPropagation(); window.open('${this.sanitizeUrl(whatsappUrl)}', '_blank')">
                        WhatsApp
                    </button>
                    <button class="student-btn" 
                            onclick="event.stopPropagation(); window.open('${this.sanitizeUrl(callUrl)}', '_blank')">
                        Call
                    </button>
                </div>
            </div>
        `;
    }

    createEmptyMessage(platform) {
        return `
            <div class="empty-message">
                No ${this.sanitizeHtml(platform)} students currently assigned.
            </div>
        `;
    }

    // Security helper methods
    sanitizeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    sanitizeUrl(url) {
        try {
            const sanitizedUrl = new URL(url).toString();
            if (sanitizedUrl.startsWith('http://') || sanitizedUrl.startsWith('https://')) {
                return sanitizedUrl;
            }
            return '#';
        } catch {
            return '#';
        }
    }

    // Debug methods
    logStudentData() {
        console.log('Current students data:', this.studentsData);
    }

    validatePlatformData() {
        const platforms = new Set();
        this.studentsData.forEach(student => {
            if (student['D']) {
                platforms.add(student['D'].trim());
            }
        });
        console.log('Unique platforms found:', Array.from(platforms));
    }
}