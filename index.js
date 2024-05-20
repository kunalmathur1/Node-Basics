const fs = require('fs');
const path = require('path');

// Retrieve the command line arguments
const args = process.argv.slice(2);
const command = args[0];
const filePath = args[1];

if (!command) {
    console.error('No command provided');
    process.exit(1);
}

// Function to read a file
function readFile(file) {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error: ${err.message}`);
        } else {
            console.log(data);
        }
    });
}

// Function to append content to a file
function appendToFile(file, content) {
    fs.appendFile(file, content + '\n', (err) => {
        if (err) {
            console.error(`Error: ${err.message}`);
        } else {
            console.log(`Content appended to the file '${file}'`);
        }
    });
}

// Function to delete a file
function deleteFile(file) {
    fs.unlink(file, (err) => {
        if (err) {
            console.error(`Error: ${err.message}`);
        } else {
            console.log(`File '${file}' deleted`);
        }
    });
}

// Function to create a file
function createFile(file) {
    fs.writeFile(file, '', (err) => {
        if (err) {
            console.error(`Error: ${err.message}`);
        } else {
            console.log(`File '${file}' created`);
        }
    });
}



// Function to rename a file
function renameFile(oldPath, newPath) {
    fs.rename(oldPath, newPath, (err) => {
        if (err) {
            console.error(`Error: ${err.message}`);
        } else {
            console.log(`File '${oldPath}' renamed to '${newPath}'`);
        }
    });
}

// Function to list directory contents
function listDirectory(dir) {
    fs.readdir(dir, (err, files) => {
        if (err) {
            console.error(`Error: ${err.message}`);
        } else {
            files.forEach(file => {
                console.log(file);
            });
        }
    });
}

// Execute the appropriate function based on the command
switch (command) {
    case 'read':
        if (filePath) {
            readFile(filePath);
        } else {
            console.error('No file specified for reading.');
        }
        break;

        case 'append':
        const content = args.slice(2).join(' ');
        if (filePath && content) {
            appendToFile(filePath, content);
        } else {
            console.error('No file or content specified for appending.');
        }
        break;
    case 'delete':
        if (filePath) {
            deleteFile(filePath);
        } else {
            console.error('No file specified for deletion.');
        }
        break;
    case 'create':
        if (filePath) {
            createFile(filePath);
        } else {
            console.error('No file specified for creation.');
        }
        break;
    
    case 'rename':
        const newFilePath = args[2];
        if (filePath && newFilePath) {
            renameFile(filePath, newFilePath);
        } else {
            console.error('Old and new file names must be specified for renaming.');
        }
        break;
    case 'list':
        const dirPath = filePath || '.';
        listDirectory(dirPath);
        break;
    default:
        console.error('Invalid command');
}
