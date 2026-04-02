const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const siteKey = process.env.CLOUDFLARE_SITEKEY || '1x00000000000000000000AA'; // Fallback to test key

console.log('--- Starting Build Process ---');
if (process.env.CLOUDFLARE_SITEKEY) {
  console.log('✅ CLOUDFLARE_SITEKEY detected in environment.');
} else {
  console.log('⚠️ CLOUDFLARE_SITEKEY not found, using fallback test key.');
}

// 1. Clean and Create Public Directory
if (fs.existsSync(publicDir)) {
  console.log('Cleaning existing public directory...');
  fs.rmSync(publicDir, { recursive: true, force: true });
}
fs.mkdirSync(publicDir);
console.log('Created public directory.');

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
    fs.copyFileSync(srcPath, path.join(publicDir, file));
    console.log(`Copied ${file}`);
  }
});

dirsToCopy.forEach(dir => {
  const srcPath = path.join(__dirname, dir);
  if (fs.existsSync(srcPath)) {
    copyDir(srcPath, path.join(publicDir, dir));
    console.log(`Copied directory: ${dir}`);
  }
});

// 5. Inject Site Key into index.html
const indexPath = path.join(__dirname, 'index.html');
if (fs.existsSync(indexPath)) {
  let content = fs.readFileSync(indexPath, 'utf8');
  
  // Replace placeholder with environment variable
  const updatedContent = content.replace(/__CLOUDFLARE_SITEKEY__/g, siteKey);
  
  fs.writeFileSync(path.join(publicDir, 'index.html'), updatedContent);
  console.log('Injected Site Key into index.html and saved to public/');
} else {
  console.error('Error: index.html not found!');
  process.exit(1);
}

console.log('--- Build Completed Successfully ---');
