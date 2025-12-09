const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const CLASSES_FOLDER = path.join(__dirname, 'Classes');
const CHECK_INTERVAL = 120000; // Check every 2 minutes

console.log('Classes Auto-Push Service Started');
console.log(`Watching folder: ${CLASSES_FOLDER}`);
console.log(`Check interval: ${CHECK_INTERVAL / 1000} seconds\n`);

let isProcessing = false;

function gitPush() {
    if (isProcessing) {
        console.log('Already processing changes, skipping...');
        return;
    }

    isProcessing = true;
    const timestamp = new Date().toLocaleString();

    console.log(`[${timestamp}] Checking for changes...`);

    // Check if there are any changes
    exec('git status --porcelain Classes/', { cwd: __dirname }, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error checking git status: ${error.message}`);
            isProcessing = false;
            return;
        }

        if (!stdout.trim()) {
            console.log('No changes detected in Classes folder\n');
            isProcessing = false;
            return;
        }

        console.log('Changes detected in Classes folder:');
        console.log(stdout);

        // Add changes
        exec('git add Classes/', { cwd: __dirname }, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error adding files: ${error.message}`);
                isProcessing = false;
                return;
            }

            // Commit changes
            const commitMessage = `Auto-update Classes folder: ${timestamp}`;
            exec(`git commit -m "${commitMessage}"`, { cwd: __dirname }, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error committing: ${error.message}`);
                    isProcessing = false;
                    return;
                }

                console.log('Committed changes successfully');

                // Push to GitHub
                exec('git push students master', { cwd: __dirname }, (error, stdout, stderr) => {
                    if (error) {
                        console.error(`Error pushing to GitHub: ${error.message}`);
                        isProcessing = false;
                        return;
                    }

                    console.log('Successfully pushed to GitHub!');
                    console.log(stdout);
                    console.log('---\n');
                    isProcessing = false;
                });
            });
        });
    });
}

// Run immediately on startup
console.log('Running initial push check...\n');
gitPush();

// Then run periodically
setInterval(gitPush, CHECK_INTERVAL);

// Keep the process running
process.on('SIGINT', () => {
    console.log('\nAuto-push service stopped');
    process.exit(0);
});
