const fs = require('fs');
const path = require('path');
const { stdin } = process;

const userTextPath = path.join(__dirname, 'user-text.txt');
const writeStream = fs.createWriteStream(userTextPath, 'utf-8');

console.log('Input ur text here:');

stdin.on('data', (chunk) => {
  if (chunk.toString().trim() === 'exit') {
    console.log('Now u can look at ur text in "user-text.txt" file. Bye!');
    process.exit();
  }
  writeStream.write(chunk);
});

process.on('SIGINT', () => {
  console.log('Now u can look at ur text in "user-text.txt" file. Bye!');
  process.exit();
});
