// var https = require('https');
// var fs = require('fs');

// module.exports = (url, dest, cb) => {
//   var file = fs.createWriteStream(dest);
//   var request = https.get(url, (response) => {
//     response.pipe(file);
//     file.on('finish', () => {
//       file.close(cb);  // close() is async, call cb after close completes.
//     });
//   }).on('error', (err) => { // Handle errors
//     fs.unlink(dest); // Delete the file async. (But we don't check the result)
//     if (cb) cb(err.message);
//   });
// };

const {createWriteStream} = require('fs');
const {pipeline} = require('stream');
const {promisify} = require('util');
const fetch = require('node-fetch');

module.exports = async (url, path) => {
  const streamPipeline = promisify(pipeline);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`unexpected response ${response.statusText}`);
  }

  await streamPipeline(response.body, createWriteStream(path));
};


// const download = async (url, path) => {
//   const streamPipeline = promisify(pipeline);

//   const response = await fetch(url);

//   if (!response.ok) {
//     throw new Error(`unexpected response ${response.statusText}`);
//   }

//   await streamPipeline(response.body, createWriteStream(path));
// };

// (async () => {
//   try {
//     await download(
//       'https://appboy-02-data-export.s3.amazonaws.com/iXDRTM9PAyKl3jbbHqL8w_MvEKV76Z_iG1Ym7x7aNjE.zip',
//       '/Users/fabianyee/Desktop/Delta Process/dataFolder/3-10/braze/AR/braze_AR_data.zip');
//   } catch (err) {
//     console.error(err);
//   }
// })();
