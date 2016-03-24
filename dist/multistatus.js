'use strict';

System.register(['app/plugins/sdk', 'moment', 'lodash', './css/multi-status.css!'], function (_export, _context) {
  "use strict";

  var MetricsPanelCtrl, moment, _, _createClass, panelDefaults, MultiStatus;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  return {
    setters: [function (_appPluginsSdk) {
      MetricsPanelCtrl = _appPluginsSdk.MetricsPanelCtrl;
    }, function (_moment) {
      moment = _moment.default;
    }, function (_lodash) {
      _ = _lodash.default;
    }, function (_cssMultiStatusCss) {}],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      panelDefaults = {
        color: '#6495ed',
        size: '16px'
      };

      _export('MultiStatus', MultiStatus = function (_MetricsPanelCtrl) {
        _inherits(MultiStatus, _MetricsPanelCtrl);

        function MultiStatus($scope, $injector) {
          _classCallCheck(this, MultiStatus);

          var _this = _possibleConstructorReturn(this, (MultiStatus.__proto__ || Object.getPrototypeOf(MultiStatus)).call(this, $scope, $injector));

          _.defaultsDeep(_this.panel, panelDefaults);

          _this.events.on('init-edit-mode', _this.onInitEditMode.bind(_this));
          _this.events.on('panel-teardown', _this.onPanelTeardown.bind(_this));
          _this.events.on('panel-initialized', _this.onPanelInitialized.bind(_this));
          _this.events.on('data-received', _this.onDataReceived.bind(_this));
          _this.events.on('data-error', _this.onDataError.bind(_this));
          _this.events.on('data-snapshot-load', _this.onDataReceived.bind(_this));
          return _this;
        }

        _createClass(MultiStatus, [{
          key: 'onDataReceived',
          value: function onDataReceived(dataList) {
            // this.series = dataList.map(this.seriesHandler.bind(this));
            // this.data = this.parseSeries(this.series);
            this.data = dataList.map(function (d) {
              var last = d.datapoints && _.last(d.datapoints);
              return {
                target: d.target,
                value: _.clamp(last && last[0] || 0, 0, 1)
              };
            });
            this.render(this.data);
          }
        }, {
          key: 'onDataError',
          value: function onDataError() {
            delete this.data;
            //this.series = [];
            this.render();
          }
        }, {
          key: 'onInitEditMode',
          value: function onInitEditMode() {
            this.addEditorTab('Options', 'public/plugins/multi-status/editor.html', 2);
          }
        }, {
          key: 'onPanelTeardown',
          value: function onPanelTeardown() {}
        }, {
          key: 'onPanelInitialized',
          value: function onPanelInitialized(scope, elem) {
            this.events.on('render', function (x) {
              // const $panelContainer = elem.find('.panel-container');
              // if (this.panel.bgColor) {
              //   $panelContainer.css('background-color', this.panel.bgColor);
              // } else {
              //   $panelContainer.css('background-color', '');
              // }
            });
          }
        }]);

        return MultiStatus;
      }(MetricsPanelCtrl));

      _export('MultiStatus', MultiStatus);

      MultiStatus.templateUrl = 'module.html';
    }
  };
});
//# sourceMappingURL=multistatus.js.map
