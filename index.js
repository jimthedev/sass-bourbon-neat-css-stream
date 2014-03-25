var through = require( "through" );
var sass = require( "node-sass" );
var path = require( "path" );
var bourbon = require("node-bourbon").includePaths;
var neat = require("node-neat").includePaths;

module.exports = function( file ) {
	var data = "";
	if( file !== undefined && path.extname( file ) !== ".scss" )
		return through();
	else
		return through( write, end );

	function write(buf) {
		data += buf;
	}
	function end() {

		this.queue( sass.renderSync( data, {
			includePaths: bourbon.concat(neat)
		} ) );
		this.queue( null );
	}
};