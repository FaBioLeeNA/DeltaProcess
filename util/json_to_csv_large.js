const fs = require('fs').promises

module.exports = async (files, attributes, custom_attributes) => {
  if (Array.isArray(files)) {
    // let size = 100
    // let start = 0
    // const files_sample = files.slice(start,start + size)

    const attributes_str = attributes.join(',')
    const custom_attributes_str = custom_attributes.join(',')
    const header =  attributes_str + ',' + custom_attributes_str
    // console.log(header)
    console.log('start reading files')
    const data = await Promise.all(
      // files_sample.map(file => fs.readFile(file, {encoding: 'utf8'}))
      files.map(file => fs.readFile(file, {encoding: 'utf8'}))
      )
    console.log('finish reading files')

    const flattened_and_parsed = data.reduce((acc, curr) => {
      const file_split = curr.split('\n')
      file_split.pop()

      const filtered = file_split.filter(obj=>{
        return (!isNaN(parseInt(JSON.parse(obj).external_id)))
      })

      const new_acc = acc.concat(filtered.map(json =>  {
        let obj = JSON.parse(json)

        let str = `\n`

        for (let i = 0; i < attributes.length; i++) {
          if (obj[attributes[i]]) {
            str+= `"${obj[attributes[i]]}"`
          } else {
            str+= '""'
          }
          str+=','
        }
        

        if (obj['custom_attributes']) {
          for (let i = 0; i < custom_attributes.length; i++) {
            let prop = obj['custom_attributes'][custom_attributes[i]]
            if (prop) {
              str += `"${prop}"`
            } else {
              str += '""'
            }
            if (i != custom_attributes.length - 1) {
              str += ','
            }
          }
        }
        return str
      }))

      return new_acc
    }, [])
    return header.concat(flattened_and_parsed.join(''));
  } 
}