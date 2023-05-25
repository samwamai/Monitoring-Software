const { pool, insert } = require('./postgresDbConfig');


// POOL.END WHEN DONE WITH QUERIES
// ENSURE RETURNED DATA FOR ONLY THAT USERID ONLY IF ADMIN RETURN ANY
class Data {

  // FOR ADMIN
  async fetchAllContacts() {
    const result = { boolean: false, message: 'unable to fetch contacts' };
    try {
      let contacts = await pool.query('SELECT * FROM devices_contacts');
      contacts = contacts.rows;
      if (contacts.length < 1) { pool.end; result.contacts = 'no contacts found'; return result; }
      result.boolean = true; result.message = contacts;
    } catch (e) { }
    pool.end;
    return result;
  };

  // FOR USERS
  async fetchAllContactsByUserIdAndDeviceUid(user_id, device_id) {
    const result = { boolean: false, message: 'unable to fetch contacts' };
    try {
      let contacts = await pool.query(`SELECT * FROM devices_contacts WHERE user_id=$1 AND device_unique_id=$2`, [user_id, device_id]);
      contacts = contacts.rows;
      if (contacts.length < 1) { pool.end; result.message = 'no contacts found'; return result; }
      result.boolean = true; result.message = JSON.stringify(contacts);
    } catch (e) { }
    pool.end;
    return result;
  };

  // DELETE RETURN DELETED ID
  async deleteContactsByUserIdAndId(user_id, id) {
    const result = { boolean: false, message: 'unable to delete contacts' };
    try {
      let deleteResult = await pool.query(`DELETE FROM devices_contacts WHERE id=$1 AND user_id=$2 RETURNING *`, [id, user_id]);
      deleteResult = deleteResult.rows;
      if (deleteResult[0]) { result.boolean = true; result.message = JSON.stringify({ id: deleteResult[0].id }); }
    } catch (e) { }
    pool.end;
    return result;
  };

  // CHECK IF USERNAME OR EMAIL IS AREADY REGISTERD RETURN BOOLEAN AND MESSAGE
  // RETURN ADDRESS THAT WILL DELETE FROM THEN DEVICE LOGED CONTACT AFTER ITS SAVED
  async insertContacts(user_id_in, contact_in) {
    const result = { boolean: false, message: 'unable to add contacts' };
    const contactObj = {
      contact_id: contact_in.contact_id,
      contact: contact_in.contact,
      address: contact_in.address,
      photo: contact_in.photo,
      email: contact_in.email,
      last_contacted: contact_in.last_contacted,
      times_contacted: contact_in.times_contacted,
      uniquein: contact_in.device_unique_id + contact_in.contact,
      device_unique_id: contact_in.device_unique_id,
      user_id: user_id_in
    };
    const insertResult = await insert('devices_contacts', contactObj);
    if (insertResult) { result.boolean = true; result.message = JSON.stringify({ contact_id: insertResult[0].contact_id }); }
    pool.end;
    return result;
  };
}

module.exports = Data;
