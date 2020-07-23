//Database
const storage = require("./database");
module.exports = {
  //  Helper Function
  findUser(email, password) {
    return storage.find((user) => user.email === email && user.password === password);
  },
};
