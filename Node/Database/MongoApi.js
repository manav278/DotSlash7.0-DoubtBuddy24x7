import user from "../Model/user.js";
import { getPositivityRate } from "../Routes/nlpApi.js";
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
  let result = await user.find({ email: e });
  if (result.length == 0) {
    return null;
  }
  else {
    return result[0];
  }
}

//sets the online status of the current staus
async function setStatus(status, currentUser) {
  currentUser.setOnlineStatus(status == "true" ? true : false);
  const result = await currentUser.save();
  return result;
}
async function getOnlineUserByTechstack(techstack, currentUser) {
  try {
    let result = await user.find({
      //query object
      onlinestatus: true,
      technology: { $in: techstack },
      email: { $ne: currentUser.email },
    });
    return result;
  } catch (error) {
    return null;
  }
}

async function selectUser(techstack, currentUser) {
  //getting users based on onlinestatus and techstack
  const tech_users = await getOnlineUserByTechstack(techstack, currentUser);
  //console.log(tech_users);
  if (tech_users == null) {
    //no matching teachstack user is online
  } else if (tech_users.length == 1) {
    return tech_users[0];
  } else {
    //filtering users based on rating
    let rating_tech_users = tech_users.filter(function (obj) {
      if (
        obj.rating >= currentUser.rating - 100 &&
        obj.rating <= currentUser.rating + 100
      ) {
        return true;
      } else {
        return false;
      }
    });
    //console.log(rating_tech_users);
    if (rating_tech_users.length == 0) {
      //making range bigger
      rating_tech_users = tech_users.filter(function (obj) {
        if (
          obj.rating >= currentUser.rating - 200 &&
          obj.rating <= currentUser.rating + 200
        ) {
          return true;
        } else {
          return false;
        }
      });
    }
    if (rating_tech_users.length == 1) {
      return rating_tech_users[0];
    } else {
      let growthrate_rating_tech_users = [];
      //filtering users based on growth rates of the users and current user
      if (currentUser.growthrate > 0) {
        growthrate_rating_tech_users = rating_tech_users.filter((u) => {
          if (u.growthrate > 0) {
            return true;
          } else {
            return false;
          }
        });

        //maximum growth rate user will be selected from users
        let maxi;
        if (growthrate_rating_tech_users.length == 0) {
          maxi = rating_tech_users.reduce((max, curr) => {
            max.growthrate < curr.growthrate ? curr : max;
          }, rating_tech_users[0]);

          growthrate_rating_tech_users = rating_tech_users.filter((u) => {
            if (u.growthrate == maxi.growthrate) {
              return true;
            } else {
              return false;
            }
          });
        }
      } else {
        growthrate_rating_tech_users = rating_tech_users.filter((u) => {
          if (u.growthrate > 0) {
            return false;
          } else {
            return true;
          }
        });
        //minimum growth rate user will be selected from users
        let mini;
        if (growthrate_rating_tech_users.length == 0) {
          mini = rating_tech_users.reduce((x, curr) => {
            const x1 = JSON.parse(x);
            x1.growthrate > curr.growthrate ? curr : x1;
          }, rating_tech_users[0]);

          growthrate_rating_tech_users = rating_tech_users.filter((u) => {
            if (u.growthrate == mini.growthrate) {
              return true;
            } else {
              return false;
            }
          });
        }
      }
      if (growthrate_rating_tech_users.length == 1) {
        return growthrate_rating_tech_users[0];
      } else {
        //finding positivity rates through nlp model
        let pr = await getPositivityRate(growthrate_rating_tech_users);

        //selecting first user with maximum positivity ration
        let m = 0;
        for (let i = 0; i < pr.length; i++) {
          if (pr[m] < pr[i]) {
            m = i;
          }
        }
        return growthrate_rating_tech_users[m];
      }
    }
  }
}
let link = null;
async function getMeetLink(link) {
  while (link == null);
  return link;
}
function setLink(l) {
  link = l;
}

export {
  saveUser,
  getUserByEmail,
  setStatus,
  selectUser,
  getMeetLink,
  setLink,
};
