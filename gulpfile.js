var gulp = require( 'gulp' );
var gutil = require( 'gulp-util' );
var ftp = require( 'vinyl-ftp' );
 
gulp.task( 'deploy', function () {
 
  var conn = ftp.create( {
    host:     'fablab-winti-ttn-coverage.ftp.evennode.com',
    user:     '...',
    password: '...',
    parallel: 10,
    log:      gutil.log
  });
 
  var globs = [
    'build/**',
    'app.js',
    'package.json'
  ];

  return gulp.src( globs, { base: '.', buffer: false } )
    .pipe( conn.dest( '/' ) );
 
});