import axios from "axios";

//nlp-model calling functions for forecasting the positivity rate of the review


async function getPositivityRate(users) {
  let usersReviews = [];
  for (let i = 0; i < users.length; i++) {
    usersReviews.push(users[i]["reviews"]);
  }

  var url = "http://127.0.0.1:5000";
  var response = await axios.post(`${url}/positivityrate_endpoint`, {
    reviews: usersReviews,
  });
  console.log(response.data);
  return response.data;
}
async function getNLPParam(solverfeedback) {
  var url = "http://127.0.0.1:5000";
  var response = await axios.post(`${url}/demo`, {
    feedback_reviews: solverfeedback,
  }
  );
  //console.log(response);
  return response.data;
}
export { getPositivityRate, getNLPParam };
