const { pool, insert } = require('./postgresDbConfig');


// POOL.END WHEN DONE WITH QUERIES
// ENSURE RETURNED DATA FOR ONLY THAT USERID ONLY IF ADMIN RETURN ANY
class Data {

  // FOR ADMIN
  async fetchAllMessages() {
    const result = { boolean: false, message: 'unable to fetch messages' };
    try {
      let messages = await pool.query('SELECT * FROM devices_messages');
      messages = messages.rows;
      if (messages.length < 1) { pool.end; result.message = 'no messages found'; return result; }
      result.boolean = true; result.message = messages;
    } catch (e) { }
    pool.end;
    return result;
  };

  // FOR USERS
  async fetchAllMessagesByUserIdAndDeviceUid(user_id, device_id) {
    const result = { boolean: false, message: 'unable to fetch messages' };
    try {
      let messages = await pool.query(`SELECT * FROM devices_messages WHERE user_id=$1 AND device_unique_id=$2`, [user_id, device_id]);
      messages = messages.rows;
      if (messages.length < 1) { pool.end; result.message = 'no messages found'; return result; }
      result.boolean = true; result.message = JSON.stringify(messages);
    } catch (e) { }
    pool.end;
    return result;
  };

  // DELETE RETURN DELETED ID
  async deleteMessagesByUserIdAndId(user_id, id) {
    const result = { boolean: false, message: 'unable to delete message' };
    try {
      let deleteResult = await pool.query(`DELETE FROM devices_messages WHERE id=$1 AND user_id=$2 RETURNING *`, [id, user_id]);
      deleteResult = deleteResult.rows;
      if (deleteResult[0]) { result.boolean = true; result.message = JSON.stringify({ id: deleteResult[0].id }); }
    } catch (e) { }
    pool.end;
    return result;
  };

  // CHECK IF USERNAME OR EMAIL IS AREADY REGISTERD RETURN BOOLEAN AND MESSAGE
  // RETURN MESSAGE_ID THAT WILL DELETE FROM THEN DEVICE LOGED MESSAGE AFTER ITS SAVED
  async insertMessage(user_id_in, message_in) {
    const result = { boolean: false, message: 'unable to add messages' };
    const messageObj = {
      message_id: message_in.message_id,
      address: message_in.address,
      type: message_in.type,
      date: message_in.date,
      message: message_in.message,
      read_status: message_in.read_status,
      thread_id: message_in.thread_id,
      contact: message_in.contact,
      uniquein: message_in.device_unique_id + message_in.date,
      device_unique_id: message_in.device_unique_id,
      user_id: user_id_in
    };
    const insertResult = await insert('devices_messages', messageObj);
    if (insertResult) { result.boolean = true; result.message = JSON.stringify({ message_id: insertResult[0].id }); }
    pool.end;
    return result;
  };
}

module.exports = Data;
