const ApiError = require("../utils/ApiError");

module.exports=(...roles)=>{

    return (req,res,next)=>{

        if(!roles.includes(req.user.role))
            return next(
                new ApiError(403,"Forbidden")
            );

        next();

    };

};