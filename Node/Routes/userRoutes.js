import Express from "express";
import { saveUser, getUserByEmail } from "../Database/MongoApi.js";
import user from "../Model/user.js";
const router = Express.Router();

let currentUser = new user();

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

export default router;
