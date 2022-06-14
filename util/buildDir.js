const fs = require('fs')

module.exports = (day, folders, mainDir) => {
  

  // `./dataFolder/${day}/braze/LED`,
  //   `./dataFolder/${day}/braze/AR`,
  //   `./dataFolder/${day}/MDP/LED`,
  //   `./dataFolder/${day}/MDP/AR`,
  //   `./dataFolder/${day}/Delta/LED`,
  //   `./dataFolder/${day}/Delta/AR`,

  const recur = (dirs, str) =>
  {
    let dirsArr = [];
    if (typeof dirs == 'object' && !Array.isArray(dirs) && dirs !== null) {
      const keys = Object.keys(folders)
      for (let i = 0; i < keys.length; i++) {
        dirsArr = [...dirsArr, recur(dirs[keys[i]], `${str}/${keys[i]}`)]
      }
    } else if (Array.isArray(dirs)) {
      for (let i = 0; i < dirs.length; i++) {
        dirsArr.push(`${str}/${dirs[i]}`)
      }
    }
    return dirsArr;
  }

  let result = recur(folders, `./${mainDir}/${day}`)
  for (const dir of result) {
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir, { recursive: true });
    }
  }
  return result
}
