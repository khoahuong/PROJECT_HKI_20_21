import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { viLocale } from 'ngx-bootstrap/locale';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'admin-frontend';

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
    isAnimated: true,
    showWeekNumbers: false
  });
}
