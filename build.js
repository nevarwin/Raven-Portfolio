const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');
const siteKey = process.env.CLOUDFLARE_SITEKEY || '1x00000000000000000000AA'; // Fallback to test key

console.log('--- Starting Build Process ---');

// 1. Clean and Create Dist Directory
if (fs.existsSync(distDir)) {
  console.log('Cleaning existing dist directory...');
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir);
console.log('Created dist directory.');

// 2. Helper function to copy recursively
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    entry.isDirectory() ? copyDir(srcPath, destPath) : fs.copyFileSync(srcPath, destPath);
  }
}

// 3. Define files and directories to copy
const filesToCopy = [
  'style.css',
  'robots.txt',
  'sitemap.xml',
  'photo.png',
  'resume.png',
  'Email.png',
  'Facebook.png',
  'GitHub.png',
  'LinkedIn.png'
];

const dirsToCopy = [
  'assets'
];

// 4. Execute Copies
filesToCopy.forEach(file => {
  const srcPath = path.join(__dirname, file);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, path.join(distDir, file));
    console.log(`Copied ${file}`);
  }
});

dirsToCopy.forEach(dir => {
  const srcPath = path.join(__dirname, dir);
  if (fs.existsSync(srcPath)) {
    copyDir(srcPath, path.join(distDir, dir));
    console.log(`Copied directory: ${dir}`);
  }
});

// 5. Inject Site Key into index.html
const indexPath = path.join(__dirname, 'index.html');
if (fs.existsSync(indexPath)) {
  let content = fs.readFileSync(indexPath, 'utf8');
  
  // Replace placeholder with environment variable
  const updatedContent = content.replace(/__CLOUDFLARE_SITEKEY__/g, siteKey);
  
  fs.writeFileSync(path.join(distDir, 'index.html'), updatedContent);
  console.log('Injected Site Key into index.html and saved to dist/');
} else {
  console.error('Error: index.html not found!');
  process.exit(1);
}

console.log('--- Build Completed Successfully ---');
