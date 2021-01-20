import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { HomeComponent } from './home/home.component';
import { OrderListModule } from 'primeng/orderlist';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NetworkService } from './api/network.service';
import { MenubarModule } from 'primeng/menubar';
import { SearchComponent } from './search-all/search.component';
import { SearchSingleComponent } from './search-single/search-single.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { HttpErrorInterceptor } from './http-error.interceptor';
import { CreateAssetComponent } from './create-asset/create-asset.component';
import { DataViewModule } from 'primeng/dataview';
import { CardModule } from 'primeng/card';
import { UpdateComponent } from './update/update.component';
import { DeleteAssetComponent } from './delete-asset/delete-asset.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    HomeComponent,
    SearchSingleComponent,
    CreateAssetComponent,
    UpdateComponent,
    DeleteAssetComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    MessageModule,
    MessagesModule,
    ButtonModule,
    ToastModule,
    TableModule,
    FormsModule,
    AppRoutingModule,
    TabMenuModule,
    OrderListModule,
    HttpClientModule,
    MenubarModule,
    InputTextModule,
    DataViewModule,
    CardModule
  ],
  providers: [
    NetworkService,
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
