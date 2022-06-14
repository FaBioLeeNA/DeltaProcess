require('dotenv').config()
const download = require('./util/download')
const path = require('path')
const pull = require('./util/pull_segment_users')
const sleep = require('./util/sleep')
const decompress = require('decompress')
const brazeDataToCsv = require('./util/brazeDataToCsv')
const sort = require('./util/sort')
const { OCT_SEGMENT_ID } = process.env
const getDelta = require('./functions/getDelta')
const getMD = require('./util/getMD')
const buildDir = require('./util/buildDir')



const MD = getMD()

const brazePath = path.resolve(`nov/dataFolder/${MD}/braze`)
const MDnovath = path.resolve(`nov/dataFolder/${MD}/MDP`)
const deltaPath = path.resolve(`nov/dataFolder/${MD}/Delta`)

const {log} = console

const main = async () => {

  // const val = PRV(MD)
  // if (!val[0]) return console.error('\x1b[31m%s\x1b[0m', val[1])

  buildDir(MD,['braze', 'Delta', 'MDP'],'nov/dataFolder')

  const pullPayload = ['external_id']

  const braze_nov_res = await pull(OCT_SEGMENT_ID, pullPayload)
  const braze_nov_url = braze_nov_res.url
  
  const braze_nov_data_zip_path = `${brazePath}/braze_nov_data.zip`
  const braze_nov_data = `${brazePath}/data`
  const braze_nov_csv = `${brazePath}/braze_nov.csv`
  
  log("Waiting 20 seconds to download braze nov data...")

  await sleep(20)

  log("Downloading...")

  await download(braze_nov_url, braze_nov_data_zip_path)

  log("Download Complete")

  log("Decompressing...")

  await decompress(braze_nov_data_zip_path, braze_nov_data)

  log("Decompress Complete")

  log("Transforming...")

  await brazeDataToCsv(braze_nov_data, braze_nov_csv)

  log("Transformation Complete")
  
  const braze_nov_sort = `${brazePath}/braze_nov_sort.csv`
  const MDP_nov_csv = `${MDnovath}/MDP_nov.csv`
  const MDP_nov_sort = `${MDnovath}/MDP_nov_sort.csv`

  log("Sorting...")

  await sort(braze_nov_csv, MDP_nov_csv, braze_nov_sort, MDP_nov_sort)
  
  log("Sort Complete")

  const delta_nov = `${deltaPath}`
  const result_nov_csv = `./nov/Result/nov_delta_${MD}.csv`

  log("Getting Delta...")

  await getDelta(braze_nov_sort, MDP_nov_sort, delta_nov, result_nov_csv)

  log("Process finish. Check Result Folder")

}



main()


