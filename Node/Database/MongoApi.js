import user from "../Model/user.js";

async function saveUser(data) {
  const u = new user(data);
  try {
    let result = await u.save();
    return result;
  } catch (error) {
    return null;
  }
}

async function getUserByEmail(e) {
  try {
    let result = await user.find({ email: e });
    return result[0];
  } catch (error) {
    return null;
  }
}
export { saveUser, getUserByEmail };
