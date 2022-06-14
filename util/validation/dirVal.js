const fs = require('fs')

module.exports = (day) => {
  
  const dirs = [
    `./dataFolder/${day}/MDP/LED`,
    `./dataFolder/${day}/MDP/AR`,
  ];
  
  for (const dir of dirs) {
    if (!fs.existsSync(dir)){
      return false
    }
  }

  return true
  
}
