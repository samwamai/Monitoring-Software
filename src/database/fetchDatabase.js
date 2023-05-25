const Users = require('../models/Users');
const crypto = require('crypto');
const { setGetToken } = require('../middleware/auth');
const { pool, insert, createTables } = require('./postgresDbConfig');
const url = 'http://localhost:5000';


// POOL.END WHEN DONE WITH QUERIES
class Data {

  async fetchUsers() {
    createTables();
    const result = { boolean: false, message: '' };
    let users = await pool.query('SELECT * FROM users');
    users = users.rows;
    if (users.length < 1) { pool.end; result.message = 'no users found'; return result; }
    result.boolean = true; result.message = users;
    pool.end;
    return result;
  };

  async fetchUserByUsername(username) {
    const res = await fetch(`${url}/users?username=${username}`);
    const data = await res.json();
    return data[0];
  };

  async fetchUserByUsernameOrEmail(username, email) {
    let res = await fetch(`${url}/users?username=${username}`);
    let data = await res.json();
    if (!data[0]) {
      res = await fetch(`${url}/users?email=${email}`);
      data = await res.json();
    }
    return data[0];
  };

  // LOGIN FUCTION
  async loginUser(username, password) {
    const result = { boolean: false, message: 'unable to login' };
    let userByUsername = await pool.query('SELECT * FROM users WHERE username=$1', [username]);
    userByUsername = userByUsername.rows[0];
    if (!userByUsername) { pool.end; result.message = 'username not found'; return result; }
    const dbPass = userByUsername.password;
    if (!passwordHashCompare(dbPass, password)) { pool.end; result.message = 'password incorrect'; return result; }
    await pool.query('UPDATE users SET last_seen =$2 WHERE username=$1', [username, new Date().toISOString()]);
    const token = setGetToken({ user_id: userByUsername.user_id, username: userByUsername.username });
    const user = {
      token: token,
      user: {
        username: userByUsername.username,
        email: userByUsername.email,
        approval: userByUsername.approval,
        created_on: userByUsername.created_on,
        last_seen: userByUsername.last_seen
      }
    };
    result.boolean = true; result.message = user;
    pool.end;
    return result;
  };

  // CHECK IF USERNAME OR EMAIL IS AREADY REGISTERD RETURN BOOLEAN AND MESSAGE
  async createUser(username, email, password) {
    const result = { boolean: false, message: 'unable to register' };
    const userByUsername = await pool.query('SELECT * FROM users WHERE username=$1', [username]);
    if (userByUsername.rows[0]) { pool.end; result.message = 'username registerd'; return result; }
    const userByEmail = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
    if (userByEmail.rows[0]) { pool.end; result.message = 'email registerd'; return result; }
    const passwordHash = crypto.createHash('sha256').update(password).digest('hex');
    const user = {
      username: username,
      email: email,
      password: passwordHash,
      approval: false,
      created_on: new Date().toISOString(),
      last_seen: new Date().toISOString()
    };
    const insertResult = await insert('users', user);
    if (insertResult) { result.boolean = true; result.message = 'succefuly registerd'; }
    pool.end;
    return result;
  };

  //UPDATE USER
  async updateUser(user_id, username, email, password) {
    const result = { boolean: false, message: 'unable to updte user' };
    const newPasswordHash = crypto.createHash('sha256').update(new_password).digest('hex');

    const userByUsername = await pool.query('SELECT * FROM users WHERE username=$1', [username]);
    if (userByUsername.rows[0]) { pool.end; result.message = 'username registerd'; return result; }
    const userByEmail = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
    if (userByEmail.rows[0]) { pool.end; result.message = 'email registerd'; return result; }
    const passwordHash = crypto.createHash('sha256').update(password).digest('hex');
    const user = {
      username: username,
      email: email,
      password: passwordHash,
      approval: false,
      created_on: new Date().toISOString(),
      last_seen: new Date().toISOString()
    };
    const insertResult = await insert('users', user);
    if (insertResult) { result.boolean = true; result.message = 'succefuly registerd'; }
    pool.end;
    return result;
  };

  //UPDATE USER
  async updatePassword(user_id, old_password, new_password) {
    const result = { boolean: false, message: 'Unable to update password' };
    let user = await pool.query('SELECT * FROM users WHERE user_id=$1', [user_id]);
    user = user.rows[0];
    if (!passwordHashCompare(user.password, old_password)) {
      result.boolean = false;
      result.message = 'Current password is incorrect';
      return result;
    }
    const newPasswordHash = crypto.createHash('sha256').update(new_password).digest('hex');
    await pool.query('UPDATE users SET password =$2 WHERE user_id=$1', [user_id, newPasswordHash]);
    result.boolean = true;
    result.message = 'Password updated';
    pool.end;
    return result;
  };

  async updateEmail(user_id, email, password) {
    const result = { boolean: false, message: 'Unable to update password' };
    let user = await pool.query('SELECT * FROM users WHERE user_id=$1', [user_id]);
    user = user.rows[0];
    if (!passwordHashCompare(user.password, password)) {
      result.boolean = false;
      result.message = 'Password is incorrect';
      return result;
    }
    const findEmail = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
    if (findEmail.rows[0]) {
      result.boolean = false;
      result.message = 'Email already registerd';
      return result;
    }
    let res = await pool.query('UPDATE users SET email =$2 WHERE user_id=$1 RETURNING *', [user_id, email]);
    res = res.rows[0];
    const updatedUser = {
      username: res.username,
      email: res.email,
      approval: res.approval,
      created_on: res.created_on,
      last_seen: res.last_seen
    }
    result.boolean = true;
    result.message = updatedUser;
    pool.end;
    return result;
  };

  async updateUsername(user_id, username, password) {
    const result = { boolean: false, message: 'Unable to update password' };
    let user = await pool.query('SELECT * FROM users WHERE user_id=$1', [user_id]);
    user = user.rows[0];
    if (!passwordHashCompare(user.password, password)) {
      result.boolean = false;
      result.message = 'Password is incorrect';
      return result;
    }
    const findUsername = await pool.query('SELECT * FROM users WHERE username=$1', [username]);
    if (findUsername.rows[0]) {
      result.boolean = false;
      result.message = 'Username already registerd';
      return result;
    }
    let res = await pool.query('UPDATE users SET username =$2 WHERE user_id=$1 RETURNING *', [user_id, username]);
    res = res.rows[0];
    const updatedUser = {
      username: res.username,
      email: res.email,
      approval: res.approval,
      created_on: res.created_on,
      last_seen: res.last_seen
    }
    result.boolean = true;
    result.message = updatedUser;
    pool.end;
    return result;
  };


}
// COMPARE PASSWORD HARSH
const passwordHashCompare = function (dbPassHash, inPass) {
  return (crypto.createHash('sha256').update(inPass).digest('hex') === dbPassHash);
};
module.exports = Data;
