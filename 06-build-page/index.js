const fs = require('fs');
const path = require('path');

async function func() {
  let template = await fs.promises.readFile(path.join(__dirname, 'template.html'));
  await fs.promises.mkdir(path.join(__dirname, 'project-dist'), {recursive: true});
  let htmlFiles = await fs.promises.readdir(path.join(__dirname, 'components'), {withFileTypes: true});

  for (let htmlFile of htmlFiles) {
    let htmlRead = await (await fs.promises.readFile(path.join(__dirname, 'components', htmlFile.name))).toString();
    let regexp = new RegExp(`{{${path.parse(htmlFile.name).name}}}`);
    template = template.toString().replace(regexp, `${htmlRead}`);
    await fs.promises.writeFile(path.join(__dirname, 'project-dist', 'index.html'), template);
  }
  collectCSS();
}

async function collectCSS() {
  const file = path.join(__dirname, 'project-dist', 'style.css');
  const stylesFolder = path.join(__dirname, 'styles');
  await fs.promises.writeFile(file, '');
  let styles = await fs.promises.readdir(stylesFolder, {withFileTypes: true});
  for (let style of styles.reverse()) {
    if (path.extname(style.name) === '.css') {
      let currentStyle = await fs.promises.readFile(path.join(stylesFolder, style.name));
      await fs.promises.appendFile(file, currentStyle);
    }
  }
  copyPatch(newFolder, folder);
}

const newFolder = path.join(__dirname, 'project-dist', 'assets');
const folder = path.join(__dirname, 'assets');

async function copyPatch(newFolder, folder) {
  await fs.promises.rm(newFolder, {force: true, recursive: true});
  await fs.promises.mkdir(newFolder, {recursive: true});
  let files = await fs.promises.readdir(folder, {withFileTypes: true});
  for (let file of files) {
    if (file.isFile()) {
      await fs.promises.copyFile(path.join(folder, file.name), path.join(newFolder, file.name));
    } else {
      let newFolderRec = path.join(newFolder, file.name);
      let folderRec = path.join(folder, file.name);
      copyPatch(newFolderRec, folderRec);
    }
  }
}

func();
