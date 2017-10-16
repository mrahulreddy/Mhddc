import { Component, Input, OnInit, OnChanges, AfterViewChecked, ChangeDetectorRef, ViewChild, HostListener } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, NavigationEnd, NavigationStart } from '@angular/router';
import { AppUtilities } from "./shared/appUtilities";
import { ModalComponent } from "ng2-bs3-modal/ng2-bs3-modal";
import { NavComponent } from "./nav/nav.component";
import { NavService } from "./nav/nav-service";
declare var $: any;
declare var ga: Function;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [NavComponent]
})
export class AppComponent implements OnInit, AfterViewChecked, OnChanges {
    @ViewChild('homeredirect') modal: ModalComponent;
    showStepIndicator = false;
    steps = [];
    activeStep = -1;
    flowType;

    noDIYs = [30, 16, 9];


    // Need to find better way to do this, 
    // it is not recommended approach to fix back button functionality in browser
    // for time concern it is implemented in this way, 
    // can be handled in better way using server session and proper url definitions.
    browserHistory = [];
    configSteps = [];
    resFlowPageList = [
        '/',
        '/banner',
        '/category',
        '/doorSize',
        '/collection',
        '/home'
    ];
    checkBackrestriction(url) {
        if ((this.resFlowPageList.indexOf(url) >= 0 || url.indexOf('/config') >= 0) && url.indexOf('/shoppingCart') < 0) {
            return true;
        }

        return false;
    }
    pushHistory(url) {
        var foundIndex;
        for (var i = 0; i < this.configSteps.length; i++) {
            if (this.configSteps[i].url === url) {
                foundIndex = i;
                this.configSteps[i].enabled = true;
            }
        }
        if (url === '/') {
            this.browserHistory = [];
        }


        this.browserHistory.push(url);
    }
    stayInPage() {
        this.modal.close();
        var currentPage = this.browserHistory[this.browserHistory.length - 1];
        var previousPage = this.browserHistory[this.browserHistory.length - 2];
        if (this.checkBackrestriction(this.route.url)) {
            if (previousPage.indexOf('gdoDoorSize') < 0 && previousPage.indexOf('gdoConfig') < 0 && previousPage.indexOf('shoppingCart') < 0) {
                var configSteps = this.configSteps.filter(r => r.enabled === true).map(s => s.url);
                if (configSteps.indexOf(currentPage) === configSteps.indexOf(previousPage) - 1) {
                } else {
                    var pageToNavigate = configSteps[configSteps.indexOf(previousPage) - 1]
                    if (pageToNavigate) {
                        this.route.navigateByUrl(pageToNavigate);
                    } else {
                        this.route.navigateByUrl('/');
                    }
                }
            } else {
                if (previousPage === '/gdoConfig/additionalOptions/alreadyexistsgdo') {
                    if (currentPage === '/gdoConfig/doorConfiguration') {
                        this.route.navigateByUrl('/category');
                    }
                } else if (previousPage === '/gdoConfig/additionalOptions') {
                    if (currentPage === '/gdoConfig/doorConfiguration') {
                        this.route.navigateByUrl('/gdoConfig/opener');
                    }
                }
            }

        } else {
            if (previousPage === '/gdoConfig/additionalOptions/alreadyexistsgdo') {
                if (currentPage === '/gdoConfig/doorConfiguration') {
                    this.route.navigateByUrl('/category');
                }
            }  else if (previousPage === '/gdoConfig/additionalOptions') {
                if (currentPage === '/gdoConfig/doorConfiguration') {
                    this.route.navigateByUrl('/gdoConfig/opener');
                }
            } else if (previousPage === '/category') {
                if (currentPage === '/gdoConfig/doorConfiguration') {
                    this.route.navigateByUrl('/banner');
                }
            } else if (previousPage === '/gdoConfig/opener') {
                if (currentPage === '/gdoConfig/additionalOptions') {
                    this.route.navigateByUrl('/gdoDoorSize');
                }
            } else if (previousPage === '/banner') {
                this.route.navigateByUrl('/');
            }
        }
    }
    // End of the browser back functionality

    constructor(private route: Router
        , private location: Location
        , private app: AppUtilities
        , private nav: NavComponent
        , private navservice: NavService
        , private activeRoute: ActivatedRoute
        , private cdref: ChangeDetectorRef) {
        route.events.subscribe(r => {
            if (r instanceof NavigationEnd) {
                window['cObj'] = app.resFlowSession.resDoorObj;
                this.pushHistory(r.url);
            }

            ga('set', 'page', r.url);
            ga('send', 'pageview')
        });

        this.configSteps = navservice.getResFlowSteps();
    }


    prev: string = 'Prev';
    next: string = 'Next';
    

    flow: string = this.app.utilities.flow;
    currScreen;
    // this is for checking whether Install or Diy selected for routing to appropriate screen
    selectedInstallDiy: string;
    @HostListener('window:popstate', ['$event'])
    onPopState(event) {
        if (this.location.path() !== '/banner') {
            this.modal.close();
            this.openModal();
        }
    }


