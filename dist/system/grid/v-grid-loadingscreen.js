System.register(["aurelia-framework", "./v-grid"], function (exports_1, context_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    var aurelia_framework_1, v_grid_1, VGridLoadingScreen;
    return {
        setters: [
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (v_grid_1_1) {
                v_grid_1 = v_grid_1_1;
            }
        ],
        execute: function () {
            VGridLoadingScreen = (function () {
                function VGridLoadingScreen(element, vGrid, targetInstruction) {
                    this.element = element;
                    this.vGrid = vGrid;
                    this.template = targetInstruction.elementInstruction.template;
                }
                VGridLoadingScreen.prototype.bind = function () {
                    this.vGrid.loadingScreenTemplate = this.template;
                };
                VGridLoadingScreen = __decorate([
                    aurelia_framework_1.noView(),
                    aurelia_framework_1.customElement('v-grid-loadingscreen'),
                    aurelia_framework_1.processContent(function (compiler, resources, element, instruction) {
                        compiler = null;
                        resources = null;
                        instruction.template = element.innerHTML;
                        element.innerHTML = '';
                    }),
                    aurelia_framework_1.inject(Element, v_grid_1.VGrid, aurelia_framework_1.TargetInstruction),
                    __metadata("design:paramtypes", [Element, v_grid_1.VGrid, Object])
                ], VGridLoadingScreen);
                return VGridLoadingScreen;
            }());
            exports_1("VGridLoadingScreen", VGridLoadingScreen);
        }
    };
});
