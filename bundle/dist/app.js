'use strict';

System.register([], function (_export, _context) {
  var App;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export('App', App = function () {
        function App() {
          _classCallCheck(this, App);
        }

        App.prototype.configureRouter = function configureRouter(config, router) {
          config.title = '<-goto github';
          config.map([{ route: ['', 'sample01'], name: 'sample01', moduleId: './samples/sample01', nav: true, title: 'col&internal functions' }]);
          this.router = router;
        };

        return App;
      }());

      _export('App', App);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztxQkFBYSxHOzs7OztzQkFDWCxlLDRCQUFnQixNLEVBQVEsTSxFQUFPO0FBQzdCLGlCQUFPLEtBQVAsR0FBZSxlQUFmO0FBQ0EsaUJBQU8sR0FBUCxDQUFXLENBQ1QsRUFBRSxPQUFPLENBQUMsRUFBRCxFQUFJLFVBQUosQ0FBVCxFQUEwQixNQUFNLFVBQWhDLEVBQTRDLFVBQVUsb0JBQXRELEVBQTZFLEtBQUssSUFBbEYsRUFBd0YsT0FBTSx3QkFBOUYsRUFEUyxDQUFYO0FBR0EsZUFBSyxNQUFMLEdBQWMsTUFBZDtBQUNELFMiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