    openModal() {
        this.modal.open();
    }

    goToHome() {
        this.modal.close();
        this.route.navigateByUrl('/banner');
    }

    ngOnChanges() {
        this.currScreen = this.app.utilities.currScreen;
    }

    ngAfterViewChecked() {
        this.cdref.detectChanges();
        this.selectedInstallDiy = this.app.resFlowSession.cart.length > 0 ? this.app.resFlowSession.cart[0]['INSTALLTYPE'] : 'Installed';
    }

    ngOnInit() {
  
        $('body').removeClass('loader');
        if (!this.app.utilities.zipCode && this.location.path() !== '/banner') {
            this.route.navigateByUrl('/');
        }
        this.currScreen = this.app.utilities[this.flow].indexOf(this.location.path());
        this.location.path() === '/thankyou' ? this.currScreen = 2 : this.currScreen = this.app.utilities[this.flow].indexOf(this.location.path());

        this.nav.subscribeMe((obj) => {
            this.showStepIndicator = obj.showStepIndicator;
            this.steps = obj.steps;
            this.activeStep = obj.activeStep;
            this.flowType = obj.flowType;
        }, this);
        window.onbeforeunload = function (event) {
            return "Navigating to Home Page will discard<br>all available Cart Items.";
        };
    }

    nextBtn(id): void {
        if (this.app.utilities[this.flow][id + 1] !== undefined) {
            this.currScreen = id + 1;
            if (this.selectedInstallDiy === 'DIY') {
                this.currScreen = id + 2
            }
            this.app.utilities.currPage = this.currScreen - 2;
            this.app.utilities.currScreen = this.app.utilities.currScreen;
            this.app.utilities.clicked = 1;
            this.toRoute(this.currScreen);
        }
    }

    prevBtn(id): void {
        this.currScreen = id - 1;
        let path = this.location.path();
        switch (path) {
            case "/config/opener":
                // this.currScreen = this.app.utilities.residentialNavElems.indexOf('/config/install');
                break;
            default:
                this.app.utilities.currPage = this.app.utilities.currPage - 1;
        }
        // if (this.location.path() === '/config/opener') {
        //     // this.currScreen = this.app.utilities.residentialNavElems.indexOf('/config/install');
        // }

        this.app.utilities.currScreen = this.currScreen;
        this.app.utilities.clicked = 0;
        this.toRoute(this.currScreen)
    }

    toRoute(path) {
        let link: any = this.app.utilities[this.app.utilities.flow][path];
        this.route.navigateByUrl(link);
    }



    priceListener;
    updatePrice() {
        if (this.priceListener) {
            this.priceListener();
        }
    }
    subscribeToPrice(fn) {
        this.priceListener = fn;
    }

    detailsUpdateFn;
    sunscribeToDetailsUpdate(fn) {
        this.detailsUpdateFn = fn;
    }

    updateResDetails() {
        if (this.detailsUpdateFn) {
            this.detailsUpdateFn();
        }
    }

    setLoader(show?) {
        if (show) {
            // $('body').addClass('loader');
        } else {
            // $('body').removeClass('loader');
        }
    }

    getCheckOut(price) {
        this.app.resFlowSession.orderObj.cart.push(this.app.resFlowSession.resDoorObj);
        let resObj = this.app.resFlowSession.orderObj;
        resObj.cart = this.app.cartItems;
        let qpbProduct;
        try {
            if (this.app.resFlowSession.resDoorObj.product.apiData && this.app.resFlowSession.resDoorObj.product.apiData['filter']) {
                let productQuickShip = this.app.resFlowSession.resDoorObj.product.apiData['filter'](p => {
                    return p.item_id == 13;
                });

                if (productQuickShip.length > 0) {
                    qpbProduct = productQuickShip[0];
                }
            }
        } catch (r) {
            //swallow
        }

        for (var i = 0; i < resObj.cart.length; i++) {
            if (resObj.QPB === true) {
                resObj.cart[i].product.product.QPB = true;
                if (qpbProduct) {
                    resObj.cart[i].product.product = qpbProduct;
                }
            }

            if (resObj.cart[i].windows && resObj.cart[i].windows.placement == null) {
                resObj.cart[i].windows.placement = '';
            }
 
             if (resObj.cart[i].isEPA) {
                resObj.cart[i].additional.items[0].isSelected = true;
            }
        }



        let gdoObj = this.app.gdoFlowSession;
        // if (this.app.utilities.isGDO) {
        //     gdoObj.cart[0].additional.items = this.app.gdoOpenerAccessories;
        // }

        let Obj = this.app.utilities.isGDO === true ? gdoObj : resObj;

        // let price = ;
        try {
            if (window['CheckOut']) {
                var ttt = window['CheckOut'](price, 0, 0, price, Obj);

            }
        } catch (r) {
            //swallow
        }

    }

}
