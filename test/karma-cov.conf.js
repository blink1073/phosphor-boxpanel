module.exports = function (config) {
  config.set({
    basePath: '..',
    browsers: ['Firefox'],
    frameworks: ['mocha'],
    reporters: ['mocha', 'coverage'],
    files: [
      { pattern: 'lib/*.*', included: false },
      { pattern: 'node_modules/steal/**/*.js', included: false },
      { pattern: 'package.json', included: false },
      { pattern: 'node_modules/**/package.json', included: false},
      { pattern: 'node_modules/**/*.js', included: false },
      { pattern: 'node_modules/**/*.css', included: false },
      { pattern: 'test/build/index.*', included: false },
      'node_modules/steal/steal.js',
      'test/karma.bootstrap.js'
    ],
    coverageReporter: {
      reporters : [
        { 'type': 'text' },
        { 'type': 'lcov', dir: 'coverage' },
        { 'type': 'html', dir: 'coverage' }
      ]
    },
    port: 9876,
    colors: true,
    singleRun: true,
    logLevel: config.LOG_INFO
  });
};
