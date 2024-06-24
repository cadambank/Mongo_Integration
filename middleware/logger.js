//logger
const logger = (req, res, next) => {
  let date_curr = new Date();
  console.log(
    `
    New Request::${date_curr.toISOString()}
    --------------------------------------------------------------------
    Request 
    Method  : "${req.method}"
    from IP : "${req.ip}"
    Accessed 
    URL     : "${req.protocol}://${req.get("host")}${req.originalUrl}"
    --------------------------------------------------------------------
    `
  );
  next();
};

module.exports = logger;
