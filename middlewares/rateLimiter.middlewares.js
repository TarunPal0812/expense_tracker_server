import ratelimiter from "../config/upstash.config.js";

export const rateLimiter = async (req, res, next) => {
  try {
    const { success } = await ratelimiter.limit("rate-limit");
    if (!success) {
      return res.status(429).json({
        message: "Too many request, Please try again later.",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log("Error:", error.message);
    next(error);
  }
};
