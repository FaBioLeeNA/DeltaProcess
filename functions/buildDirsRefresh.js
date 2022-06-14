const fs = require('fs')

module.exports = (day) => {
  
  const dirs = [
    `./refresh/dataFolder/${day}/braze`,
    `./refresh/dataFolder/${day}/MDP`,
    `./refresh/dataFolder/${day}/Delta`,
    `./refresh/dataFolder/${day}/Post_Delta`,
    `./refresh/dataFolder/${day}/Post_braze`,
    `./refresh/Result`,

  ];
  for (const dir of dirs) {
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir, { recursive: true });
    }
  }
  
}
