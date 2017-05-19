import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AppComponent} from "../app.component";
import {AppUtilities} from "../shared/appUtilities";
import {NavService} from "../nav/nav-service";
import {CollectionData} from "../collection/collection-data";
import {CollectionService} from "../shared/data.service";
import {GdoConfigComponent} from "../gdo-config/gdo-config.component";
declare var $:any;
declare var _:any;

@Component({
    selector: 'app-additional-options',
    templateUrl: './additional-options.component.html',
    styleUrls: ['./additional-options.component.less']
})
export class AdditionalOptionsComponent implements OnInit {
    pageNo;
    showMenu;
    data;
    questions;
    gdoFlow = this.utils.utilities.isGDO;
    distance:any;
    distancePrice;
    showDistancePrice;
    directFlow = this.utils.utilities.directFlow;
    singleDrop = false;
    doubleDrop = false;
    gdoOpenerSelected = this.dataStore.gdoOpenerAccessories;

    t = _.sumBy(this.gdoOpenerSelected, function (o) {
        return o.price * o.count
    });

    // for gdo the pageNo will be 3
    // for residential the pageNo will be

    constructor(private appComponent:AppComponent
        , private utils:AppUtilities
        , private route:Router
        , private navComp:NavService
        , private dataStore:CollectionData
        , private dataService:CollectionService
        , private gdoConfig:GdoConfigComponent) {
    }

    ngOnInit() {
        this.appComponent.next = 'Next';
        this.pageNo = this.utils.utilities.currPage;
        this.showMenu = this.utils.utilities.showNav;
        this.navComp.activateIcon();
        if (this.utils.utilities.directFlow) {
            this.data = this.dataStore.gdoAdditionalDirect;
            this.gdoConfig.itemPrice = this.data.item_price;
            this.gdoConfig.itmPrice = this.data.item_price;
            this.utils.utilities.item_price = this.data.item_price;
            this.utils.utilities.itmPrice = this.data.item_price;
            $('.inner-router').css({'margin-top': 0});
        } else {
            this.gdoConfig.itemPrice = this.utils.utilities.item_price + this.utils.utilities.distancePrice + this.t;
        }

    }

    nextBtn(path) {
        if (this.utils.utilities.flow === 'gdoNavElems') {
            this.utils.setUtils(4, 1);
            this.goTo('/gdoConfig' + path)
        } else {
            this.goTo('/config' + path)
        }
    }

    prevBtn(path) {
        if (this.utils.utilities.flow === 'gdoNavElems') {
            this.utils.setUtils(2, 0);
            this.goTo('/gdoConfig' + path);
        } else {
            this.goTo('/config' + path)
        }
    }

    goTo(path) {
        this.route.navigateByUrl(path)
    }

    showDistance(itm, flow) {
        if (itm.srcElement.checked === false) {
            this.distance = 31;
            this.utils.utilities.distance = 31;
            if (flow === 'direct') {
                this.utils.utilities.distancePrice = 2.5;
                this.distancePrice = 2.5;
                this.gdoConfig.itemPrice = this.utils.utilities.item_price + 2.50;
            }
            else {
                this.utils.utilities.distancePrice = 51;
                this.distancePrice = 51;
                this.gdoConfig.itemPrice = this.utils.utilities.item_price + 3;
            }
            this.showDistancePrice = false;
        } else {
            this.distance = '';
            this.showDistancePrice = false;
            this.gdoConfig.itemPrice = this.utils.utilities.item_price;
        }
    }

    singleOpener;
    doubleOpener;

    showSingle(itm) {
        if (itm.srcElement.checked === true) {
            this.singleDrop = true;
            this.gdoConfig.itemPrice = this.calculatePrice(this.gdoConfig.itemPrice, 50)
        } else {
            this.singleDrop = false;
            this.gdoConfig.itemPrice = this.calculatePrice(this.utils.utilities.item_price, 0)
        }
    }

    showDouble(itm) {
        if (itm.srcElement.checked === true) {
            this.doubleDrop = true;
            this.gdoConfig.itemPrice = this.calculatePrice(this.utils.utilities.item_price, 65)
        } else {
            this.doubleDrop = false;
            this.gdoConfig.itemPrice = this.calculatePrice(this.utils.utilities.item_price, 0)
        }
    }

    directDoor(event, flow) {
        let val = +event.target.value;
        let k = flow;
        if (flow === 0) {
            k = {
                name: "Single Door New Opener Installation Kit. This is required when no Opener is currently installed on door less than 10' wide.",
                price: 50 * val,
                count: val
            };
            this.utils.utilities.gdoSingleDoor = k.price;
        } else {
            k = {
                name: "Double Door New Opener Installation Kit. This is required when no Opener is currently installed on door less than 10' wide.",
                price: 65 * val,
                count: val
            };
            this.utils.utilities.gdoDoubleDoor = k.price;
        }
        // this.gdoConfig.itemPrice += k.price;
        this.dataStore.gdoDirectQuestions.splice(flow, 1);
        this.dataStore.gdoDirectQuestions.push(k);
        let kPrice = _.sumBy(this.dataStore.gdoDirectQuestions, function (o) {
            return o.price;
        });
        this.gdoConfig.itemPrice = this.calculatePrice(kPrice, this.utils.utilities.item_price);
        // this.localPrice = this.gdoConfig.itemPrice + kPrice;
    }

    singleDropVal;
    doubleDropVal;

    calculatePrice(amt, itmPrice) {
        if (this.singleDrop) {
            return itmPrice + amt;
        }
        if (this.singleDrop && this.doubleDrop) {
            return itmPrice + amt;
        }
        if (this.doubleDrop) {
            return itmPrice + amt;
        }
    }

    updateDistance(itm, flow) {
        this.utils.utilities.distance = +itm.target.value;

        let miles = +itm.target.value;
        if (flow === 'direct') {
            let k = miles - 31;
            if (k >= 0) {
                this.distancePrice = (k * 2.50) + 2.50;
                this.gdoConfig.itemPrice = this.utils.utilities.item_price + this.distancePrice;
            }
            else {
                this.distancePrice = 0;
                this.gdoConfig.itemPrice = this.utils.utilities.item_price;
            }
        } else {
            let k = miles - 50;

            if (k >= 0) {
                this.distancePrice = (k * 3) + 50;
                this.gdoConfig.itemPrice = this.utils.utilities.item_price + this.distancePrice;
                this.utils.utilities.distancePrice = this.distancePrice;
            } else {
                this.distancePrice = 0;
                this.gdoConfig.itemPrice = this.utils.utilities.item_price;
            }
        }
        this.utils.utilities.distancePrice = this.distancePrice;
    }

}
