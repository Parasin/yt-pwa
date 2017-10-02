const Base   = require( './base' ),
      config = require( '../config' );

let routes = ( app ) => {
  app.use( ( req, res, next ) => {
    res.setHeader( 'Access-Control-Allow-Origin', '*' );
    res.setHeader( 'Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE' );
    res.setHeader( 'Access-Control-Allow-Headers', 'X-Requested-With,content-type, x-access-token' );
    res.setHeader( 'Access-Control-Allow-Credentials', true );
    res.removeHeader( 'X-Powered-By' );
    next();
  } );


  if ( process.env.ENV === 'development' ) {
    app.use( `${config.appRoot}`, ( req, res, next ) => {
      return next();
    }, Base );
  } else {
    app.use( `${config.appRoot}`, secureRequest, ( req, res, next ) => {
      return next();
    }, Base );
  }
};

function secureRequest ( req, res, next ) {
  if ( req.headers[ 'x-forwarded-proto' ] === 'https' ) {
    return next();
  }

  res.redirect( 'https://' + req.headers.host + '/' + req.path );
}

module.exports = routes;
