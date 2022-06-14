const fs = require('fs').promises

module.exports = async (files) => {
  if (Array.isArray(files)) {
    const data = await Promise.all(
      files.map(file => fs.readFile(file, {encoding: 'utf8'}))
    )
    const flattened_and_parsed = data.reduce((acc, curr) => {
      const file_split = curr.split('\n')
      file_split.pop()
      const filtered = file_split.filter(obj=>(!isNaN(parseInt(JSON.parse(obj).external_id))))
      return acc.concat(filtered.map(json =>  '\n' + JSON.parse(json)['external_id']))
    }, [])
    return "external_id,".concat(flattened_and_parsed);
  } else { 
    const data = await fs.readFile(files, {encoding: 'utf8'})

    const file_split = data.split('\n')
    file_split.pop()

    const external_ids = file_split.map(json => '\n' + JSON.parse(json)['external_id'])
    return "external_id,".concat(external_ids);
  }
}