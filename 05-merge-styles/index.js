const fs = require('fs/promises');
const path = require('path');

const stylesFolderPath = path.join(__dirname, 'styles');
const bundleFolderPath = path.join(__dirname, 'project-dist');
const bundle = path.join(bundleFolderPath, 'bundle.css');

async function createBundle() {
  try {
    const files = await fs.readdir(stylesFolderPath, (files) => files);
    let newInner = '';

    for (const file of files) {
      const filePath = path.join(__dirname, file);
      const fileExt = path.extname(filePath);

      if (fileExt === '.css') {
        const fileInner = await fs.readFile(
          path.join(__dirname, 'styles', file),
          'utf8',
        );
        newInner += fileInner;
      }
    }
    fs.writeFile(bundle, newInner);
  } catch (err) {
    console.error(err);
  }
}

createBundle();
