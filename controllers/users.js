const { findUser } = require("../helpers/user");

module.exports = {
  getUser(req, res) {
    const id = req.params.id;
    const user = storage.find((user) => user.id === Number(id));
    res.json(user);
  },

  getAllUsers(req, res) {
    return res.json(storage);
  },

  logUserIn(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
      return res.sendStatus(400);
    }

    const user = findUser(email, password);

    if (user) {
      user.login.push({ time: new Date() });
      return res.json(user);
    } else {
      return res.status(401).json({ message: "Wrong Login Details" });
    }
  },

  signUserUp(req, res) {
    //  Get User details
    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const userName = req.body.userName;

    //  Validate data
    if (!email || !password || !firstName || !lastName || !userName) {
      res.sendStatus(400);
      return;
    }

    //  Ensure no duplicates
    if (findUser(email, password)) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    //  Save Data
    try {
      const data = {
        email,
        password,
        userName,
        lastName,
        firstName,
        id: storage.length + 1,
        login: [],
      };

      storage.push(data);
      return res.json(data);
    } catch (err) {
      res.json(err);
    }
  },
};
