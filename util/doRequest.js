const fetch = require('node-fetch')

module.exports = (payload, url, test_env = false) => fetch(`https://rest.iad-02.braze.com${url}`, {
  method: 'POST',
  body: JSON.stringify(payload),
  headers: {
    'Content-Type': 'application/json',
    app_id: test_env ? 'dfb81621-dffc-4a6a-8b36-99c163608fb1' : '5469bd96-7638-4fa2-be7a-56f79a5a1031',
    Authorization: `Bearer ${test_env ? '1b433754-02c1-46ab-aec0-2fd0447da479' : 'bbd2b5aa-c185-459b-941d-358ab4034453'}`
  }
}).then(res => res.json()).catch(err => {
  console.log(err)
  return err
})

