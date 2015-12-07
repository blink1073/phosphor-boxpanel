module.exports = function (config) {
  config.set({
    basePath: '..',
    frameworks: ['mocha'],
    reporters: ['mocha'],
    files: [
      { pattern: 'lib/*.*', included: false },
      { pattern: 'package.json', included: false },
      { pattern: 'node_modules/**/*.*', included: false },
      { pattern: 'test/build/index.*', included: false },
      { pattern: 'test/build/index.*', included: false },
      'node_modules/steal/steal.js',
      'test/karma.bootstrap.js'
    ],
    port: 9876,
    colors: true,
    singleRun: true,
    logLevel: config.LOG_INFO
  });
};
