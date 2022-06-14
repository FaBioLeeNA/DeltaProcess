const fs = require('fs').promises

module.exports = async (brazePath, MDPPath, brazeDest, MDPDest) => {
  const braze_str = await fs.readFile(brazePath, {encoding: 'utf8'})
  const braze_arr = braze_str.split('\n')
  braze_arr.shift()
  for (let i = 0; i < braze_arr.length; i++) {
    let row_str = braze_arr[i]
    let row_arr = row_str.split(',')
    braze_arr[i] = row_arr[0]
  }
  const braze_arr_unique = [... new Set(braze_arr)];
  braze_arr_unique.sort((a,b) => a - b)

  const MDP_str = await fs.readFile(MDPPath, {encoding: 'utf8'})
  const MDP_arr = MDP_str.split('\r\n')
  for (let i = 0; i < MDP_arr.length; i++) {
    let row_str = MDP_arr[i]
    let row_arr = row_str.split(',')
    row_arr[0] = (+row_str.split(',')[0]).toString()
    MDP_arr[i] = row_arr
  }

  MDP_arr.sort((a,b) => a[0] - b[0])
  const MDP_arr_unique = []

  for (let i = 0; i < MDP_arr.length - 1; i++) {
    if (MDP_arr[i][0] != MDP_arr[i+1][0]) {
      MDP_arr_unique.push(MDP_arr[i])
    }
  }

  await fs.writeFile(brazeDest, braze_arr_unique.join('\n'), 'utf-8')
  await fs.writeFile(MDPDest, MDP_arr_unique.join('\n'), 'utf-8')
  
}

