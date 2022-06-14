require('dotenv').config()
const download = require('./util/download')
const path = require('path')
const pull = require('./util/pull_segment_users')
const sleep = require('./util/sleep')
const buildDirsPP = require('./functions/buildDirsPP')
const decompress = require('decompress')
const brazeDataToCsv = require('./util/brazeDataToCsv')
const sort = require('./util/sort')
const { PP_SEGMENT_ID } = process.env
const getDeltaPP = require('./functions/getDeltaPP')
const getMD = require('./util/getMD')
const PRV = require('./functions/preReqValidation')

const MD = getMD()

const brazePath = path.resolve(`pp/dataFolder/${MD}/braze`)
const MDPPath = path.resolve(`pp/dataFolder/${MD}/MDP`)
const deltaPath = path.resolve(`pp/dataFolder/${MD}/Delta`)

const {log} = console

const main = async () => {

  // const val = PRV(MD)
  // if (!val[0]) return console.error('\x1b[31m%s\x1b[0m', val[1])

  buildDirsPP(MD)

  const pullPayload = ['external_id']

  const braze_PP_res = await pull(PP_SEGMENT_ID, pullPayload)
  const braze_PP_url = braze_PP_res.url
  
  const braze_PP_data_zip_path = `${brazePath}/braze_PP_data.zip`
  const braze_PP_data = `${brazePath}/data`
  const braze_PP_csv = `${brazePath}/braze_PP.csv`
  
  log("Waiting 10 seconds to download braze PP data...")

  await sleep(10)

  log("Downloading...")

  await download(braze_PP_url, braze_PP_data_zip_path)

  log("Download Complete")
  log("Decompressing...")

  await decompress(braze_PP_data_zip_path, braze_PP_data)

  log("Decompress Complete")
  log("Transforming...")

  await brazeDataToCsv(braze_PP_data, braze_PP_csv)

  log("Transformation Complete")
  
  const braze_PP_sort = `${brazePath}/braze_PP_sort.csv`
  const MDP_PP_csv = `${MDPPath}/MDP_PP.csv`
  const MDP_PP_sort = `${MDPPath}/MDP_PP_sort.csv`

  log("Sorting...")

  await sort(braze_PP_csv, MDP_PP_csv, braze_PP_sort, MDP_PP_sort)
  
  log("Sort Complete")

  const delta_PP = `${deltaPath}`
  const result_PP_csv = `./pp/Result/pp_delta_${MD}.csv`

  log("Getting Delta...")

  await getDeltaPP(braze_PP_sort, MDP_PP_sort, delta_PP, result_PP_csv)

  log("Process finish. Check Result Folder")

}



main()


