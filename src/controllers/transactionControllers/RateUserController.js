require('dotenv').config();
const User = require('../../models/User');

module.exports = {

  async rateUser(req, res){

    const { userId, ratedUserId, stars } = req.body;

    try{

      //Check for missing data on request
      if(!userId || !ratedUserId ||!stars ){
        res.status(400).json({ message: "Error - Missing Required Information from Request"});
      }

      //retrieves user & event from DB
      let userFromDB = await User.findOne({ _id: userId });
      let ratedUserFromDB = await User.findOne({ _id: ratedUserId });

      //Check if User that want to rate exists
      if(!userFromDB){
        res.status(400).json({ message: "Error - Can't find User with provided ID" });
      }

      //Check if Rated User exists
      if(!ratedUserFromDB){
        res.status(400).json({ message: "Error - Can't find the to rate" });
      }

      if(stars == 1){ ratedUserFromDB.oneStarReviews++ };
      if(stars == 2){ ratedUserFromDB.twoStarsReviews++ };
      if(stars == 3){ ratedUserFromDB.threeStarsReviews++ };
      if(stars == 4){ ratedUserFromDB.fourStarsReviews++ };
      if(stars == 5){ ratedUserFromDB.fiveStarsReviews++ };

      totalReviews = 
        ratedUserFromDB.oneStarReviews +
        ratedUserFromDB.twoStarsReviews +
        ratedUserFromDB.threeStarsReviews +
        ratedUserFromDB.fourStarsReviews +
        ratedUserFromDB.fiveStarsReviews

      totalReviewsWeighted = 
        ratedUserFromDB.oneStarReviews*1 +
        ratedUserFromDB.twoStarsReviews*2 +
        ratedUserFromDB.threeStarsReviews*3 +
        ratedUserFromDB.fourStarsReviews*4 +
        ratedUserFromDB.fiveStarsReviews*5

      ratedUserFromDB.averageStar = totalReviewsWeighted / totalReviews;

      await ratedUserFromDB.save();

      res.status(200).json({ message: "Player rated Succesfully" });

    }catch(err){
      res.status(500).json({ message: "Error - could not rate user" });
    }
  }
};