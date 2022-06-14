const fs = require('fs').promises
const getMD = require('./util/getMD')
const path = require('path')


const main = async () => {
  
  const dataPath = path.resolve(`refresh/data`)

  const files = ((await fs.readdir(dataPath)).map(path => `${dataPath}/${path}`))

  const data = await Promise.all(
    files.map(file => fs.readFile(file, {encoding: 'utf8'}))
  )
  
  // await fs.writeFile(`${MDPPath}/MDP_refresh.csv`, "external_id,\n", 'utf-8')
  let x = 1
  const flattened_and_parsed = data.reduce((acc, curr) => {
    console.log(`file${x++}`)
    const file_split = curr.split('\r\n')
    file_split.shift()
    file_split.pop()
    for(let i = 0; i < file_split.length; i++) {
      if (i%100000 == 0) console.log(`${i/10000}%`)
      file_split[i] = file_split[i].split('","')
    }
    return acc.concat(file_split) 

    // console.log(file_split)
  },[])
  let col = flattened_and_parsed[0].length
  let mal = []
  for (let i = 1; i < flattened_and_parsed.length; i++) {
    if (flattened_and_parsed[i].length != col) {
      mal.push(i)
    }
  }
  // console.log(flattened_and_parsed)
  console.log(mal)
}

main()