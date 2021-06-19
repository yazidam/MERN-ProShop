const bcrypt = require('bcryptjs');
const users = [
  {
    name: 'Ahmedyazid User',
    email: 'ahmedyazid@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: 'true',
  },
  {
    name: 'Ali User',
    email: 'ahmed@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: ' Yazid User',
    email: 'yazid@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
];
module.exports = users;
