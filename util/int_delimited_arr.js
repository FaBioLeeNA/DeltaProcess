module.exports = (limit, source) => {
  const arrs = Array.from({
    length: Math.ceil((source.length / limit))
  }).fill(null).map(item => [])

  for (let i = 0; i < source.length; i++) {
    const bucket_index = Math.floor(i / limit)
    const inner_bucket = arrs[bucket_index]
    inner_bucket.push(source[i])
  }

  return arrs
}