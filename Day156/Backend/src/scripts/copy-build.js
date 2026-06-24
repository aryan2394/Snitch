import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define sources and destinations relative to this script
const source = path.join(__dirname, '..', '..', '..', 'Frontend', 'dist');
const destination = path.join(__dirname, '..', '..', 'public');

function copyDir(src, dest) {
    if (fs.existsSync(dest)) {
        fs.rmSync(dest, { recursive: true, force: true });
    }
    fs.mkdirSync(dest, { recursive: true });
    
    const entries = fs.readdirSync(src, { withFileTypes: true });
    for (let entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        
        if (entry.isDirectory()) {
            copyDir(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

console.log(`Copying React build from: ${source}`);
console.log(`To: ${destination}`);

if (fs.existsSync(source)) {
    try {
        copyDir(source, destination);
        console.log('React build files copied to Backend/public successfully!');
    } catch (err) {
        console.error('Error during copying files:', err);
        process.exit(1);
    }
} else {
    console.error('Error: Source directory (Frontend/dist) does not exist.');
    console.error('Please run "npm run build" in the Frontend directory first.');
    process.exit(1);
}
