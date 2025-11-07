import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ExploreComponent } from './pages/explore/explore.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { MissionsComponent } from './pages/missions/missions.component';
import { LearnComponent } from './pages/learn/learn.component';
import { ShopComponent } from './pages/shop/shop.component';
import { ContactComponent } from './pages/contact/contact.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { OrderManagementComponent } from './components/order-management/order-management.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'explore', component: ExploreComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'missions', component: MissionsComponent },
  { path: 'learn', component: LearnComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'users', component: UserListComponent },
  { path: 'orders', component: OrderManagementComponent },
  { path: '**', redirectTo: '/home' }
];
