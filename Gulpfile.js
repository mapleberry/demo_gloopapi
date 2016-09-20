const gulp = require('gulp')
const mocha = require('gulp-mocha')
const nodemon = require('gulp-nodemon')
const env = require('gulp-env')
const shell = require('gulp-shell')

gulp.task('unitTest', ['lint'], () => {
  return gulp.src('server/test/**/*.spec.js')
    .pipe(mocha())
    .on('error', handleError)
})

gulp.task('lint', shell.task(['npm run lint']))

gulp.task('dev', ['unitTest'], () => {
  env({
    file: 'default-env-variables.json'
  })

  nodemon({
    script: 'server/src/index.js',
    ext: 'js',
    legacyWatch: true,
    args: ['--legacy-watch']
  })
    .on('restart', () => {
      return gulp.start('unitTest')
    })
    .on('error', handleError)
})

function handleError (err) {
  console.error(err)
  process.exit(-1)
}
