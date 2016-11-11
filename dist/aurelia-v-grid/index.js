define(["require", "exports", './gridConnector', './selection', './dataSource', './collection'], function (require, exports, gridConnector_1, selection_1, dataSource_1, collection_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    __export(gridConnector_1);
    __export(selection_1);
    __export(dataSource_1);
    __export(collection_1);
    var prefix = './grid';
    function configure(config) {
        config.globalResources(prefix + '/attributes/v-filter', prefix + '/attributes/v-sort', prefix + '/attributes/v-image', prefix + '/attributes/v-drag-drop-col', prefix + '/attributes/v-resize-col', prefix + '/attributes/v-menu', prefix + '/attributes/v-selection', prefix + '/v-grid-row-repeat', prefix + '/v-grid-col', prefix + '/v-grid');
    }
    exports.configure = configure;
});

//# sourceMappingURL=index.js.map
