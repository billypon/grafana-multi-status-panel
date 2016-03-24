import { MetricsPanelCtrl } from 'app/plugins/sdk';
import moment from 'moment';
import _ from 'lodash';
import './css/multi-status.css!';

const panelDefaults = {
  color: '#6495ed',
  size: '16px'
};

export class MultiStatus extends MetricsPanelCtrl {
  constructor($scope, $injector) {
    super($scope, $injector);
    _.defaultsDeep(this.panel, panelDefaults);

    this.events.on('init-edit-mode', this.onInitEditMode.bind(this));
    this.events.on('panel-teardown', this.onPanelTeardown.bind(this));
    this.events.on('panel-initialized', this.onPanelInitialized.bind(this));
    this.events.on('data-received', this.onDataReceived.bind(this));
    this.events.on('data-error', this.onDataError.bind(this));
    this.events.on('data-snapshot-load', this.onDataReceived.bind(this));
  }

  onDataReceived(dataList) {
    // this.series = dataList.map(this.seriesHandler.bind(this));
    // this.data = this.parseSeries(this.series);
    this.data = dataList.map(d => {
      const last = d.datapoints && _.last(d.datapoints);
      return {
        target: d.target,
        value: _.clamp(last && last[0] || 0, 0, 1)
      };
    });
    this.render(this.data);
  }


  onDataError() {
    delete this.data;
    //this.series = [];
    this.render();
  }

  onInitEditMode() {
    this.addEditorTab('Options', 'public/plugins/multi-status/editor.html', 2);
  }

  onPanelTeardown() {
  }

  onPanelInitialized(scope, elem) {
    this.events.on('render', x => {
      // const $panelContainer = elem.find('.panel-container');
      // if (this.panel.bgColor) {
      //   $panelContainer.css('background-color', this.panel.bgColor);
      // } else {
      //   $panelContainer.css('background-color', '');
      // }
    });
  }
}

MultiStatus.templateUrl = 'module.html';
