const fs = require('fs');
const path = require('path');

const cloneFolderPath = path.join(__dirname, 'files-copy');
const authFolderPath = path.join(__dirname, 'files');

fs.mkdir(path.join(cloneFolderPath), { recursive: true }, (err) => {
  if (err) throw err;
});

fs.readdir(path.join(authFolderPath), (err, files) => {
  if (err) throw err;

  files.forEach((file) => {
    fs.copyFile(
      path.join(authFolderPath, file),
      path.join(cloneFolderPath, file),
      (err) => {
        if (err) return err;
      },
    );
  });
});

fs.readdir(path.join(cloneFolderPath), (err, files) => {
  if (err) throw err;

  files.forEach((file) => {
    fs.open(path.join(authFolderPath, file), 'r', (err) => {
      if (err) {
        if (err.code === 'ENOENT') {
          fs.unlink(path.join(cloneFolderPath, file), (err) => {
            if (err) throw err;
          });
        }
      }
    });
  });
});
