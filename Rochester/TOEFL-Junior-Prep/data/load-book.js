// Loads the extra Reading and Language timed tests: data/bt01-reading.js ... bt10-language.js (missing files are ignored)
(function () {
  for (var i = 1; i <= 10; i++) {
    var n = (i < 10 ? '0' : '') + i;
    ['reading', 'language'].forEach(function (k) {
      document.write('<script src="data/bt' + n + '-' + k + '.js"><\/script>');
    });
  }
})();
