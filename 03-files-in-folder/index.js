const fs = require('fs');
const path = require('path');
const folder = path.join(__dirname, 'secret-folder');

async function func() {
  let filenames = await fs.promises.readdir(folder, {withFileTypes: true});
  for (let filename of filenames) {
    if (filename.isFile()) {
      let sizes = await fs.promises.stat(path.join(folder, filename.name));
      console.log(path.parse(filename.name).name, '-', path.extname(filename.name).slice(1), '-', sizes.size / 1024);
    } 
  }
}
func();