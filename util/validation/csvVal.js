const fs = require('fs')

module.exports = (day) => {
  
  const dirs = [
    `./dataFolder/${day}/MDP/LED/MDP_LED.csv`,
    `./dataFolder/${day}/MDP/AR/MDP_AR.csv`,
  ];
  
  for (const dir of dirs) {
    if (!fs.existsSync(dir)){
      return false
    }
  }
  
  return true
  
}
