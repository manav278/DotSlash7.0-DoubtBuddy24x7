import Express, { response } from "express";
import {
  saveUser,
  getUserByEmail,
  setStatus,
  selectUser,
  // getMeetLink,
  // setLink,
} from "../Database/MongoApi.js";
import user from "../Model/user.js";
import {getNLPParam} from "./nlpParam.js"
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
  // console.log("1");
  const result = await setStatus(req.params.status, currentUser);
  // console.log("2");
  if (result == null) {
    res.status(400).json({ msg: "Some Error is Their...Please try later..." });
  } else {
    // console.log("3");
    // let r = await getMeetLink();
    // console.log("4");
    res.status(200).json({ link: "" });
  }
});

//gets the profile information of the loggedin user
router.get("/info", async (req, res) => {
  res.status(200).json(currentUser);
});

//review
router.post("/rating", async (req, res) => {
  let review = req.body;
  // param1=Satisfactory level of doubt solver - 20%
  let param1 = review["param1"];
  param1 = Number(param1);
  // param2=Knowledge Level and Expertise - 20%
  let param2 = review["param2"];
  param2 = Number(param2);
  // param3=Interest shown by doubt solver to solve problem - 10%
  let param3 = review["param3"];
  param3 = Number(param3);
  // param4=Debugging Skills - 10%
  let param4 = review["param4"];
  param4 = Number(param4);
  // param5=Communication Skills - 10%
  let param5 = review["param5"];
  param5 = Number(param5);
  //************************************
  
  let nlpResponse = await getNLPParam(review["review"]);
  let nlpTemp = nlpResponse["reviews"];
  let nlpCount;//30%
  if (nlpTemp == "Positive") {
    nlpCount = 2
  }
  else if (nlpTemp == "Negative") {
    nlpCount = -2
  }
  else if (nlpTemp == "Neutral") {
    nlpCount = 0;
  }
  //************************************
  let threshold = (0.2 * param1) + (0.2 * param2) + (0.1 * param3) + (0.1 * param4) + (0.1 * param5) + (0.3 * nlpCount);
  threshold = threshold * 10;


  if (threshold == null) {
    res.status(400).json({
      error: "Threshold Problem or some network error is their...",
    });
  } else {
    selectedUser.addReview(review['review']);
    selectedUser.setHighestRatingAndGrowthRate(selectedUser["rating"] + threshold);
    const x = await selectedUser.save();
    return res.status(200).json(selectedUser);
  }
});

router.get("/match/:techstack", async (req, res) => {
  // console.log("a");
  const techstack = req.params.techstack.split(",");
  const result = await selectUser(techstack, currentUser);
  
  if (result == null) {
    res.status(400).json({
      error: "Users are not present or some network error is their...",
    });
  } else {
    selectedUser = result;
    return res.status(200).json(result);
  }
});

router.post("/videoCall", (req, res) => {
  const link = req.body.meetlink;
  const buddy = req.body.buddy;
  // console.log(link);
  // console.log(buddy);
  meetlink = link;
  username = buddy;
});
let meetlink = "";
let username = "";
router.post("/videoCall/error-solver", (req, res) => {
  console.log("Hello");
  const name = req.body.email;
  console.log(name);
  console.log(username);
  console.log(meetlink);
  // console.log(name);
  if(username && meetlink && name == username )
  {
    return res.status(200).json(meetlink);
  }
  return res.status(200).json("wait");
});



export default router;
