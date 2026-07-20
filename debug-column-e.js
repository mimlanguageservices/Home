const https = require('https');

const sheetsId = '1e2ppEZlcrZENPHMMyIAtNxqCvqHnxCl_FuR3NUX046I';
const url = `https://docs.google.com/spreadsheets/d/${sheetsId}/export?format=csv&gid=0`;

function parseCSVLine(line) {
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

https.get(url, (response) => {
    let data = '';

    if (response.statusCode === 301 || response.statusCode === 302 || response.statusCode === 307) {
        const redirectUrl = response.headers.location;
        console.log(`Following redirect: ${redirectUrl}\n`);

        https.get(redirectUrl, (redirectResponse) => {
            redirectResponse.on('data', chunk => data += chunk);
            redirectResponse.on('end', () => {
                const lines = data.split('\n');

                // Find Maria Gallego
                for (let i = 1; i < lines.length; i++) {
                    const line = lines[i].trim();
                    if (!line) continue;

                    const columns = parseCSVLine(line);
                    const studentName = columns[1]; // Column B

                    if (studentName === 'Maria Gallego') {
                        console.log('=== MARIA GALLEGO ROW FOUND ===\n');
                        console.log(`Row ${i + 1}:\n`);
                        console.log('Column E (index 4) - Finished Activities:');
                        console.log(`"${columns[4]}"`);
                        console.log(`\nLength: ${columns[4] ? columns[4].length : 0} characters`);
                        console.log(`\nEmpty check: ${!columns[4] || !columns[4].trim()}`);

                        // Show what happens when we split by comma
                        if (columns[4]) {
                            const activities = columns[4].split(',').map(link => link.trim()).filter(link => link);
                            console.log(`\nAfter splitting by comma and filtering empty:`);
                            console.log(`Activities count: ${activities.length}`);
                            activities.forEach((act, i) => {
                                console.log(`  ${i + 1}. "${act}"`);
                            });
                        }

                        console.log(`\n\nColumn D (index 3) - Level: "${columns[3]}"`);
                        console.log(`Column N (index 13) - Class Identifier: "${columns[13]}"`);
                        console.log(`Column O (index 14) - Learning Objective: "${columns[14]}"`);
                        break;
                    }
                }
            });
        }).on('error', (err) => console.error('Error:', err));
    }
}).on('error', (err) => console.error('Error:', err));
