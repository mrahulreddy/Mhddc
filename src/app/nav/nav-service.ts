import { Injectable } from '@angular/core';
import { AppUtilities } from "../shared/appUtilities";

declare var $: any;
declare var _: any;


@Injectable()

export class NavService {

    gdoStepNames = ['Home', 'Size', 'Openers', 'Additional options', 'Opener configuration'];
    resStepNames = ['Home', 'Size', 'Collection', 'Choose Home', 'Design', 'Construction', 'Color', 'Top Section', 'Glass Type', 'Hardware', 'DIY/ Install', 'Opener', 'Additional Options', 'Summary'];
    resQuickFlowStepNames = ['Home', 'Size', 'Collection', 'Design', 'Construction', 'Color', 'DIY/ Install', 'Opener', 'Additional Options', 'Summary'];
    resFlowSteps: Array<Step> = [];
    gdoFlowSteps: Array<Step> = [];
    resQuickFlowSteps: Array<Step> = [];
    constructor(private utils: AppUtilities) {
        this.resStepNames.forEach((r, i) => {
            this.resFlowSteps.push(new Step({
                No: i,
                Name: r,
                active: false,
                visited: false,
                callFn: null
            }));
        });

        this.gdoStepNames.forEach((g, i) => {
            this.gdoFlowSteps.push(new Step({
                No: i,
                Name: g,
                active: false,
                visited: false,
                callFn: null
            }));
        });

        this.resQuickFlowStepNames.forEach((r, i) => {
            this.resQuickFlowSteps.push(new Step({
                No: i,
                Name: r,
                active: false,
                visited: false,
                callFn: null
            }));
        });
    }
    CP; // cuurent page
    VP; // visited page
    NVP; // non visited page
    current: string = 'current';
    menuCount = this.utils.utilities.navCount;
    currentActiveEl;

    activateIcon() {
        
    }

}


export class Step {
    No: Number = 0;
    Name: String = '';
    active: boolean = false;
    visited: boolean = false;
    url: string = '';
    callFn: any = null;
    disabled: boolean = false;

    constructor(data) {
        this.No = data.No || this.No;
        this.Name = data.Name || this.Name;
        this.active = data.active || this.active;
        this.visited = data.visited || this.visited;
        this.url = data.url || this.url;
        this.callFn = data.callFn || this.callFn;
        this.disabled = data.disabled || this.disabled;
    }
}