import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search-all/search.component';
import { SearchSingleComponent } from './search-single/search-single.component';
import { CreateAssetComponent } from './create-asset/create-asset.component';
import { UpdateComponent } from './update/update.component';
import { DeleteAssetComponent } from './delete-asset/delete-asset.component';

const routes: Routes = [
  { path: '',   redirectTo: '/home', pathMatch: 'full' }, // redirect to `home`
  { path: 'home', component: HomeComponent },
  { path: 'search-all', component: SearchComponent },
  { path: 'search-single', component: SearchSingleComponent },
  { path: 'create', component: CreateAssetComponent },
  { path: 'update', component: UpdateComponent },
  { path: 'delete', component: DeleteAssetComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
