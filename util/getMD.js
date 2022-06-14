const today = new Date
const month = today.getMonth() + 1
const date = today.getDate()

module.exports = () => {
  return `${month}-${date}`
}