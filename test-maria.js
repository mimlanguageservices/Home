const StudentFileManager = require('./student-file-manager.js');

async function testMaria() {
    const manager = new StudentFileManager();

    console.log('Fetching students data...\n');
    const students = await manager.fetchStudentsData();

    const maria = students.find(s => s.name === 'Maria Gallego');

    if (maria) {
        console.log('=== MARIA GALLEGO DATA ===');
        console.log('Name:', maria.name);
        console.log('Level:', maria.level);
        console.log('Finished Activities (raw):', maria.finishedActivities);
        console.log('Finished Activities length:', maria.finishedActivities ? maria.finishedActivities.length : 0);

        // Test the HTML generation function
        console.log('\n=== TESTING HTML GENERATION ===');
        const html = manager.generateFinishedActivitiesHtml(maria.finishedActivities);
        console.log('Generated HTML length:', html.length);
        console.log('First 500 chars of HTML:');
        console.log(html.substring(0, 500));
    } else {
        console.log('Maria Gallego not found!');
    }
}

testMaria().catch(err => console.error('Error:', err));
