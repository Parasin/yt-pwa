const express    = require( 'express' ),
      routes     = require( './routes' ),
      bodyParser = require( 'body-parser' ),
      config     = require( './config' ),
      path       = require( 'path' );

let app = express();
app.set( 'view engine', 'html' );
app.set( 'views', path.join( __dirname, 'public/build/default' ) );

app.use( express.static( path.join( __dirname, 'public/build/default' ) ) );
app.use( express.static( path.join( __dirname, 'node_modules' ) ) );

app.use( bodyParser.urlencoded( {
  extended : false,
  limit    : '20mb'
} ) );

app.use( bodyParser.json( { limit : '20mb' } ) );

routes( app );

app.listen( config.port, () => {
  console.log( 'Now listening on', config.port );

} );
