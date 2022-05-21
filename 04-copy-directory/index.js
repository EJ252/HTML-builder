const fs = require('fs');
const path = require('path');
const newFolder = path.join(__dirname, 'files-copy');
const folder = path.join(__dirname, 'files');

async function func() {
  await fs.promises.mkdir(newFolder, {recursive: true});
  let files = await fs.promises.readdir(folder, {withFileTypes: true});
  for (let file of files) {
    await fs.promises.copyFile(path.join(folder, file.name), path.join(newFolder, file.name));
  }
}
func();
