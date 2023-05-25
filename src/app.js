const express = require('express');
const cors = require('cors');
const db = require('./database/fetchDatabase');
const messagedb = require('./database/fetchMessagesDatabase');
const contactdb = require('./database/fetchContactsDatabase');
const calllogdb = require('./database/fetchCalllogsDatabase');
const callrecordingdb = require('./database/fetchCallrecordingDatabase');
const devicedb = require('./database/fetchDevicesDatabase');
const { verifyToken } = require('./middleware/auth');
const app = express();
app.use(express.json());
app.use(cors());

const RESSTATUS = {
  SUCCESS: 200,
  FAIL: 400,
  ERROR: 500,
  BAD_REQUEST: 400,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
}

app.get('/', (_req, res) => {
  res.status(RESSTATUS.SUCCESS);
  res.send('LAND PAGE');
});

app.get('/get-users', async (_req, res) => {
  const { boolean, message } = await new db().fetchUsers();
  if (!boolean) {
    res.status(RESSTATUS.FAIL).send(message);
    return;
  }
  res.status(RESSTATUS.SUCCESS).send(message);
});

app.get('/home', verifyToken, (req, res) => {
  res.status(RESSTATUS.SUCCESS);
  res.send(req.user);
});

app.get('/users/id/:id', async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(RESSTATUS.BAD_REQUEST).send("id required");
    return;
  }
  const data = await new db().fetchUser(id);
  res.status(RESSTATUS.SUCCESS).send(data);
});


// MESSAGES
// INSERT AUTHENTICATED USERS
// USER_ID IS OBTAINED FROM TOKEN FROM AUTH REQ.USER.ID
app.get('/messages/deviceid/:id', verifyToken, async (req, res) => {
  const user_id = req.user.user_id;
  const { id } = req.params;
  if (!id) {
    res.status(RESSTATUS.BAD_REQUEST).send("id required");
    return;
  }
  const { boolean, message } = await new messagedb().fetchAllMessagesByUserIdAndDeviceUid(user_id, id);
  if (!boolean) {
    res.status(RESSTATUS.FAIL).send(message);
    return;
  }
  res.status(RESSTATUS.SUCCESS).send(message);
});
app.delete('/messages', verifyToken, async (req, res) => {
  const user_id = req.user.user_id;
  const { id } = req.body;
  if (!id) {
    res.status(RESSTATUS.BAD_REQUEST).send("id is required");
    return;
  }
  const { boolean, message } = await new messagedb().deleteMessagesByUserIdAndId(user_id, id);
  if (!boolean) {
    res.status(RESSTATUS.FAIL).send(message);
    return;
  }
  res.status(RESSTATUS.SUCCESS).send(message);
});
app.post('/messages', verifyToken, async (req, res) => {
  const user_id = req.user.user_id;
  const message_in = req.body;
  if (!message_in) {
    res.status(RESSTATUS.BAD_REQUEST).send("input is required");
    return;
  }
  const { boolean, message } = await new messagedb().insertMessage(user_id, message_in);
  if (!boolean) {
    res.status(RESSTATUS.FAIL).send(message);
    return;
  }
  res.status(RESSTATUS.CREATED).send(message);
});


// CONTACTS
// INSERT AUTHENTICATED USERS
// USER_ID IS OBTAINED FROM TOKEN FROM AUTH REQ.USER.ID
app.get('/contacts/deviceid/:id', verifyToken, async (req, res) => {
  const user_id = req.user.user_id;
  const { id } = req.params;
  if (!id) {
    res.status(RESSTATUS.BAD_REQUEST).send("id required");
    return;
  }
  const { boolean, message } = await new contactdb().fetchAllContactsByUserIdAndDeviceUid(user_id, id);
  if (!boolean) {
    res.status(RESSTATUS.FAIL).send(message);
    return;
  }
  res.status(RESSTATUS.SUCCESS).send(message);
});
app.delete('/contacts', verifyToken, async (req, res) => {
  const user_id = req.user.user_id;
  const { id } = req.body;
  if (!id) {
    res.status(RESSTATUS.BAD_REQUEST).send("id is required");
    return;
  }
  const { boolean, message } = await new contactdb().deleteContactsByUserIdAndId(user_id, id);
  if (!boolean) {
    res.status(RESSTATUS.FAIL).send(message);
    return;
  }
  res.status(RESSTATUS.SUCCESS).send(message);
});
app.post('/contacts', verifyToken, async (req, res) => {
  const user_id = req.user.user_id;
  const contact_in = req.body;
  if (!contact_in) {
    res.status(RESSTATUS.BAD_REQUEST).send("input is required");
    return;
  }
  const { boolean, message } = await new contactdb().insertContacts(user_id, contact_in);
  if (!boolean) {
    res.status(RESSTATUS.FAIL).send(message);
    return;
  }
  res.status(RESSTATUS.CREATED).send(message);
});

