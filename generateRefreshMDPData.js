const fs = require('fs').promises
const getMD = require('./util/getMD')
const path = require('path')


const main = async () => {
  
  const MDPPath = path.resolve(`refresh/dataFolder/${getMD()}/MDP`)
  const dataPath = path.resolve(`refresh/data`)

  const files = ((await fs.readdir(dataPath)).map(path => `${dataPath}/${path}`))

  const data = await Promise.all(
    files.map(file => fs.readFile(file, {encoding: 'utf8'}))
  )
  
  await fs.writeFile(`${MDPPath}/MDP_refresh.csv`, "external_id,\n", 'utf-8')
  let x = 1
  const flattened_and_parsed = data.reduce((acc, curr) => {
    console.log(`file${x++}`)
    const file_split = curr.split('\r\n')
    file_split.shift()
    file_split.pop()
    for(let i = 0; i < file_split.length; i++) {
      if (i%100000 == 0) console.log(`${i/10000}%`)
      file_split[i] = file_split[i].split(',')[0]
    }
    return acc.concat(file_split) 
    // const filtered = file_split.filter(obj=>(!isNaN(parseInt(JSON.parse(obj).external_id))))
    // return acc.concat(filtered.map(json =>  '\n' + JSON.parse(json)['external_id']))
  },[])
  fs.appendFile(`${MDPPath}/MDP_refresh.csv`, flattened_and_parsed.join('\n'), 'utf-8')


}

main()