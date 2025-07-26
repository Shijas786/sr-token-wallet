import { Routes } from '@angular/router';
import { ConnectWalletComponent } from './components/connect-wallet/connect-wallet.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SendTokenComponent } from './components/send-token/send-token.component';
import { ReceiveTokenComponent } from './components/receive-token/receive-token.component';

export const routes: Routes = [
  { path: '', redirectTo: '/connect', pathMatch: 'full' },
  { path: 'connect', component: ConnectWalletComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'send', component: SendTokenComponent },
  { path: 'receive', component: ReceiveTokenComponent },
  { path: '**', redirectTo: '/connect' }
];
