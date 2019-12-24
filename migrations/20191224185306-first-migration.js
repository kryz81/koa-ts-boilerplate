exports.up = (db) => {
  return db.insert('users', [
    { _id: 1, name: 'Denis', role: 'admin' },
    { _id: 2, name: 'Kryz', role: 'user' },
  ]);
};

exports.down = (db) => {
  return db.dropCollection('users');
};
