const fs = require('fs')

module.exports = (day) => {
  
  const dirs = [
    `./dataFolder/${day}/braze/LED`,
    `./dataFolder/${day}/braze/AR`,
    `./dataFolder/${day}/MDP/LED`,
    `./dataFolder/${day}/MDP/AR`,
    `./dataFolder/${day}/Delta/LED`,
    `./dataFolder/${day}/Delta/AR`,
    // `./dataFolder/${day}/Delta/LED`,
    // `./dataFolder/${day}/Delta/AR`,
    `./Result`,
  ];
  
  for (const dir of dirs) {
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir, { recursive: true });
    }
  }
  
}