// CALLLOGS
// INSERT AUTHENTICATED USERS
// USER_ID IS OBTAINED FROM TOKEN FROM AUTH REQ.USER.ID
app.get('/calllogs/deviceid/:id', verifyToken, async (req, res) => {
  const user_id = req.user.user_id;
  const { id } = req.params;
  if (!id) {
    res.status(RESSTATUS.BAD_REQUEST).send("id required");
    return;
  }
  const { boolean, message } = await new calllogdb().fetchAllCalllogsByUserIdAndDeviceUid(user_id, id);
  if (!boolean) {
    res.status(RESSTATUS.FAIL).send(message);
    return;
  }
  res.status(RESSTATUS.SUCCESS).send(message);
});
app.delete('/calllogs', verifyToken, async (req, res) => {
  const user_id = req.user.user_id;
  const { id } = req.body;
  if (!id) {
    res.status(RESSTATUS.BAD_REQUEST).send("id is required");
    return;
  }
  const { boolean, message } = await new calllogdb().deleteCalllogsByUserIdAndId(user_id, id);
  if (!boolean) {
    res.status(RESSTATUS.FAIL).send(message);
    return;
  }
  res.status(RESSTATUS.SUCCESS).send(message);
});
app.post('/calllogs', verifyToken, async (req, res) => {
  const user_id = req.user.user_id;
  const calllog_in = req.body;
  if (!calllog_in) {
    res.status(RESSTATUS.BAD_REQUEST).send("input is required");
    return;
  }
  const { boolean, message } = await new calllogdb().insertCalllogs(user_id, calllog_in);
  if (!boolean) {
    res.status(RESSTATUS.FAIL).send(message);
    return;
  }
  res.status(RESSTATUS.CREATED).send(message);
});


// CALLRECORDINGS
// INSERT AUTHENTICATED USERS
// USER_ID IS OBTAINED FROM TOKEN FROM AUTH REQ.USER.ID
app.get('/callrecordings/deviceid/:id', verifyToken, async (req, res) => {
  const user_id = req.user.user_id;
  const { id } = req.params;
  if (!id) {
    res.status(RESSTATUS.BAD_REQUEST).send("id required");
    return;
  }
  const { boolean, message } = await new callrecordingdb().fetchAllCallRecordingsByUserIdAndDeviceUid(user_id, id);
  if (!boolean) {
    res.status(RESSTATUS.FAIL).send(message);
    return;
  }
  res.status(RESSTATUS.SUCCESS).send(message);
});
app.delete('/callrecordings', verifyToken, async (req, res) => {
  const user_id = req.user.user_id;
  const { id } = req.body;
  if (!id) {
    res.status(RESSTATUS.BAD_REQUEST).send("id is required");
    return;
  }
  const { boolean, message } = await new callrecordingdb().deleteCallRecordingsByUserIdAndId(user_id, id);
  if (!boolean) {
    res.status(RESSTATUS.FAIL).send(message);
    return;
  }
  res.status(RESSTATUS.SUCCESS).send(message);
});
app.post('/callrecordings', verifyToken, async (req, res) => {
  const user_id = req.user.user_id;
  const callrecord_in = req.body;
  if (!callrecord_in) {
    res.status(RESSTATUS.BAD_REQUEST).send("input is required");
    return;
  }
  const { boolean, message } = await new callrecordingdb().insertCallrecordings(user_id, callrecord_in);
  if (!boolean) {
    res.status(RESSTATUS.FAIL).send(message);
    return;
  }
  res.status(RESSTATUS.CREATED).send(message);
});

