const { Model } = require("../helpers/user");
const { resumptionTime } = require("../helpers/database");

module.exports = {
  getUser(req, res) {
    const id = req.params.id;
    const user = Model.findUserById(id);
    res.json(user);
  },

  getAllUsers(req, res) {
    return res.json(Model.allUsers());
  },

  logUserIn(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
      return res.sendStatus(400);
    }

    const user = Model.findUser(email, password);

    if (user) {
      let resumption = new Date();
      resumption.setHours(resumptionTime);
      resumption.setMinutes(0);
      resumption.setMilliseconds(0);

      let login = new Date();
      let minutes = login.getHours() * 60 + login.getMinutes();
      let resumptionMinutes = resumption.getHours() * 60 + resumption.getMinutes();

      let lateTime
      const isLate = minutes > resumptionMinutes
      if (isLate) {
        //  Convert to minutes
        lateTime = minutes - resumptionMinutes

      }
      user.login.push({ time: login, isLate, lateTime });
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
    if (Model.findUser(email, password)) {
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
        login: [],
      };
      if (email.includes("@admin.demo")) {
        data.admin = true;
      } else {
        data.admin = false;
      }
      const user = Model.saveUser(data);
      return res.json(user);
    } catch (err) {
      res.json(err);
    }
  },
};
