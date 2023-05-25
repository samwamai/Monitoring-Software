const { pool, insert } = require('./postgresDbConfig');


// POOL.END WHEN DONE WITH QUERIES
// ENSURE RETURNED DATA FOR ONLY THAT USERID ONLY IF ADMIN RETURN ANY
class Data {

  // FOR ADMIN
  async fetchAllCalllogs() {
    const result = { boolean: false, message: 'unable to fetch calllogs' };
    try {
      let calllogs = await pool.query('SELECT * FROM devices_call_logs');
      calllogs = calllogs.rows;
      if (calllogs.length < 1) { pool.end; result.calllogs = 'no calllogs found'; return result; }
      result.boolean = true; result.message = JSON.stringify(calllogs);
    } catch (e) { }
    pool.end;
    return result;
  };

  // FOR USERS
  async fetchAllCallRecordingsByUserIdAndDeviceUid(user_id, device_id) {
    const result = { boolean: false, message: 'unable to fetch callrecodings' };
    try {
      let callrecordings = await pool.query(`SELECT * FROM devices_call_recordings WHERE user_id=$1 AND device_unique_id=$2`, [user_id, device_id]);
      callrecordings = callrecordings.rows;
      if (callrecordings.length < 1) { pool.end; result.message = 'no callrecodings found'; return result; }
      result.boolean = true; result.message = JSON.stringify(callrecordings);
    } catch (e) { }
    pool.end;
    return result;
  };

  // DELETE RETURN DELETED ID
  async deleteCallRecordingsByUserIdAndId(user_id, id) {
    const result = { boolean: false, message: 'unable to delete calllogs' };
    try {
      let deleteResult = await pool.query(`DELETE FROM devices_call_recordings WHERE id=$1 AND user_id=$2 RETURNING *`, [id, user_id]);
      deleteResult = deleteResult.rows;
      if (deleteResult[0]) { result.boolean = true; result.message = JSON.stringify({ id: deleteResult[0].id }); }
    } catch (e) { }
    pool.end;
    return result;
  };

  // CHECK IF USERNAME OR EMAIL IS AREADY REGISTERD RETURN BOOLEAN AND MESSAGE
  // RETURN ADDRESS THAT WILL DELETE FROM THEN DEVICE LOGED CONTACT AFTER ITS SAVED
  async insertCallrecordings(user_id_in, calrecording_in) {
    const result = { boolean: false, message: 'unable to add call recording' };
    const callrecordingObj = {
      callrecording_id: calrecording_in.callrecording_id,
      contact: calrecording_in.contact,
      address: calrecording_in.address,
      type: calrecording_in.type,
      date: calrecording_in.date,
      duration: calrecording_in.duration,
      record_file: calrecording_in.record_file,
      uniquein: calrecording_in.device_unique_id + calrecording_in.date,
      device_unique_id: calrecording_in.device_unique_id,
      user_id: user_id_in
    };
    const insertResult = await insert('devices_call_recordings', callrecordingObj);
    if (insertResult) { result.boolean = true; result.message = JSON.stringify({ callrecording_id: insertResult[0].callrecording_id }); }
    pool.end;
    return result;
  };
}

module.exports = Data;
