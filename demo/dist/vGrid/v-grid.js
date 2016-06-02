'use strict';

System.register(['aurelia-framework', './v-grid-generator', './v-grid-filter', './v-grid-sort', './v-grid-sortable', './v-grid-observables', './v-grid-config', './v-grid-resizable', './v-grid-selection', './v-grid-ctx', './v-grid-scroll-events', './v-grid-markup-generator'], function (_export, _context) {
  "use strict";

  var TaskQueue, BindingEngine, bindable, ViewCompiler, ViewSlot, Container, ViewResources, containerless, VGridGenerator, VGridFilter, VGridSort, VGridSortable, VGridObservables, VGridConfig, VGridResizable, VGridSelection, VGridCtx, VGridScrollEvents, VGridMarkupGenerator, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _desc, _value, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _class2, _temp, VGrid;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  return {
    setters: [function (_aureliaFramework) {
      TaskQueue = _aureliaFramework.TaskQueue;
      BindingEngine = _aureliaFramework.BindingEngine;
      bindable = _aureliaFramework.bindable;
      ViewCompiler = _aureliaFramework.ViewCompiler;
      ViewSlot = _aureliaFramework.ViewSlot;
      Container = _aureliaFramework.Container;
      ViewResources = _aureliaFramework.ViewResources;
      containerless = _aureliaFramework.containerless;
    }, function (_vGridGenerator) {
      VGridGenerator = _vGridGenerator.VGridGenerator;
    }, function (_vGridFilter) {
      VGridFilter = _vGridFilter.VGridFilter;
    }, function (_vGridSort) {
      VGridSort = _vGridSort.VGridSort;
    }, function (_vGridSortable) {
      VGridSortable = _vGridSortable.VGridSortable;
    }, function (_vGridObservables) {
      VGridObservables = _vGridObservables.VGridObservables;
    }, function (_vGridConfig) {
      VGridConfig = _vGridConfig.VGridConfig;
    }, function (_vGridResizable) {
      VGridResizable = _vGridResizable.VGridResizable;
    }, function (_vGridSelection) {
      VGridSelection = _vGridSelection.VGridSelection;
    }, function (_vGridCtx) {
      VGridCtx = _vGridCtx.VGridCtx;
    }, function (_vGridScrollEvents) {
      VGridScrollEvents = _vGridScrollEvents.VGridScrollEvents;
    }, function (_vGridMarkupGenerator) {
      VGridMarkupGenerator = _vGridMarkupGenerator.VGridMarkupGenerator;
    }],
    execute: function () {
      _export('VGrid', VGrid = (_dec = bindable({ attribute: "v-grid-context" }), _dec2 = bindable({ attribute: "v-collection" }), _dec3 = bindable({ attribute: "v-current-entity" }), _dec4 = bindable({ attribute: "v-columns" }), _dec5 = bindable({ attribute: "v-row-height" }), _dec6 = bindable({ attribute: "v-header-height" }), _dec7 = bindable({ attribute: "v-footer-height" }), _dec8 = bindable({ attribute: "v-resizable-headers" }), _dec9 = bindable({ attribute: "v-attibutes-observe" }), _dec10 = bindable({ attribute: "v-multi-select" }), _dec11 = bindable({ attribute: "v-manual-sel" }), _dec12 = bindable({ attribute: "v-sortable-headers" }), _dec13 = bindable({ attribute: "v-loading-threshold" }), _dec14 = bindable({ attribute: "v-remote-index" }), _dec15 = bindable({ attribute: "v-row-on-draw" }), _dec16 = bindable({ attribute: "v-event-onremote" }), (_class = (_temp = _class2 = function () {
        function VGrid(element, bindingEngine, viewCompiler, viewSlot, container, viewResources, taskQueue) {
          _classCallCheck(this, VGrid);

          _initDefineProp(this, 'vGridContextObj', _descriptor, this);

          _initDefineProp(this, 'vGridCollection', _descriptor2, this);

          _initDefineProp(this, 'vGridCurrentEntity', _descriptor3, this);

          _initDefineProp(this, 'vGridColumns', _descriptor4, this);

          _initDefineProp(this, 'attRowHeight', _descriptor5, this);

          _initDefineProp(this, 'attHeaderHeight', _descriptor6, this);

          _initDefineProp(this, 'attFooterHeight', _descriptor7, this);

          _initDefineProp(this, 'attResizableHeaders', _descriptor8, this);

          _initDefineProp(this, 'attAttributeObserve', _descriptor9, this);

          _initDefineProp(this, 'attMultiSelect', _descriptor10, this);

          _initDefineProp(this, 'attManualSelection', _descriptor11, this);

          _initDefineProp(this, 'attSortableHeader', _descriptor12, this);

          _initDefineProp(this, 'attLoadingThreshold', _descriptor13, this);

          _initDefineProp(this, 'attRemoteIndex', _descriptor14, this);

          _initDefineProp(this, 'eventOnRowDraw', _descriptor15, this);

          _initDefineProp(this, 'eventOnRemoteCall', _descriptor16, this);

          _initDefineProp(this, 'loadingMessage', _descriptor17, this);

          this.loading = false;

          this.element = element;

          this.viewCompiler = viewCompiler;
          this.viewSlot = viewSlot;
          this.container = container;
          this.viewResources = viewResources;
          this.taskQueue = taskQueue;

          this.vGridCurrentEntityRef = null;

          this.vGridCurrentRow = -1;

          this.vGridRowKey = "__vGridKey";

          this.vGridCollectionFiltered = [];

          this.vGridScrollEvents = new VGridScrollEvents(this);
          this.vGridFilter = new VGridFilter(this);
          this.vGridSort = new VGridSort(this);
          this.vGridConfig = new VGridConfig(this);
          this.vGridSelection = new VGridSelection(null, this);
          this.vGridSortable = new VGridSortable(this);
          this.vGridResizable = new VGridResizable(this);
          this.vGridObservables = new VGridObservables(this, bindingEngine);
          this.vGridGenerator = new VGridGenerator(this);
          this.vGridClientCtx = new VGridCtx(this);
          this.vGridMarkupGenerator = new VGridMarkupGenerator(this);
          this.vGridPager = null;
        }

        VGrid.prototype.raiseEvent = function raiseEvent(name) {
          var data = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

          var event = new CustomEvent(name, {
            detail: data,
            bubbles: true
          });
          this.element.dispatchEvent(event);

          return event;
        };

        VGrid.prototype.checkKeys = function checkKeys() {
          var _this = this;

          this.vGridCollection.forEach(function (row) {
            if (!row[_this.vGridRowKey] && row !== undefined && row !== null) {
              row[_this.vGridRowKey] = _this.guid();
            }
          });
        };

        VGrid.prototype.checkKey = function checkKey(row) {
          if (!row[this.vGridRowKey] && row !== undefined && row !== null) {
            row[this.vGridRowKey] = this.guid();
          }
        };

        VGrid.prototype.vGridGetRowKey = function vGridGetRowKey(key) {
          var _this2 = this;

          var rowFound = null;
          this.vGridCollection.forEach(function (row, index) {
            if (row[_this2.vGridRowKey] === key) {
              rowFound = index;
            }
          });
          return rowFound;
        };

        VGrid.prototype.guid = function guid() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        };

        VGrid.prototype.bind = function bind(parent, overrideContext) {
          this.$parent = parent;
          this.overrideContext = overrideContext;

          if (!this.vGridContextObj) {
            this.vGridContextObj = {};
          }

          this.vGridContextObj.ctx = this.vGridClientCtx;
          var vConfig = this.vGridConfig;
          vConfig.setBindValueArray(this.attAttributeObserve, 'attAttributeObserve');
          vConfig.setBindValueInt(this.attRowHeight, 'attRowHeight');
          vConfig.setBindValueInt(this.attHeaderHeight, 'attHeaderHeight');
          vConfig.setBindValueInt(this.attFooterHeight, 'attFooterHeight');
          vConfig.setBindValueBool(this.attResizableHeaders, 'attResizableHeaders');
          vConfig.setBindValueBool(this.attMultiSelect, 'attMultiSelect');
          vConfig.setBindValueBool(this.attSortableHeader, 'attSortableHeader');
          vConfig.setBindValueInt(this.attLoadingThreshold, 'attLoadingThreshold');
          vConfig.setBindValueString(this.attRemoteIndex, 'attRemoteIndex');
          vConfig.setBindValueBool(this.attManualSelection, 'attManualSelection');
          vConfig.setBindValueFunction(this.eventOnRowDraw, 'eventOnRowDraw');
          vConfig.setBindValueFunction(this.eventOnRemoteCall, 'eventOnRemoteCall');

          if (this.vGridCollection === undefined || this.vGridCurrentEntity === undefined) {
            if (this.vGridCollection === undefined && this.vGridCurrentEntity === undefined) {
              console.warn("currentEntity & collection not set/binded in config attribute");
            } else {
              if (this.vGridCurrentEntity === undefined) {
                console.warn("currentEntity not set/binded in config attribute");
              }
              if (this.vGridCollection === undefined) {
                console.warn("collection not set/binded in config attribute");
              }
            }
          } else {
            this.vGridCollectionFiltered = this.vGridCollection.slice(0);

            this.checkKeys();
          }
        };

        VGrid.prototype.attached = function attached() {

          if (!this.vGridConfig.repeater) {
            this.vGridMarkupGenerator.generate();
          }

          this.vGridObservables.enableObservablesCollection();
          this.vGridObservables.enableObservablesArray();
          this.vGridObservables.enableObservablesAttributes();

          this.vGridGenerator.init(false);
        };

        VGrid.prototype.unbind = function unbind() {
          this.vGridGenerator.unbindDetachViewSlots();
        };

        VGrid.prototype.detached = function detached() {
          this.vGridObservables.disableObservablesAttributes();
          this.vGridObservables.disableObservablesCollection();
          this.vGridObservables.disableObservablesArray();
        };

        return VGrid;
      }(), _class2.inject = [Element, BindingEngine, ViewCompiler, ViewSlot, Container, ViewResources, TaskQueue], _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'vGridContextObj', [_dec], {
        enumerable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'vGridCollection', [_dec2], {
        enumerable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'vGridCurrentEntity', [_dec3], {
        enumerable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, 'vGridColumns', [_dec4], {
        enumerable: true,
        initializer: null
      }), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, 'attRowHeight', [_dec5], {
        enumerable: true,
        initializer: null
      }), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, 'attHeaderHeight', [_dec6], {
        enumerable: true,
        initializer: null
      }), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, 'attFooterHeight', [_dec7], {
        enumerable: true,
        initializer: null
      }), _descriptor8 = _applyDecoratedDescriptor(_class.prototype, 'attResizableHeaders', [_dec8], {
        enumerable: true,
        initializer: null
      }), _descriptor9 = _applyDecoratedDescriptor(_class.prototype, 'attAttributeObserve', [_dec9], {
        enumerable: true,
        initializer: null
      }), _descriptor10 = _applyDecoratedDescriptor(_class.prototype, 'attMultiSelect', [_dec10], {
        enumerable: true,
        initializer: null
      }), _descriptor11 = _applyDecoratedDescriptor(_class.prototype, 'attManualSelection', [_dec11], {
        enumerable: true,
        initializer: null
      }), _descriptor12 = _applyDecoratedDescriptor(_class.prototype, 'attSortableHeader', [_dec12], {
        enumerable: true,
        initializer: null
      }), _descriptor13 = _applyDecoratedDescriptor(_class.prototype, 'attLoadingThreshold', [_dec13], {
        enumerable: true,
        initializer: null
      }), _descriptor14 = _applyDecoratedDescriptor(_class.prototype, 'attRemoteIndex', [_dec14], {
        enumerable: true,
        initializer: null
      }), _descriptor15 = _applyDecoratedDescriptor(_class.prototype, 'eventOnRowDraw', [_dec15], {
        enumerable: true,
        initializer: null
      }), _descriptor16 = _applyDecoratedDescriptor(_class.prototype, 'eventOnRemoteCall', [_dec16], {
        enumerable: true,
        initializer: null
      }), _descriptor17 = _applyDecoratedDescriptor(_class.prototype, 'loadingMessage', [bindable], {
        enumerable: true,
        initializer: function initializer() {
          return "Working please wait";
        }
      })), _class)));

      _export('VGrid', VGrid);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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QUwsQ0FBc0Isc0JBQXRCO0FBQ0EsZUFBSyxnQkFBTCxDQUFzQiwyQkFBdEI7O0FBR0EsZUFBSyxjQUFMLENBQW9CLElBQXBCLENBQXlCLEtBQXpCO0FBRUQsUzs7d0JBR0QsTSxxQkFBUTtBQUNOLGVBQUssY0FBTCxDQUFvQixxQkFBcEI7QUFDRCxTOzt3QkFNRCxRLHVCQUFXO0FBQ1QsZUFBSyxnQkFBTCxDQUFzQiw0QkFBdEI7QUFDQSxlQUFLLGdCQUFMLENBQXNCLDRCQUF0QjtBQUNBLGVBQUssZ0JBQUwsQ0FBc0IsdUJBQXRCO0FBQ0QsUzs7O21CQTFNTSxNLEdBQVMsQ0FBQyxPQUFELEVBQVUsYUFBVixFQUF5QixZQUF6QixFQUF1QyxRQUF2QyxFQUFpRCxTQUFqRCxFQUE0RCxhQUE1RCxFQUEyRSxTQUEzRSxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7eUZBaUJmLFE7OztpQkFBMEIscUIiLCJmaWxlIjoidkdyaWQvdi1ncmlkLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==