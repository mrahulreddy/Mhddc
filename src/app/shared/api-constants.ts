import {Injectable} from '@angular/core';
import { environment } from './../../environments/environment';

@Injectable()
export class ApiConstants {
    constants = {
        url: 'http://test-mhddcapi.clopay.com/api/'
    };

    constructor(){
        if (environment.api) {
            this.constants.url = environment.api;
        }
    }
    // text = {
    //     'Door work manually': 'Does your current door work manually without a garage door opener attached?',
    //     'Outlet in the ceiling': "Is there an outlet in the celing approx. 10' back-center of the door or within 3' of where the opener powerhead will be installed?",
    //     'yyyy miles from store (xxxx)': 'Is this job site within 30 drive miles of this store?'
    // }
}