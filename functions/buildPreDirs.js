const fs = require('fs')

module.exports = (day) => {
  
  const dirs = [
    `./dataFolder/${day}/MDP/LED`,
    `./dataFolder/${day}/MDP/AR`,
    `./pp/dataFolder/${day}/MDP`,
    `./nov/dataFolder/${day}/MDP`,
    `./refresh/dataFolder/${day}/MDP`,
  ];
  
  for (const dir of dirs) {
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir, { recursive: true });
    }
  }
  
}
