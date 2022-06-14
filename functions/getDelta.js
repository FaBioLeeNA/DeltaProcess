const fs = require('fs').promises
const dif_algo = require('../util/dif_algo')

module.exports = async (brazePath, MDPPath, deltaPath, dest) => {
  const braze_str = await fs.readFile(brazePath, {encoding: 'utf8'})
  const braze_arr = braze_str.split('\n')

  const MDP_str = await fs.readFile(MDPPath, {encoding: 'utf8'})
  const MDP_arr = MDP_str.split('\n')

  for (let i = 0; i < MDP_arr.length; i++) {
    let row_str = MDP_arr[i]
    let row_arr = row_str.split(',')
    MDP_arr[i] = row_arr
  }
  
  const delta = dif_algo(MDP_arr, braze_arr)
  const delta_only_ID =[]
  
  for (let i = 0; i < delta[0].length; i++) {
    delta_only_ID.push(delta[0][i][0])
  }

  await fs.writeFile(`${deltaPath}/delta.csv`, delta[0].join('\n'), 'utf-8')
  await fs.writeFile(`${deltaPath}/delta_only_ID.csv`, delta_only_ID.join('\n'), 'utf-8')
  await fs.writeFile(`${deltaPath}/non_delta.csv`, delta[1].join('\n'), 'utf-8')
  await fs.writeFile(dest, delta_only_ID.join('\n'), 'utf-8')
}
