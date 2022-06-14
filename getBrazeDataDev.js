require('dotenv').config()
const download = require('./util/download')
const path = require('path')
const pull = require('./util/pull_segment_users_dev')
const sleep = require('./util/sleep')
const decompress = require('decompress')
const brazeDataToCsv = require('./util/brazeDataToCsv')
const sort = require('./util/sort')
const { SUPP_SEGMENT_ID, DEV_ALL_USERS_SEGMENT_ID } = process.env
const getDelta = require('./functions/getDelta')
const getMD = require('./util/getMD')
const buildDir = require('./util/buildDir')



const MD = getMD()


const {log} = console

const main = async (payload, folders, segmentId) => {

  const folderPath = buildDir(MD,folders,'extra')
  
  const braze_res = await pull(segmentId, payload)
  const braze_url = braze_res.url
  
  const braze_data_zip_path = `${folderPath}/braze_data.zip`
  const braze_data = `${folderPath}/data`
  // const braze_data = `${folderPath}/test`

  const braze_csv = `${folderPath}/braze.csv`
  console.log(braze_res)
  // console.log(braze_data_zip_path)

  log("Waiting 300 seconds to download braze nov data...")

  await sleep(300)

  log("Downloading...")

  await download(braze_url, braze_data_zip_path)

  log("Download Complete")

  log("Decompressing...")

  await decompress(braze_data_zip_path, braze_data)

  log("Decompress Complete")

  log("Transforming...")
  
  //remake this function to get not only ids but everything else
  await brazeDataToCsv(braze_data, braze_csv)

  log("Transformation Complete")

 

}



main(['external_id'],['delete'],DEV_ALL_USERS_SEGMENT_ID)


