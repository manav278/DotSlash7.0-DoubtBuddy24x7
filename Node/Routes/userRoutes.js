import Express from "express";
import {
  saveUser,
  getUserByEmail,
  setStatus,
  selectUser,
  getMeetLink,
  setLink,
} from "../Database/MongoApi.js";
import user from "../Model/user.js";
const router = Express.Router();
//current loged in user
let currentUser = new user();

//user selected according to our algorithm for solving the doubt of the current user
let selectedUser = new user();

//route for login/signup of the user
router.post("/login", async (req, res) => {
  let result = await getUserByEmail(req.body.email);
  if (result == null) {
    result = await saveUser(req.body);
    if (result == null) {
      res
        .status(400)
        .json({ error: "Some Error is Their...Please try later..." });
    } else {
      currentUser = result;
      res.status(200).json(result);
    }
  } else {
    currentUser = result;

    res.status(200).json(result);
  }
});

//route for setting up the status of the user on the website
router.get("/status/:status", async (req, res) => {
  const result = await setStatus(req.params.status, currentUser);
  if (result == null) {
    res.status(400).json({ msg: "Some Error is Their...Please try later..." });
  } else {
    let r = await getMeetLink();
    res.status(200).json({ link: r });
  }
});

//gets the profile information of the loggedin user
router.get("/info", async (req, res) => {
  res.status(200).json(currentUser);
});

router.get("/match/:techstack", async (req, res) => {
  const techstack = req.params.techstack.split(",");
  const result = await selectUser(techstack, currentUser);

  if (result == null) {
    res.status(400).json({
      error:
        "Users are not present(he/she will be notified) or some network error is their...",
    });
  } else {
    selectedUser = result;
    return res.status(200).json(result);
  }
});

router.post("/videoCall", (req, res) => {
  setLink(req.body.link);
});
export default router;
