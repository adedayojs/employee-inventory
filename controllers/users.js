const storage = [
  {
    firstName: "Adedayo",
    lastName: "Adedunye",
    userName: "samfeolu",
    password: "1234",
    email: "samfeolu@gmail.com",
    id: 1,
    login: [{ time: "" }],
  },
];

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

    const user = storage.find((user) => user.email === email && user.password === password);

    if (user) {
      user.login.push({ time: new Date() });
      return res.json(user);
    } else {
      return res.sendStatus(401);
    }
  },

  signUserUp(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastname = req.body.lastname;
    const userName = req.body.userName;

    if (!email || !password || !firstName || !lastname || !userName) {
      res.sendStatus(400);
      return;
    }
    try {
      const data = {
        email,
        password,
        userName,
        lastName,
        firstName,
        id: storage.length,
        login: [],
      };

      storage.push(data);

      return res.json(data);
    } catch (err) {
      res.json(err);
    }
  },
};
