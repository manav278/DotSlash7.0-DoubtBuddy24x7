import user from "../Model/user.js";
import { getPositivityRate } from "../Routes/nlpApi.js";
import nodemailer from "nodemailer";

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

//get the online users based on techstack
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

//get the offline users based on techstack
async function getOfflineUserByTechstack(techstack, lower, high) {
  const result = user.findOne(
    //query object
    {
      onlinestatus: false,
      technology: { $in: techstack },
      rating: { $gte: lower, $lte: high },
    }
  );
  return result;
}

//selection algorithm for finding the right doubt solver
async function selectUser(techstack, currentUser) {
  //getting users based on onlinestatus and techstack
  const tech_users = await getOnlineUserByTechstack(techstack, currentUser);
  if (tech_users.length == 0) {
    //no matching teachstack user is online
    let x = 100;
    const selectedUser = await getOfflineUserByTechstack(
      techstack,
      currentUser.rating - x,
      currentUser.rating + x
    );
    // console.log(tech_users);
    while (selectedUser && selectedUser.length == 0) {
      x += 100;
      selectedUser = await getOfflineUserByTechstack(
        techstack,
        currentUser.rating - x,
        currentUser.rating + x
      );
    }
    sendEmail(selectedUser, currentUser);
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

//sends email to the user for assistance on a doubt in case of all offline user
function sendEmail(selectedUser, currentUser) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "orgdoubtbuddy24.7@gmail.com",
      pass: "ucll ghyc moxy aujz",
    },
  });
  var emailContent = `
  <p>One of our users, ${currentUser.username}, has a doubt that requires your expertise. They have reached out for assistance, and we believe your insights would be invaluable in resolving their concern.<p>

  <p>Could you please take a moment to come online and address  ${currentUser.username}'s doubt?(Please ignore if you are unavailable right now! within 15 minutes)<p>

  <a href="https://chat.openai.com/c/00b0c239-5eaf-4562-b4e7-e62b273ec10b" onclick="gotResponseOfEmail(${selectedUser})"style="display: inline-block; padding: 10px 20px; background-color: #3498db; color: #ffffff; text-decoration: none; border-radius: 5px;">Resolve Doubt</a>

  <p>Thank you in advance for your prompt attention to this matter.<p>
  `;
  const mailOptions = {
    from: "orgdoubtbuddy24.7@gmail.com",
    to: selectedUser.email,
    subject: "Request for Assistance: Help Needed to Resolve a Doubt",
    html: emailContent,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return false;
    }
    timerId = setTimeout(noResponseOfEmail, 900000);
    return true;
  });
}

function noResponseOfEmail() {}
let timerId;
function gotResponseOfEmail(selectedUser) {
  // msg = 1;
  clearTimeout(timerId);
}
export {
  saveUser,
  getUserByEmail,
  setStatus,
  selectUser,
  
};
