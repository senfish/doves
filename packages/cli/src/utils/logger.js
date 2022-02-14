
const figlet = require('figlet');

const {
  yellow,
  green,
  cyan,
  blue,
  magenta,
  lightRed,
  red,
  reset,
  bold
} = require('kolorist');

function logo() {
  console.log(green(figlet.textSync('doves', {
    horizontalLayout: 'full',
  })))
  console.log();
}
module.exports = {
  yellow,
  green,
  cyan,
  blue,
  magenta,
  lightRed,
  red,
  reset,
  bold,
  logo,
}