// DEVICES
// INSERT AUTHENTICATED USERS
// USER_ID IS OBTAINED FROM TOKEN FROM AUTH REQ.USER.ID
app.get('/devices/device-info', verifyToken, async (req, res) => {
  const user_id = req.user.user_id;
  const { boolean, message } = await new devicedb().fetchAllDevicesJoinDeviceInfoByUserId(user_id);
  if (!boolean) {
    res.status(RESSTATUS.FAIL).send(message);
    return;
  }
  res.status(RESSTATUS.SUCCESS).send(message);
});
app.post('/devices', verifyToken, async (req, res) => {
  const user_id = req.user.user_id;
  const device = req.body;
  if (!device) {
    res.status(RESSTATUS.BAD_REQUEST).send("input is required");
    return;
  }
  const { boolean, message } = await new devicedb().insertDevices(user_id, device);
  if (!boolean) {
    res.status(RESSTATUS.FAIL).send(message);
    return;
  }
  res.status(RESSTATUS.CREATED).send(message);
});
app.post('/devices/device-info', verifyToken, async (req, res) => {
  const user_id = req.user.user_id;
  const device_info = req.body;
  if (!device_info) {
    res.status(RESSTATUS.BAD_REQUEST).send("input is required");
    return;
  }
  const { boolean, message } = await new devicedb().insertUpadateDevicesInfo(user_id, device_info);
  if (!boolean) {
    res.status(RESSTATUS.FAIL).send(message);
    return;
  }
  res.status(RESSTATUS.CREATED).send(message);
});


// FILES
app.get('/files/deviceid/:deviceid/file/:filename', verifyToken, (req, res) => {
  const filename = req.params.filename;
  const user_id = req.user.user_id;
  const device_id = req.params.deviceid;
  const filePath = __dirname + `/uploads/${user_id}/${device_id}/${filename}`;
  console.log(filePath)
  res.download(filePath);
});




//REGISTER
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  if (!(email && password && username)) {
    res.status(RESSTATUS.BAD_REQUEST).send("input is required");
    return;
  }
  const { boolean, message } = await new db().createUser(username, email, password);
  if (!boolean) {
    res.status(RESSTATUS.FAIL).send(message);
    return;
  }
  res.status(RESSTATUS.CREATED).send(message);
});

// Login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!(username && password)) {
    res.status(RESSTATUS.BAD_REQUEST).send("input is required");
    return;
  }
  const { boolean, message } = await new db().loginUser(username, password);
  if (!boolean) {
    res.status(RESSTATUS.FAIL).send(message);
    return;
  }
  res.status(RESSTATUS.SUCCESS).send(JSON.stringify(message));
});

// UPDATE USER LOGGED IN USER
app.put('/users/username', verifyToken,async (req, res) => {
  const user_id = req.user.user_id;
  const { username,password } = req.body;
  if (!(username && password)) {
    res.status(RESSTATUS.BAD_REQUEST).send("input is required");
    return;
  }
  const { boolean, message } = await new db().updateUsername(user_id,username,password);
  if (!boolean) {
    res.status(RESSTATUS.FAIL).send(message);
    return;
  }
  res.status(RESSTATUS.SUCCESS).send(JSON.stringify(message));
});
app.put('/users/email', verifyToken,async (req, res) => {
  const user_id = req.user.user_id;
  const { email,password } = req.body;
  if (!(email && password)) {
    res.status(RESSTATUS.BAD_REQUEST).send("input is required");
    return;
  }
  const { boolean, message } = await new db().updateEmail(user_id,email,password);
  if (!boolean) {
    res.status(RESSTATUS.FAIL).send(message);
    return;
  }
  res.status(RESSTATUS.SUCCESS).send(JSON.stringify(message));
});
app.put('/users/password', verifyToken,async (req, res) => {
  const user_id = req.user.user_id;
  const { old_password,new_password } = req.body;
  if (!(old_password && new_password)) {
    res.status(RESSTATUS.BAD_REQUEST).send("input is required");
    return;
  }
  const { boolean, message } = await new db().updatePassword(user_id,old_password,new_password);
  if (!boolean) {
    res.status(RESSTATUS.FAIL).send(message);
    return;
  }
  res.status(RESSTATUS.SUCCESS).send(JSON.stringify(message));
});
module.exports = app;
