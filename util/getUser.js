module.exports = async (segment_id, fields_to_export) => {
  const payload = {
    segment_id,
    fields_to_export,
    output_format: "zip"
  }
  const data = await doRequest(payload,'/users/export/segment', false);
  console.log(data)
}