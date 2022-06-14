require('dotenv').config()
const download = require('./util/download')
const path = require('path')
const pull = require('./util/pull_segment_users')
const sleep = require('./util/sleep')
const buildDirs = require('./functions/buildDirs')
const decompress = require('decompress')
const brazeDataToCsv = require('./util/brazeDataToCsv')
const sort = require('./util/sort')
const { AR_SEGMENT_ID, LED_SEGMENT_ID} = process.env
const getDelta = require('./functions/getDelta')
const getMD = require('./util/getMD')
const PRV = require('./functions/preReqValidation')

const MD = getMD()

const brazePath = path.resolve(`dataFolder/${MD}/braze`)
const MDPPath = path.resolve(`dataFolder/${MD}/MDP`)
const deltaPath = path.resolve(`dataFolder/${MD}/Delta`)

const {log} = console

const main = async () => {

  // const val = PRV(MD)
  // if (!val[0]) return console.error('\x1b[31m%s\x1b[0m', val[1])

  buildDirs(MD)

  const pullPayload = ['external_id']

  const braze_LED_res = await pull(LED_SEGMENT_ID, pullPayload)
  const braze_LED_url = braze_LED_res.url

  // const braze_AR_res = await pull(AR_SEGMENT_ID, pullPayload)
  // const braze_AR_url = braze_AR_res.url


  // const braze_AR_data_zip_path = `${brazePath}/AR/braze_AR_data.zip`
  // const braze_AR_data = `${brazePath}/AR/data`
  // const braze_AR_csv = `${brazePath}/AR/braze_AR.csv`

  // log("Waiting 20 seconds to download braze AR data...")

  // await sleep(20)

  // log("Downloading...")

  // await download(braze_AR_url, braze_AR_data_zip_path)

  // log("Download Complete")
  // log("Decompressing...")

  // await decompress(braze_AR_data_zip_path, braze_AR_data)

  // log("Decompress Complete")
  // log("Transforming...")

  // await brazeDataToCsv(braze_AR_data, braze_AR_csv)

  // log("Transformation Complete")
  
  const braze_LED_data_zip_path = `${brazePath}/LED/braze_LED_data.zip`
  const braze_LED_data = `${brazePath}/LED/data`
  const braze_LED_csv = `${brazePath}/LED/braze_LED.csv`

  log("Waiting 40 seconds to download braze LED data...")

  await sleep(40)

  log("Downloading...")

  await download(braze_LED_url, braze_LED_data_zip_path)

  log("Download Complete")
  log("Decompressing...")

  await decompress(braze_LED_data_zip_path, braze_LED_data)

  log("Decompress Complete")
  log("Transforming...")

  await brazeDataToCsv(braze_LED_data, braze_LED_csv)

  log("Transformation Complete")
  
  const braze_LED_sort = `${brazePath}/LED/braze_LED_sort.csv`
  // const braze_AR_sort = `${brazePath}/AR/braze_AR_sort.csv`

  const MDP_LED_csv = `${MDPPath}/LED/MDP_LED.csv`
  const MDP_LED_sort = `${MDPPath}/LED/MDP_LED_sort.csv`

  // const MDP_AR_csv = `${MDPPath}/AR/MDP_AR.csv`
  // const MDP_AR_sort = `${MDPPath}/AR/MDP_AR_sort.csv`

  log("Sorting...")

  await sort(braze_LED_csv, MDP_LED_csv, braze_LED_sort, MDP_LED_sort)
  // await sort(braze_AR_csv, MDP_AR_csv, braze_AR_sort, MDP_AR_sort)
  
  log("Sort Complete")

  const delta_LED = `${deltaPath}/LED`
  const result_LED_csv = `./Result/LED_delta_${MD}.csv`
  // const delta_AR = `${deltaPath}/AR`
  // const result_AR_csv = `./Result/AR_delta_${MD}.csv`

  log("Getting Delta...")

  await getDelta(braze_LED_sort, MDP_LED_sort, delta_LED, result_LED_csv)
  // await getDelta(braze_AR_sort, MDP_AR_sort, delta_AR, result_AR_csv)

  log("Process finish. Check Result Folder")

}




main()


