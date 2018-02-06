import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UtilService } from './shared/services/util.services';
import { TripService } from './shared/services/trip.services';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [TripService, UtilService]
})
export class AppComponent {
    constructor(private translate: TranslateService) {
        translate.addLangs(['en', 'fr', 'ur', 'es']);
        translate.setDefaultLang('en');
        const browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/en|fr|ur|es/) ? browserLang : 'en');
    }
}
