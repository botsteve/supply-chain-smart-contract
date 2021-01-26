import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DataViewModule } from 'primeng/dataview';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { OrderListModule } from 'primeng/orderlist';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';
import { ToastModule } from 'primeng/toast';
import { NetworkService } from './api/network.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateAssetComponent } from './create-asset/create-asset.component';
import { DeleteAssetComponent } from './delete-asset/delete-asset.component';
import { HomeComponent } from './home/home.component';
import { HttpErrorInterceptor } from './http-error.interceptor';
import { SearchComponent } from './search-all/search.component';
import { SearchSingleComponent } from './search-single/search-single.component';
import { UpdateComponent } from './update/update.component';

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
