const dirVal = require('../util/validation/dirVal')
const csvVal = require('../util/validation/csvVal')
module.exports = (day) => {
  
  if(!dirVal(day)) {
    return [false, 'ERROR: Please run pre_req.js to create. After that, please add the MDP_AR.csv and MDP_LED.csv files on the respective folder']
  }

  if (!csvVal(day)) {
    return [false, 'ERROR: Please make sure the files MDP_AR.csv and MDP_LED.csv are on the respective folders']
  }
  
  return [true]
}
