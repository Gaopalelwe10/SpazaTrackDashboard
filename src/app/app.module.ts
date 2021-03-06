import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SpazatableComponent } from './components/spazatable/spazatable.component';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatInputModule, MatSelectModule, MatRadioModule, MatCardModule, MatGridListModule, MatRippleModule, MatSlideToggleModule, MatDialogModule, MatTooltipModule } from '@angular/material';
import { UsertableComponent } from './components/usertable/usertable.component';
import { MenuComponent } from './menu/menu.component';
import { LayoutModule } from '@angular/cdk/layout';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { AngularFireModule } from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { HttpClientModule } from '@angular/common/http';
import { MapComponent } from './components/map/map.component';
import { LinechatComponent } from './components/linechat/linechat.component';
import { HomeComponent } from './components/home/home.component';
import { SpazalinechartComponent } from './components/spazalinechart/spazalinechart.component';
import { SpazaDialogComponent } from './components/spaza-dialog/spaza-dialog.component';
import { CommentDialogComponent } from './components/comment-dialog/comment-dialog.component';
import { UserpieChartComponent } from './components/userpie-chart/userpie-chart.component';
import { SpazaupdateDialogComponent } from './components/spazaupdate-dialog/spazaupdate-dialog.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { UserupdateDialogComponent } from './components/userupdate-dialog/userupdate-dialog.component';
import { ProductDialogComponent } from './components/product-dialog/product-dialog.component';

const firebaseConfig = {
  apiKey: "AIzaSyDMJCzNKJe3XDsfEdAPYnEAZWdsva0dTFU",
  authDomain: "spazatrack.firebaseapp.com",
  databaseURL: "https://spazatrack.firebaseio.com",
  projectId: "spazatrack",
  storageBucket: "spazatrack.appspot.com",
  messagingSenderId: "822494409282",
  appId: "1:822494409282:web:3ce7dc82682553cdcb33db"
};

@NgModule({
  declarations: [
    AppComponent,
    SpazatableComponent,
    UsertableComponent,
    MenuComponent,
    LoginComponent,
    RegisterComponent,
    MapComponent,
    LinechatComponent,
    HomeComponent,
    SpazalinechartComponent,
    SpazaDialogComponent,
    CommentDialogComponent,
    UserpieChartComponent,
    SpazaupdateDialogComponent,
    PieChartComponent,
    UserupdateDialogComponent,
    ProductDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatRippleModule,
    MatSlideToggleModule,
  
    MatDialogModule,
    MatTooltipModule
  ],
  providers: [
   
  ],
  bootstrap: [AppComponent],
  entryComponents:[
    SpazaDialogComponent,
    CommentDialogComponent,
    SpazaupdateDialogComponent,
    UserupdateDialogComponent,
    ProductDialogComponent
   ]
})
export class AppModule { }
