import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ToastrModule } from 'ngx-toastr';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { FooterComponent } from './ulti/footer/footer.component';
import { NavbarComponent } from './ulti/navbar/navbar.component';
import { SidebarComponent } from './ulti/sidebar/sidebar.component';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { UserInfoComponent } from './admin/user-info/user-info.component';
import { ConfirmComponent } from './common/popup/confirm/confirm.component';
import { NotifyComponent } from './common/popup/notify/notify.component';
import { RegistrationComponent } from './admin/registration/registration.component';
import { HistoryUsersComponent } from './admin/history-users/history-users.component';
import { DocumentComponent } from './admin/document/document.component';
import { ViewRegisComponent } from './admin/view-regis/view-regis.component';
import { RegisFormComponent } from './ulti/regis-form/regis-form.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { ViewFilesComponent } from './admin/view-files/view-files.component';
import { PopupRegisComponent } from './admin/popup-regis/popup-regis.component';
import { PopupReplyComponent } from './admin/popup-reply/popup-reply.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateUserComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    AuthComponent,
    DashboardComponent,
    UserInfoComponent,
    ConfirmComponent,
    NotifyComponent,
    RegistrationComponent,
    HistoryUsersComponent,
    DocumentComponent,
    ViewRegisComponent,
    RegisFormComponent,
    ViewFilesComponent,
    PopupRegisComponent,
    PopupReplyComponent
  ],
  imports: [
    AppRoutingModule,
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
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
    NgxTrimDirectiveModule,
    NgxDocViewerModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    ConfirmComponent,
    NotifyComponent,
    PopupRegisComponent,
    PopupReplyComponent
  ]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
