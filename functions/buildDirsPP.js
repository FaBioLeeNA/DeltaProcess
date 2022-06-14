const fs = require('fs')

module.exports = (day) => {
  
  const dirs = [
    `./pp/dataFolder/${day}/braze`,
    `./pp/dataFolder/${day}/MDP`,
    `./pp/dataFolder/${day}/Delta`,
    `./pp/dataFolder/${day}/Post_Delta`,
    `./pp/dataFolder/${day}/Post_braze`,
    `./pp/Result`,

  ];
  
  for (const dir of dirs) {
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir, { recursive: true });
    }
  }
  
}
