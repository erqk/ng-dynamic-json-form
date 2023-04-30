import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MarkdownModule } from 'ngx-markdown';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentWrapperComponent } from './shared/content-wrapper/content-wrapper.component';
import { SideNavigationPaneComponent } from './shared/side-navigation-pane/side-navigation-pane.component';
import { TabBarComponent } from './shared/tab-bar/tab-bar.component';

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
    SideNavigationPaneComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
