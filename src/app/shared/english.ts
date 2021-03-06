import {Injectable} from '@angular/core';
declare var _: any;

@Injectable()
export class LangEnglishService {
    getLang() {
        return ENG;
    }
    getBanner() {
        return this.getData('banner');
    }

    getzipResults() {
        return this.getData('zipResults');
    }
    getTrending() {
        return this.getData('trendingNow');

    }
    getCategory() {
        return this.getData('category');
    }
    getDoorSize() {
        return this.getData('doorSize');
    }
    getData(itm) {
        let data = _.get(ENG, itm);
        return data[0];
    }
}

const ENG =
    {
        "language": "English",
        "banner": [{
            "title": "",
            "pageHeader": "",
            "placeholder": "Enter Zip Code",
            "zipcodeMessage": "Enter valid zipcode",
            "Go": "GO"
        }],
        "trendingNow": [{
            "title": "Trending Now",
            "pageHeader": ""
        }],
        "zipResults": [{
            "title": " ",
            "pageHeader": "Please select the store you would like to shop with",
            "ChangeZipCode": "Change zip code"
        }],
        "category": [{
            "title": " ",
            "header": "",
            "submit": "",
            "categoryOne": "Residential Garage Door",
            "categoryTwo": "Garage Door Opener",
            "categoryThree": "Service and Repair",
            "modal": {
                "modalContent": "You will now be directed to The Home Depot's Service and Repair site. From this site, you  can request a call from a service technician to assist you in service or repair",
                "Proceed": "Proceed to Service and Repair Site",
                "StayOnCurrentSite": "Stay on current site"
            }
        }],
        "doorSize": [{
            "title": " ",
            "pageHeader": "1 Select your door size",
            "submit": "",
            "singleDoor": {
                "singleDoorTitle": "Single Car Door",
                "singleDoorContent": "Door up to 10' wide"
            },
            "doubleDoor": {
                "doubleDoorTitle": "Double Car Door",
                "doubleDoorContent": "Door over 10’ wide"
            },
            "sizes": {
                "sizeTitle": " Know your exact door size ?",
                "sizeOption": "",
                "width": "Width",
                "height": "Height",
                "feet": "Feet",
                "inches": "Inches"
            },
            "sizeGuideLines": {
                "modalContent": "You will now be directed to The Home Depot's Service and Repair site. From this site, you  can request a call from a service technician to assist you in service or repair",
                "Proceed": "Proceed",
                "StayOnCurrentSite": "Stay on current site"
            },
            "floridaPopup": {
                "modalHeader": "",
                "modalContent": "You live in a high-wind area and are required to add 2\" to the width of your door <strong> if your opening exceeds 9'2\" wide. </strong>When entering width you MUST use the following formula (door width = opening width + 2\").",
                "confirm": "Check to confirm you understand this rule and will order your width accordingly",
                "enter": "Enter >"
            },
           
            }],

        "collections": [{
            "info": "INFO",
            "select": "SELECT",
            "TapToSeeQuickshipDoors": "TAP TO SEE QUICKSHIP DOORS",
            "videoUrls": {
                "classic": "http://url",
                "coachman": "http://url",
                "gallery": "http://url",
                "canyonRidge": "http://url",
                "specialty": "http://url"

            }
        }],
        "home": [{
            "pageHeader": "Choose Your Home",
            "stock": "Stock",
            "camera": "Camera",
            "gallery": "Gallery",
            "stockImages": {}
        }],
        "design": [{
            "pageHeader": "Choose Your Design"
        }],
        "details": [{
            "installed": "Installed",
            "DIY": "DIY",
            "Quantity": "Quantity",
            "details": "DETAILS"
        }],
        "config": [{
            "door": "Door",
            "home": "home"
        }],
        "construction": [{
            "pageHeader": "Choose Your Construction"
        }],
        "color": [{
            "pageHeader": "Choose Your Color"
        }],
        "topSection": [{
            "pageHeader": "Choose Your Top Section"
        }],
        "glassType": [{
            "pageHeader": "Choose Your Glass Tye"
        }],
        "lock": [{
            "pageHeader": "Choose Your Lock Tye"
        }],
        "install": [{
            "pageHeader": "",
            "size": "",
            "windCode": "",
            "collection": "",
            "doorDesign": "",
            "doorModel": "",
            "doorConstruction": "",
            "color": "",
            "topSection": {}
            ,
            "hardware": ""
        }]
        ,
        "opener": [{
            "pageHeader": "Choose Your Opener"
        }]
        ,
        "openerSelected": [{
            "pageHeader": "The Opener you Selected",
            "openerText": "",
            "chooseOpenerAccessories": "Choose Opener Accessories"
        }],
        "additionalOptions": [{
            "yes": "Yes",
            "no": "No",
            "accessories": {},
            "additionalQuestions": {}
        }],
        "doorConfiguration": [{
            "pageHeader": "Your Door Configuration",
            "share": "SHARE",
            "emailQuote": "EMAIL QUOTE",
            "doorModel": "Door Model",
            "size": "Size",
            "windCode": "WindCode",
            "doorDesign": "Door Design",
            "doorConstruction": "SHARE",
            "color": "Color",
            "topSection": "Top Section",
            "hardware": "Hardware",
            "opener": "Opener",
            "openerAccessories": "opener Accessories",
            "additionalOptions": "Additional Options",
            "quantity": "Quantity"

        }],
        "thankyou": [{
            "header": "THANK YOU",
            "pageHeader": "Would you use this tool to buy a Garage Door ?",
            "submit": "Submit",
            "options": {
                "veryUnlikely": "very Unlikely",
                "unlikely": "uUnlikely",
                "somewhatLikely": "SomeWhat Likely",
                " likely": "Likely",
                "veryLikely": "very Likely"
            }
        }],
        "footer": [{
            "prev": "PREV",
            "next": "NEXT",
            "addToCart": "ADD TO CART"
        }]
    };
