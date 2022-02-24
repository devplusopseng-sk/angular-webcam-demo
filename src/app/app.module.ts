import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';

import { WebcamModule } from 'ngx-webcam';

import { WebcamDemoComponent, WebcamDialogComponent } from './pages/webcam-demo/webcam-demo.component';

@NgModule({
  declarations: [
    AppComponent,
    WebcamDemoComponent,
    WebcamDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    WebcamModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [WebcamDialogComponent]
})
export class AppModule { }
