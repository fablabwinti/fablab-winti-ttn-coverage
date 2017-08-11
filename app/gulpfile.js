var gulp = require( 'gulp' );
var gutil = require( 'gulp-util' );
var ftp = require( 'vinyl-ftp' );
var config = require('./config').ftpConfig;
 
gulp.task( 'deploy', function () {
 
  console.log(config);
  
  var conn = ftp.create( {
    host: config.host,
    user: config.user,
    password: config.password,
    parallel: 3,
    log: gutil.log
  });
 
  var globs = [
    'build/**',
    'app.js',
    'config.js',
    'package.json'
  ];

  conn.delete('build', function() {
    return gulp.src( globs, { base: '.', buffer: false } )
      .pipe( conn.dest( '/' ) );
  })

 
});