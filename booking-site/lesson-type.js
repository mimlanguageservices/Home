// Google Sheets Configuration
const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQnpula1h030YNkg-X6OkNUyojPaqXVPeoY6yqIP7FcRyo4qHyIrmfySFv0ewKGTJvCGtFzv_vVw1Wh/pub?output=csv';

// Elements
const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error');
const lessonsContainer = document.getElementById('lessons-container');
const pageTitle = document.getElementById('page-title');
const searchInput = document.getElementById('search-input');

// Get lesson type from URL parameter
const urlParams = new URLSearchParams(window.location.search);
const lessonType = urlParams.get('type');

// Update page title
if (lessonType) {
    pageTitle.textContent = lessonType;
}

// Parse CSV data
function parseCSV(text) {
    const lines = text.split('\n');
    const result = [];

    for (let line of lines) {
        if (!line.trim()) continue;

        const row = [];
        let current = '';
        let inQuotes = false;

        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            const nextChar = line[i + 1];

            if (char === '"') {
                if (inQuotes && nextChar === '"') {
                    current += '"';
                    i++;
                } else {
                    inQuotes = !inQuotes;
                }
            } else if (char === ',' && !inQuotes) {
                row.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }
        row.push(current.trim());
        result.push(row);
    }

    return result;
}

// Fetch and display levels
async function fetchLevels() {
    try {
        const response = await fetch(CSV_URL);

        if (!response.ok) {
            throw new Error('Failed to fetch data from Google Sheets');
        }

        const csvText = await response.text();
        const rows = parseCSV(csvText);

        if (!rows || rows.length === 0) {
            throw new Error('No data found in the sheet');
        }

        // Skip empty rows and find the header row
        let headerRowIndex = 0;
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            if (row.some(cell => cell && cell.trim() !== '')) {
                if (row.some(cell => cell && (cell.toLowerCase().includes('lesson name') || cell.toLowerCase() === 'type'))) {
                    headerRowIndex = i;
                    break;
                }
            }
        }

        const headers = rows[headerRowIndex];
        const lessons = rows.slice(headerRowIndex + 1);

        displayLevels(lessons, headers);

    } catch (error) {
        console.error('Error fetching levels:', error);
        showError();
    }
}

function displayLevels(lessons, headers) {
    loadingEl.style.display = 'none';
    lessonsContainer.style.display = 'flex';

    const typeIndex = headers.findIndex(h => h.toLowerCase() === 'type');
    const nameIndex = headers.findIndex(h => h.toLowerCase().includes('lesson name'));
    const urlIndex = headers.findIndex(h => h.toLowerCase() === 'lesson url');
    const imageIndex = headers.findIndex(h => h.toLowerCase().includes('image') || h.toLowerCase().includes('img'));
    const numberIndex = headers.findIndex(h => h.toLowerCase().includes('lesson number'));

    // Find level columns
    const levelIndices = {
        A1: headers.findIndex(h => h === 'A1'),
        A2: headers.findIndex(h => h === 'A2'),
        B1: headers.findIndex(h => h === 'B1'),
        B2: headers.findIndex(h => h === 'B2'),
        C1: headers.findIndex(h => h === 'C1'),
        C2: headers.findIndex(h => h === 'C2')
    };

    // Find which levels have lessons for this type
    const availableLevels = new Set();

    lessons.forEach(lesson => {
        const type = lesson[typeIndex];
        if (type && type.trim() === lessonType) {
            // Check each level
            for (const [level, idx] of Object.entries(levelIndices)) {
                if (idx !== -1 && lesson[idx] && lesson[idx].toUpperCase() === 'TRUE') {
                    availableLevels.add(level);
                }
            }
        }
    });

    // Display level cards in order
    const levelOrder = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    levelOrder.forEach(level => {
        if (availableLevels.has(level)) {
            const card = document.createElement('div');
            card.className = 'lesson-card';

            card.innerHTML = `
                <div class="lesson-icon">
                    <div class="lesson-icon-placeholder">${level}</div>
                </div>
                <h3>${level}</h3>
            `;

            // Navigate to lesson list with type and level
            card.addEventListener('click', () => {
                window.location.href = `lesson-list.html?type=${encodeURIComponent(lessonType)}&level=${level}`;
            });

            lessonsContainer.appendChild(card);
        }
    });

    if (lessonsContainer.children.length === 0) {
        showError();
    }

    // Add global search functionality
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();

            if (searchTerm === '') {
                // Show all levels if search is empty
                const lessonCards = lessonsContainer.querySelectorAll('.lesson-card');
                lessonCards.forEach(card => {
                    card.style.display = 'flex';
                });
                const noResults = document.getElementById('no-results');
                if (noResults) {
                    noResults.remove();
                }
                return;
            }

            // Clear current display
            lessonsContainer.innerHTML = '';

            // Search through all lessons for this type
            const matchingLessons = [];
            lessons.forEach(lesson => {
                const type = lesson[typeIndex];
                if (type && type.trim() === lessonType) {
                    const lessonName = lesson[nameIndex] || '';
                    const lessonNumber = lesson[numberIndex] || '';
                    const lessonUrl = lesson[urlIndex] || '';
                    const imageUrl = lesson[imageIndex] || '';

                    // Check if lesson matches search term
                    if (lessonName.toLowerCase().includes(searchTerm) ||
                        lessonNumber.toLowerCase().includes(searchTerm)) {

                        if (lessonName.trim() !== '') {
                            // Find which level this lesson belongs to
                            let lessonLevel = '';
                            for (const [level, idx] of Object.entries(levelIndices)) {
                                if (idx !== -1 && lesson[idx] && lesson[idx].toUpperCase() === 'TRUE') {
                                    lessonLevel = level;
                                    break;
                                }
                            }

                            matchingLessons.push({
                                name: lessonName,
                                number: lessonNumber,
                                url: lessonUrl,
                                image: imageUrl,
                                level: lessonLevel
                            });
                        }
                    }
                }
            });

            // Display matching lessons
            if (matchingLessons.length === 0) {
                const noResults = document.createElement('p');
                noResults.id = 'no-results';
                noResults.className = 'no-results';
                noResults.textContent = 'No lessons found matching your search.';
                lessonsContainer.appendChild(noResults);
            } else {
                matchingLessons.forEach(lesson => {
                    const card = document.createElement('div');
                    card.className = 'lesson-card';

                    const firstLetter = lesson.name.charAt(0).toUpperCase();
                    const iconContent = lesson.image
                        ? `<img src="${escapeHtml(lesson.image)}" alt="${escapeHtml(lesson.name)}">`
                        : `<div class="lesson-icon-placeholder">${firstLetter}</div>`;

                    card.innerHTML = `
                        <div class="lesson-icon">
                            ${iconContent}
                        </div>
                        <h3>${escapeHtml(lesson.name)}</h3>
                        ${lesson.number ? `<p class="lesson-number">Lesson ${escapeHtml(lesson.number)}</p>` : ''}
                        ${lesson.level ? `<p class="lesson-levels">${escapeHtml(lesson.level)}</p>` : ''}
                    `;

                    if (lesson.url && lesson.url.trim() !== '') {
                        card.addEventListener('click', () => {
                            window.open(lesson.url, '_blank');
                        });
                    }

                    lessonsContainer.appendChild(card);
                });
            }
        });
    }
}

function showError() {
    loadingEl.style.display = 'none';
    errorEl.style.display = 'block';
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize
fetchLevels();
