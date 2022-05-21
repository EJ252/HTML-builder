const fs = require('fs');
const path = require('path');
const readline = require('readline');

const file = path.join(__dirname, 'text.txt');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

fs.writeFile(file, '', (err) => {
  if (err) throw err;
});

console.log('Write something: ');

rl.on('line', (input) => {
  if (input === 'exit') {
    console.log('Done!');
    rl.close();
  } else {
    fs.appendFile(file, input, (err) => {
      if (err) throw err;
    });
  }
});

rl.on('SIGINT', () => {
  console.log('Done!');
  rl.close();
});