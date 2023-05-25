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
  async fetchAllCalllogsByUserIdAndDeviceUid(user_id, device_id) {
    const result = { boolean: false, message: 'unable to fetch calllogs' };
    try {
      let calllogs = await pool.query(`SELECT * FROM devices_call_logs WHERE user_id=$1 AND device_unique_id=$2`, [user_id, device_id]);
      calllogs = calllogs.rows;
      if (calllogs.length < 1) { pool.end; result.message = 'no calllogs found'; return result; }
      result.boolean = true; result.message = JSON.stringify(calllogs);
    } catch (e) { }
    pool.end;
    return result;
  };

  // DELETE RETURN DELETED ID
  async deleteCalllogsByUserIdAndId(user_id, id) {
    const result = { boolean: false, message: 'unable to delete calllogs' };
    try {
      let deleteResult = await pool.query(`DELETE FROM devices_call_logs WHERE id=$1 AND user_id=$2 RETURNING *`, [id, user_id]);
      deleteResult = deleteResult.rows;
      if (deleteResult[0]) { result.boolean = true; result.message = JSON.stringify({ id: deleteResult[0].id }); }
    } catch (e) { }
    pool.end;
    return result;
  };

  // CHECK IF USERNAME OR EMAIL IS AREADY REGISTERD RETURN BOOLEAN AND MESSAGE
  // RETURN ADDRESS THAT WILL DELETE FROM THEN DEVICE LOGED CONTACT AFTER ITS SAVED
  async insertCalllogs(user_id_in, calllog_in) {
    const result = { boolean: false, message: 'unable to add calllogs' };
    const calllogObj = {
      calllog_id: calllog_in.calllog_id,
      contact: calllog_in.contact,
      address: calllog_in.address,
      type: calllog_in.type,
      date: calllog_in.date,
      duration: calllog_in.duration,
      uniquein: calllog_in.device_unique_id + calllog_in.date,
      device_unique_id: calllog_in.device_unique_id,
      user_id: user_id_in
    };
    const insertResult = await insert('devices_call_logs', calllogObj);
    if (insertResult) { result.boolean = true; result.message = JSON.stringify({ calllog_id: insertResult[0].calllog_id }); }
    pool.end;
    return result;
  };
}

module.exports = Data;
