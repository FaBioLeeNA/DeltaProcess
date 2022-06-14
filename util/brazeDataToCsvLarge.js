const doRequest = require('./doRequest')
const {log} = console
const fsp = require('fs').promises
const path = require('path')
const json_to_csv = require('./json_to_csv_large.js')

module.exports = async (dataPath, attributes, custom_attributes, dest) => {
  const files = (await fsp.readdir(dataPath)).map(path => `${dataPath}/${path}`);
  let dest_str = dest.replace('.csv','')

  // console.log(files.length)

  for (let i = 0; i < Math.ceil(files.length/100); i++) {
    const arr = await json_to_csv(files.slice(i*100,i*100+100), attributes, custom_attributes)
    console.log(`start writing file ${i}`)
    await fsp.writeFile(`${dest_str}${i}.csv`, arr, 'utf-8')
  }
}


