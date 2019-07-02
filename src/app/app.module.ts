import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app.routing";
import { HomeComponent } from "./home";
import { LoginComponent } from "./login";
import { AlertComponent } from "./_components";
import {
  ErrorInterceptorProvider,
  FakeBackendProvider,
  JWTInterceptorProvider
} from "./_helpers";

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  declarations: [AppComponent, HomeComponent, LoginComponent, AlertComponent],
  providers: [
    JWTInterceptorProvider,
    ErrorInterceptorProvider,
    FakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
