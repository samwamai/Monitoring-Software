const { pool, insert, update } = require('./postgresDbConfig');


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
  async fetchAllDevicesByUserId(user_id) {
    const result = { boolean: false, message: 'unable to fetch devices' };
    try {
      let devices = await pool.query(`SELECT * FROM devices WHERE user_id=$1`, [user_id]);
      devices = devices.rows;
      if (devices.length < 1) { pool.end; result.message = 'no devices found'; return result; }
      result.boolean = true; result.message = JSON.stringify(devices);
    } catch (e) { }
    pool.end;
    return result;
  };

  async fetchAllDevicesJoinDeviceInfoByUserId(user_id) {
    const result = { boolean: false, message: 'unable to fetch devices with info' };
    // try {
    let allResult = await pool.query(`SELECT * FROM devices FULL JOIN devices_info ON devices.device_unique_id = devices_info.device_unique_id WHERE devices.user_id=$1`, [user_id]);
    allResult = allResult.rows;
    if (allResult.length < 1) { pool.end; result.message = 'no devices found'; return result; }
    allResult = checkLastSeen(allResult);
    result.boolean = true; result.message = JSON.stringify(allResult);
    // }catch(e){}
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
  // GENERATE UNIQUE ID FOR DEVICE FROM SERVER SIDE ADD RETURN UNIQUE ID
  async insertDevices(user_id_in, device_in) {
    const result = { boolean: false, message: 'unable to add device' };
    const deviceObj = {
      imei: device_in.imei,
      device: device_in.device,
      bind_name: device_in.bind_name,
      bind_date: new Date().toISOString(),
      device_unique_id: device_in.imei,
      user_id: user_id_in
    };
    const insertResult = await insert('devices', deviceObj);
    if (insertResult) { result.boolean = true; result.message = JSON.stringify({ device_unique_id: insertResult[0].device_unique_id }); }
    pool.end;
    return result;
  };
  async insertUpadateDevicesInfo(user_id_in, device_info) {
    const result = { boolean: false, message: 'unable to add device info' };
    const deviceInfoObj = {
      device_charge: device_info.device_charge,
      connect_mode: device_info.connect_mode,
      last_wifi: device_info.last_wifi,
      ring_mode: device_info.ring_mode,
      manufacturer: device_info.manufacturer,
      model: device_info.model,
      root: device_info.root,
      internal_sd: device_info.internal_sd,
      external_sd: device_info.external_sd,
      phone_information: device_info.phone_information,
      network_information: device_info.network_information,
      hardware_information: device_info.hardware_information,
      sensor_information: device_info.sensor_information,
      accounts: device_info.accounts,
      last_seen: new Date().toISOString(),
      device_unique_id: device_info.device_unique_id,
      user_id: user_id_in,
    };
    try {
      let devicesinfo = await pool.query(`SELECT * FROM devices_info WHERE user_id=$1 AND device_unique_id=$2`, [user_id_in, deviceInfoObj.device_unique_id]);
      devicesinfo = devicesinfo.rows;
      if (devicesinfo.length < 1) {
        const insertResult = await insert('devices_info', deviceInfoObj);
        if (insertResult) { result.boolean = true; result.message = JSON.stringify({ device_unique_id: insertResult[0].device_unique_id }); }
        pool.end;
        return result;
      }
    } catch (e) { }
    delete deviceInfoObj.manufacturer;
    delete deviceInfoObj.model;
    delete deviceInfoObj.user_id;
    const updateResult = await update('devices_info', 'device_unique_id', deviceInfoObj.device_unique_id, deviceInfoObj);
    if (updateResult) { result.boolean = true; result.message = JSON.stringify({ device_unique_id: updateResult[0].device_unique_id }); }
    pool.end;
    return result;
  };


}

const checkLastSeen = (list) => {
  const current = new Date();
  const newList = list.map(obj => {
    const lastseen = new Date(obj.last_seen);
    const timeDiff = Math.floor((current - lastseen) / 1000);
    if (timeDiff > 20) {
      return { ...obj, connect_mode: "0" }; // Modify age value
    } else {
      return obj; // Return the object as is
    }
  });
  return newList;
}

module.exports = Data;
