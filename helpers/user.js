//Database
const {users} = require("./database");
module.exports = {
  //  Helper Function
  Model: {
    findUser(email, password) {
      return users.find((user) => user.email === email && user.password === password);
    },
    findUserById(id) {
      return users.find((user) => user.id === Number(id));
    },
    saveUser(data) {
      // assign id
      data.id = users.length + 1;

      users.push(data);

      return data;
    },
    allUsers() {
      return users;
    },
  },
};
