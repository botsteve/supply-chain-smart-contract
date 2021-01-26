import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAssetComponent } from './create-asset/create-asset.component';
import { DeleteAssetComponent } from './delete-asset/delete-asset.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search-all/search.component';
import { SearchSingleComponent } from './search-single/search-single.component';
import { UpdateComponent } from './update/update.component';

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
