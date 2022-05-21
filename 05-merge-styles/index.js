const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'project-dist', 'bundle.css');
const stylesFolder = path.join(__dirname, 'styles');

async function func() {
  await fs.promises.writeFile(file, '');
  let styles = await fs.promises.readdir(stylesFolder, {withFileTypes: true});

  for (let style of styles) {
    if (path.extname(style.name) === '.css') {
      let currentStyle = await fs.promises.readFile(path.join(stylesFolder, style.name));
      await fs.promises.appendFile(file, currentStyle);
    }
  }
}
func();