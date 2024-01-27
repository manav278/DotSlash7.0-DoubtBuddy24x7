import axios from "axios"
async function getNLPParam(solverfeedback) {
    var url = "http://127.0.0.1:5000";
    var response = await axios.post(`${url}/demo`, {
        feedback_reviews: solverfeedback,
    }
    );
    //console.log(response);
    return response.data;
}
export {getNLPParam};