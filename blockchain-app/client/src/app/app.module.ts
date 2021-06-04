import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
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
import { NavComponent } from './nav/nav.component';
import { QueryAllComponent } from './query-all/query-all.component';
import { SearchAssetComponent } from './search-asset/search-asset.component';
import { UpdateAssetComponent } from './update-asset/update-asset.component';
import { SearchHistoryComponent } from './search-history/search-history.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateAssetComponent,
    DeleteAssetComponent,
    NavComponent,
    SearchAssetComponent,
    QueryAllComponent,
    UpdateAssetComponent,
    SearchHistoryComponent
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
    CardModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatStepperModule,
    MatProgressBarModule,
    MatSlideToggleModule
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
export class AppModule {}
