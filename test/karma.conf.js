module.exports = function (config) {
  config.set({
    basePath: '..',
    frameworks: ['mocha'],
    reporters: ['mocha'],
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
    port: 9876,
    colors: true,
    singleRun: true,
    logLevel: config.LOG_INFO
  });
};
