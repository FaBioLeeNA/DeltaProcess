require('dotenv').config()
const download = require('./util/download')
const path = require('path')
const pull = require('./util/pull_segment_users_dev')
const sleep = require('./util/sleep')
const buildDirsRefresh = require('./functions/buildDirsRefresh')
const decompress = require('decompress')
const brazeDataToCsv = require('./util/brazeDataToCsv')
const sort = require('./util/sort_refresh')
const { refresh_SEGMENT_ID,ALL_USERS_SEGMENT_ID } = process.env
const getDeltaRefresh = require('./functions/getDeltaRefresh')
const getMD = require('./util/getMD')
const PRV = require('./functions/preReqValidation')

const MD = getMD()

const brazePath = path.resolve(`refresh/dataFolder/${MD}/braze`)
const MDrefreshPath = path.resolve(`refresh/dataFolder/${MD}/MDP`)
const deltaPath = path.resolve(`refresh/dataFolder/${MD}/Delta`)

const {log} = console

const main = async (time) => {


  buildDirsRefresh(MD)

  const pullPayload = ['external_id']

  const braze_refresh_res = await pull(ALL_USERS_SEGMENT_ID, pullPayload)
  const braze_refresh_url = braze_refresh_res.url
  
  const braze_refresh_data_zip_path = `${brazePath}/braze_refresh_data.zip`
  const braze_refresh_data = `${brazePath}/data`
  const braze_refresh_csv = `${brazePath}/braze_refresh.csv`
  
  log(`Waiting ${time} seconds to download braze refresh data...`)
  log(braze_refresh_url)
  await sleep(time)

  log("Downloading...")

  await download(braze_refresh_url, braze_refresh_data_zip_path)

  log("Download Complete")

  log("Decompressing...")

  await decompress(braze_refresh_data_zip_path, braze_refresh_data)

  log("Decompress Complete")
  log("Transforming...")

  await brazeDataToCsv(braze_refresh_data, braze_refresh_csv)

  log("Transformation Complete")
  
  const braze_refresh_sort = `${brazePath}/braze_refresh_sort.csv`
  const MDP_refresh_csv = `${MDrefreshPath}/MDP_refresh.csv`
  const MDP_refresh_sort = `${MDrefreshPath}/MDP_refresh_sort.csv`

  log("Sorting...")

  await sort(braze_refresh_csv, MDP_refresh_csv, braze_refresh_sort, MDP_refresh_sort)
  
  log("Sort Complete")

  const delta_refresh = `${deltaPath}`
  const result_refresh_csv = `./refresh/Result/refresh_delta_${MD}.csv`

  log("Getting Delta...")

  await getDeltaRefresh(braze_refresh_sort, MDP_refresh_sort, delta_refresh, result_refresh_csv)

  log("Process finish. Check Result Folder")

}



main(600)


