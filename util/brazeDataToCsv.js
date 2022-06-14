const doRequest = require('./doRequest')
const {log} = console
const fsp = require('fs').promises
const path = require('path')
const json_to_csv = require('./json_to_csv.js')

module.exports = async (dataPath ,dest) => {
  const files = (await fsp.readdir(dataPath)).map(path => `${dataPath}/${path}`);
  const arr = await json_to_csv(files)
  await fsp.writeFile(dest, arr, 'utf-8')
}


