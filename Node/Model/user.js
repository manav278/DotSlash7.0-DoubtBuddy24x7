import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  technology: {
    type: [String],
    require: true,
  },
  onlinestatus: {
    type: Boolean,
    require: true,
    default:false
  },
  reviews: {
    type: [String],
    require: true,
  },
  rating: {
    type: Number,
    min: 0,
    default: 100,
    require: true,
  },
  highestrating: {
    type: Number,
    min: 0,
    default: 0,
    require: true,
  },
  growthrate: {
    type: Number,
    default: 0,
    require: true,
  },
});
userSchema.methods = {
  setHighestRatingAndGrowthRate: function (newRating) {
    this.growthrate =
      ((newRating - this.rating) / Math.max(newRating, this.rating)) * 100;
    if (newRating > this.highestrating) {
      this.highestrating = newRating;
    }
    this.rating = newRating;
  },
  setOnlineStatus: function (os) {
    this.onlinestatus = os;
  },
};

const user = mongoose.model("devs", userSchema);
export default user;
