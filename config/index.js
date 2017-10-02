let configs = {
  appRoot : process.env.APPROOT || '/',
  ENV     : process.env.ENV || 'development',
  port    : process.env.PORT || 3001
};

module.exports = configs;
