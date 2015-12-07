window.__karma__.loaded = function() {
  System.config({
    paths: {
        'test/build/*': 'test/build/*'
    }
  });
  System.main = 'test/build/index.js';

  steal.done().then(function(){
    if(window.__karma__) {
      window.__karma__.start();
    }
  });
};
