const fs = require('fs/promises');
const path = require('path');

const cloneFolderPath = path.join(__dirname, 'files-copy');
const authFolderPath = path.join(__dirname, 'files');

async function copyDir() {
  try {
    await fs.mkdir(path.join(cloneFolderPath), { recursive: true });

    const files = await fs.readdir(path.join(authFolderPath), (files) => files);

    for (const file of files) {
      await fs.copyFile(
        path.join(authFolderPath, file),
        path.join(cloneFolderPath, file),
      );
    }

    const cloneFiles = await fs.readdir(
      path.join(cloneFolderPath),
      (files) => files,
    );

    for (const file of cloneFiles) {
      fs.open(path.join(authFolderPath, file), 'r')
        .then()
        .catch((err) => {
          if (err.code === 'ENOENT') {
            fs.unlink(path.join(cloneFolderPath, file));
          }
        });
    }
  } catch (err) {
    console.error(err);
  }
}

copyDir();
