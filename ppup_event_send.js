const int_delimited_arr = require('./util/int_delimited_arr')
const doRequest = require('./util/doRequest')
const getMD = require('./util/getMD')
const { log } = console
const fs = require('fs').promises
const sleep = require('./util/sleep')

const main = async () => {
  
  const MD = getMD();
  const result_PP_csv = `./pp/Result/pp_delta_${MD}.csv`

  const str = await fs.readFile(result_PP_csv, {encoding: 'utf8'});
  const arr = str.split('\n').map(record => {
    const arr = record.split(',')
    return {
      external_id: arr[0],
      name: arr[1],
      time: new Date,
      properties: {
        source: "manual"
      }
    }  
  });


  const bucket = int_delimited_arr(75, arr)
  const bucket_of_bucket = int_delimited_arr(500, bucket)

  for(const [index, buckets] of bucket_of_bucket.entries()) {
    const req = buckets.map(payload => {
      return doRequest({
        events: payload
      }, '/users/track', false)
    })
    const data = await Promise.all(req)

    await fs.writeFile(`pp/log/log_${MD}_${index}.txt`, JSON.stringify(data), 'utf-8')

    await sleep(3)
  }
}

main()