require('dotenv').config()
const download = require('./util/download')
const path = require('path')
const pull = require('./util/pull_segment_users')
const sleep = require('./util/sleep')
const decompress = require('decompress')
const brazeDataToCsv = require('./util/brazeDataToCsvLarge')
const sort = require('./util/sort')
const { SUPP_SEGMENT_ID,ALL_USERS_SEGMENT_ID,ATTRIBUTES,CUSTOM_ATTRIBUTES } = process.env
const getDelta = require('./functions/getDelta')
const getMD = require('./util/getMD')
const buildDir = require('./util/buildDir')



const MD = getMD()


const {log} = console

const main = async (payload, folders, segmentId) => {

  const folderPath = buildDir(MD,folders,'extra')
  
  const braze_res = await pull(segmentId, payload)
  const braze_url = braze_res.url
  // const braze_url = 'https://appboy-02-data-export.s3.amazonaws.com/nQoLsoAkAqlMvcXLzlARjkwR42JpcuGwvsDv_4PPD_I.zip'
  
  const braze_data_zip_path = `${folderPath}/braze_data.zip`
  // const braze_data = `${folderPath}/data`
  const braze_data = `${folderPath}/data`

  const braze_csv = `${folderPath}/braze.csv`
  // console.log(braze_res)
  log("Waiting 800 seconds to download braze nov data...")

  await sleep(800)

  log("Downloading...")

  await download(braze_url, braze_data_zip_path)

  log("Download Complete")

  log("Decompressing...")

  await decompress(braze_data_zip_path, braze_data)

  log("Decompress Complete")

  log("Transforming...")

  const attributes = ATTRIBUTES.split(',')
  const custom_attributes = CUSTOM_ATTRIBUTES.split(',')
  
  //remake this function to get not only ids but everything else
  await brazeDataToCsv(braze_data, attributes, custom_attributes, braze_csv)

  log("Transformation Complete")

 

}


main(ATTRIBUTES.split(',').concat('custom_attributes'),['all users'],ALL_USERS_SEGMENT_ID)


