import rateLimit from "express-rate-limit"

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
   max: 100,
     handler: (req, res) => {

    res.status(429).json({
      success: false,
      message: "Too many requests",
    });
  },
});
export default limiter;