import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MarkdownModule } from 'ngx-markdown';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TabBarComponent } from './shared/tab-bar/tab-bar.component';
import { ContentWrapperComponent } from './shared/content-wrapper/content-wrapper.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MarkdownModule.forRoot({ loader: HttpClient }),
    TabBarComponent,
    ContentWrapperComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
