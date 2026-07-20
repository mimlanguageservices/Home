// Google Sheets Configuration
const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQnpula1h030YNkg-X6OkNUyojPaqXVPeoY6yqIP7FcRyo4qHyIrmfySFv0ewKGTJvCGtFzv_vVw1Wh/pub?output=csv';

// Elements
const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error');
const lessonsContainer = document.getElementById('lessons-container');
const pageTitle = document.getElementById('page-title');
const pageSubtitle = document.getElementById('page-subtitle');
const searchInput = document.getElementById('search-input');

// Get parameters from URL
const urlParams = new URLSearchParams(window.location.search);
const lessonType = urlParams.get('type');
const lessonLevel = urlParams.get('level');

// Update page title
if (lessonType && lessonLevel) {
    pageTitle.textContent = `${lessonType} - ${lessonLevel}`;
    pageSubtitle.textContent = 'Click a lesson to begin';
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

// Fetch and display lessons
async function fetchLessons() {
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

        displayLessonList(lessons, headers);

    } catch (error) {
        console.error('Error fetching lessons:', error);
        showError();
    }
}

function displayLessonList(lessons, headers) {
    loadingEl.style.display = 'none';
    lessonsContainer.style.display = 'flex';

    const numberIndex = headers.findIndex(h => h.toLowerCase().includes('lesson number'));
    const nameIndex = headers.findIndex(h => h.toLowerCase().includes('lesson name'));
    const urlIndex = headers.findIndex(h => h.toLowerCase() === 'lesson url');
    const typeIndex = headers.findIndex(h => h.toLowerCase() === 'type');
    const imageIndex = headers.findIndex(h => h.toLowerCase().includes('image') || h.toLowerCase().includes('img'));
    const premiumIndex = headers.findIndex(h => h.toLowerCase() === 'premium');

    console.log('Headers:', headers);
    console.log('Premium column index:', premiumIndex);

    // Find the level column index
    const levelIndex = headers.findIndex(h => h === lessonLevel);

    // Filter lessons that match type and level
    const matchingLessons = [];
    lessons.forEach(lesson => {
        const type = lesson[typeIndex];
        const hasLevel = lesson[levelIndex] && lesson[levelIndex].toUpperCase() === 'TRUE';
        const lessonName = lesson[nameIndex];
        const lessonUrl = lesson[urlIndex];
        const imageUrl = lesson[imageIndex] || '';
        const lessonNumber = lesson[numberIndex] || '';

        // Only show lessons that match type and level
        if (type && type.trim() === lessonType && hasLevel && lessonName && lessonName.trim() !== '') {
            const isPremium = premiumIndex !== -1 && lesson[premiumIndex] && lesson[premiumIndex].toUpperCase() === 'TRUE';
            console.log('Lesson:', lessonName, '| Premium value:', lesson[premiumIndex], '| isPremium:', isPremium);
            matchingLessons.push({
                name: lessonName,
                url: lessonUrl,
                image: imageUrl,
                number: lessonNumber,
                premium: isPremium
            });
        }
    });

    // Sort lessons numerically by the lesson number column
    matchingLessons.sort((a, b) => {
        const numA = parseInt(a.number) || 999999;
        const numB = parseInt(b.number) || 999999;

        if (numA !== numB) {
            return numA - numB; // Sort by number
        }

        // If no numbers or same number, sort alphabetically
        return a.name.localeCompare(b.name);
    });

    // Create cards for sorted lessons
    matchingLessons.forEach(lesson => {
        const card = document.createElement('div');
        card.className = lesson.premium ? 'lesson-card locked' : 'lesson-card';

        const firstLetter = lesson.name.charAt(0).toUpperCase();

        const iconContent = lesson.image
            ? `<img src="${escapeHtml(lesson.image)}" alt="${escapeHtml(lesson.name)}">`
            : `<div class="lesson-icon-placeholder">${firstLetter}</div>`;

        const lockOverlay = lesson.premium ? `
            <div class="lock-overlay">
                <div class="lock-icon">&#128274;</div>
                <p>Subscribe to unlock</p>
                <a href="https://www.patreon.com/posts/zdcvxzcvsdv-148249210?utm_medium=clipboard_copy&utm_source=copyLink&utm_campaign=postshare_creator&utm_content=join_link" target="_blank" class="subscribe-btn">Subscribe</a>
            </div>
        ` : '';

        card.innerHTML = `
            <div class="lesson-icon">
                ${iconContent}
            </div>
            <h3>${escapeHtml(lesson.name)}</h3>
            ${lesson.number ? `<p class="lesson-number">Lesson ${escapeHtml(lesson.number)}</p>` : ''}
            ${lockOverlay}
        `;

        // Open lesson URL (only if not premium)
        if (lesson.url && lesson.url.trim() !== '' && !lesson.premium) {
            card.addEventListener('click', () => {
                window.open(lesson.url, '_blank');
            });
        }

        lessonsContainer.appendChild(card);
    });

    if (lessonsContainer.children.length === 0) {
        showError();
    }

    // Add search functionality
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const lessonCards = lessonsContainer.querySelectorAll('.lesson-card');

            lessonCards.forEach(card => {
                const lessonName = card.querySelector('h3').textContent.toLowerCase();
                const lessonNumber = card.querySelector('.lesson-number')?.textContent.toLowerCase() || '';

                if (lessonName.includes(searchTerm) || lessonNumber.includes(searchTerm)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });

            // Check if any lessons are visible
            const visibleLessons = Array.from(lessonCards).filter(card => card.style.display !== 'none');
            if (visibleLessons.length === 0) {
                if (!document.getElementById('no-results')) {
                    const noResults = document.createElement('p');
                    noResults.id = 'no-results';
                    noResults.className = 'no-results';
                    noResults.textContent = 'No lessons found matching your search.';
                    lessonsContainer.appendChild(noResults);
                }
            } else {
                const noResults = document.getElementById('no-results');
                if (noResults) {
                    noResults.remove();
                }
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
fetchLessons();
