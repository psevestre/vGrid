import { VGrid } from '../v-grid';
import { BindingContext, OverrideContext } from '../../interfaces';
export declare class VGridAttributesImageFix {
    private vGrid;
    private element;
    private value;
    constructor(element: HTMLImageElement, vGrid: VGrid);
    valueChanged(newValue: string, oldValue: string): void;
    bind(bindingContext: BindingContext, overrideContext: OverrideContext): void;
}