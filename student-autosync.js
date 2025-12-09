const { exec } = require('child_process');
const path = require('path');

const CHECK_INTERVAL = 60000; // Check every 60 seconds

console.log('Student Roster Auto-Sync Service Started');
console.log(`Check interval: ${CHECK_INTERVAL / 1000} seconds\n`);

let isProcessing = false;

function syncAndPush() {
    if (isProcessing) {
        console.log('Already processing sync, skipping...');
        return;
    }

    isProcessing = true;
    const timestamp = new Date().toLocaleString();

    console.log(`[${timestamp}] Running student sync...`);

    // Run the student-file-manager.js sync command
    exec('node student-file-manager.js sync', { cwd: __dirname }, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error during sync: ${error.message}`);
            isProcessing = false;
            return;
        }

        console.log(stdout);
        if (stderr) {
            console.error(stderr);
        }

        console.log(`[${timestamp}] Sync completed successfully\n`);
        isProcessing = false;
    });
}

// Run immediately on startup
console.log('Running initial sync...\n');
syncAndPush();

// Then run periodically
setInterval(syncAndPush, CHECK_INTERVAL);

// Keep the process running
process.on('SIGINT', () => {
    console.log('\nStudent Auto-Sync service stopped');
    process.exit(0);
});
