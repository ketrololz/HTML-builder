const path = require('path');
const fs = require('fs');

fs.readdir(
  path.join(__dirname, 'secret-folder'),
  { withFileTypes: true },
  (err, data) => {
    if (err) throw err;

    data.forEach((file) => {
      if (file.isFile()) {
        const filePath = path.join(file.path, file.name);
        const fileName = file.name.split('.')[0];
        const fileExt = path.extname(filePath).slice(1);

        fs.stat(filePath, (err, stats) => {
          if (err) throw err;

          const fileSize = Math.floor((stats.size / 1024) * 1000) / 1000;
          const result = [fileName, fileExt, fileSize].join(' - ');

          console.log(result, 'KB');
        });
      }
    });
  },
);
