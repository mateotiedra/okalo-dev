const sql = require('./db.js');

// constructor
const User = function (user) {
  this.email = user.email;
  this.password = user.password;
  this.fullname = user.fullname;
  this.username = user.username;
  this.phone = user.phone;
  this.school = user.school;
};

User.create = (newUser, result) => {
  sql.query('INSERT INTO users SET ?', newUser, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    newUser.password = undefined;
    console.log('created user: ', { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

User.findBy = (attributName, userValue, next) => {
  sql.query(
    `SELECT * FROM users WHERE ${attributName} = ?`,
    userValue,
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        next(err, null);
        return;
      }

      if (res.length) {
        next(null, res[0]);
        return;
      }

      // not found user with the id
      next({ kind: 'not_found' }, null);
    }
  );
};

User.findByUsername = (userName, result) => {
  sql.query(`SELECT * FROM users WHERE username = ${userName}`, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    if (res.length) {
      //console.log('found user: ', res[0]);
      result(null, res[0]);
      return;
    }

    // not found user with the id
    result({ kind: 'not_found' }, null);
  });
};

User.getAll = (result) => {
  sql.query('SELECT * FROM users', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log('users: ', res);
    result(null, res);
  });
};

User.updateById = (id, user, result) => {
  sql.query(
    'UPDATE users SET email = ?, name = ?, active = ? WHERE id = ?',
    [user.email, user.name, user.active, id],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found user with the id
        result({ kind: 'not_found' }, null);
        return;
      }

      console.log('updated user: ', { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};

User.remove = (id, result) => {
  sql.query('DELETE FROM users WHERE id = ?', id, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found user with the id
      result({ kind: 'not_found' }, null);
      return;
    }

    console.log('deleted user with id: ', id);
    result(null, res);
  });
};

User.removeAll = (result) => {
  sql.query('DELETE FROM users', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} users`);
    result(null, res);
  });
};

module.exports = User;
