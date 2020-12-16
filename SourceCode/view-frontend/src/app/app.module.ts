import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ToastrModule } from 'ngx-toastr';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { ConfirmPopupComponent } from './common/confirm-popup/confirm-popup.component';
import { NotiPopupComponent } from './common/noti-popup/noti-popup.component';
import { UppercaseDirective } from './common/ulti/stringUppercase/upper.directive';
import { LoginComponent } from './login/login.component';
import { CreateUserComponent } from './view/create-user/create-user.component';
import { FooterComponent } from './view/footer/footer.component';
import { HeaderComponent } from './view/header/header.component';
import { RegisEditPopupComponent } from './view/regis-edit-popup/regis-edit-popup.component';
import { RegisEditComponent } from './view/regis-edit/regis-edit.component';
import { RegisHistoryComponent } from './view/regis-history/regis-history.component';
import { RegisIndexComponent } from './view/regis-index/regis-index.component';
import { UserInfoComponent } from './view/user-info/user-info.component';
import { PopupRegisComponent } from './view/popup-regis/popup-regis.component';
import { PopupInfoComponent } from './view/popup-info/popup-info.component';
import { RegisViewComponent } from './view/regis-view/regis-view.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AuthComponent,
    RegisIndexComponent,
    HeaderComponent,
    FooterComponent,
    CreateUserComponent,
    RegisEditComponent,
    UppercaseDirective,
    UserInfoComponent,
    ConfirmPopupComponent,
    NotiPopupComponent,
    RegisEditPopupComponent,
    RegisHistoryComponent,
    PopupRegisComponent,
    PopupInfoComponent,
    RegisViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule,
    NgxTrimDirectiveModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    ConfirmPopupComponent,
    UserInfoComponent,
    NotiPopupComponent,
    RegisEditPopupComponent,
    RegisHistoryComponent,
    PopupRegisComponent,
    PopupInfoComponent
  ]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
