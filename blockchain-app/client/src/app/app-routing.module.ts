import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAssetComponent } from './create-asset/create-asset.component';
import { DeleteAssetComponent } from './delete-asset/delete-asset.component';
import { HomeComponent } from './home/home.component';
import { SearchAssetComponent } from './search-asset/search-asset.component';
import { QueryAllComponent } from './query-all/query-all.component';
import { UpdateAssetComponent } from './update-asset/update-asset.component';
import { SearchHistoryComponent } from './search-history/search-history.component';

const routes: Routes = [
  { path: '',   redirectTo: '/home', pathMatch: 'full' }, // redirect to `home`
  { path: 'home', component: HomeComponent },
  { path: 'search-all', component: QueryAllComponent },
  { path: 'search-asset', component: SearchAssetComponent },
  { path: 'search-history', component: SearchHistoryComponent },
  { path: 'create', component: CreateAssetComponent },
  { path: 'update', component: UpdateAssetComponent },
  { path: 'delete', component: DeleteAssetComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
