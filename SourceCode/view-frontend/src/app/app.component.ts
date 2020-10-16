import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BsLocaleService, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { viLocale } from 'ngx-bootstrap/locale';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'view-frontend';

  constructor(
    private translate: TranslateService,
    localeService: BsLocaleService
  ) {
    translate.setDefaultLang('vi');

    defineLocale('vi', viLocale);
    localeService.use('vi');
  }
}

export function getDatepickerConfig(): BsDatepickerConfig {
  return Object.assign(new BsDatepickerConfig(), {
    dateInputFormat: 'dd/MM/yyyy',
    isAnimated:true,
    showWeekNumbers: false
  });
}
