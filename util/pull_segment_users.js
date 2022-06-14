const doRequest = require("./doRequest");
const anon_segment_id = '2978d5cd-4819-4364-af28-bfa869e6cfc0'
const anon_payload = ['external_id', 'phone'];

const last_sale_primary_ins_used_segment_id = '93f6175a-5a07-4e5c-b1cf-6272139c07c0'
const last_sale_payload = ['external_id'];

const all_users = '9174d980-862c-402e-bdb3-14f58d63d8bc'
const all_users_payload = ['external_id'];

const sms_optout = 'b4b3768c-77c4-4764-b41d-f4ecc29ac5cf'
const sms_optout_payload = ['external_id']

module.exports = async (segment_id, fields_to_export) => {
  const payload = {
    segment_id,
    fields_to_export,
    output_format: "zip"
  }
  const data = await doRequest(payload,'/users/export/segment', false);
  return data
}

const a7_3 = 'a68599f1-8d36-4491-9b96-82db0c8da95d'
const led = 'c23ac411-9dca-4073-89cf-0b05536d979b'