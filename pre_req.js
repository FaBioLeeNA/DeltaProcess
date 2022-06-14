const buildPreDirs = require('./functions/buildPreDirs')
const getMD = require('./util/getMD')
const MD = getMD()

const main = () => {
  buildPreDirs(MD)
}

main()