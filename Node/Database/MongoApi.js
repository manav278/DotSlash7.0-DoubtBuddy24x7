import user from "../Model/user.js";

//saves user in the mongodb
async function saveUser(data) {
  const u = new user(data);
  try {
    let result = await u.save();
    return result;
  } catch (error) {
    return null;
  }
}

//finds the user in the mongodb via email
async function getUserByEmail(e) {
  try {
    let result = await user.find({ email: e });
    return result[0];
  } catch (error) {
    return null;
  }
}

//sets the online status of the current staus
async function setOnlineStatus(status, currentUser) {
  currentUser.setOnlineStatus(status == "true" ? true : false);
  const result = await currentUser.save();
  return result;
}

export { saveUser, getUserByEmail, setOnlineStatus };
