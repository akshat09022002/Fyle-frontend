const { report } = require('process');

module.exports = function(config) {
    config.set({
        customLaunchers: {
            ChromiumHeadless: {
              base: 'Chromium',
              flags: ['--headless', '--no-sandbox', '--disable-gpu', '--disable-web-security']
            },
            ChromeHeadless: {
              base: 'Chrome',
              flags: ['--headless', '--no-sandbox', '--disable-gpu', '--disable-web-security']
            }
          },
        basePath: '',
        frameworks: ['jasmine', '@angular-devkit/build-angular'],
        plugins: [
            require('karma-jasmine'),
            require('karma-chromium-launcher'),
            require('karma-chrome-launcher'),
            require('karma-coverage-istanbul-reporter'),  // Ensure this is included
            require('@angular-devkit/build-angular/plugins/karma')
        ],
        client: {
            clearContext: false // leave Jasmine Spec Runner output visible in browser
        },
        coverageIstanbulReporter: {
            dir: require('path').join(__dirname, '../coverage/frontend'),
            reporters: ['html', 'lcovonly', 'text-summary'],
            fixWebpackSourcePaths: true
        },
      reporters: ['progress', 'coverage-istanbul'],
      port: 9876,
      colors: true,
      logLevel: config.LOG_INFO,
      autoWatch: false,
      browsers: ['Chromium','Chrome','ChromiumHeadless', 'ChromeHeadless'], // Use 'Chromium' here
      singleRun: true,
      restartOnFileChange: true
    });
};

  