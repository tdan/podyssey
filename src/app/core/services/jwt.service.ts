import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class JwtService {
  public getToken(): string {
    return window.localStorage["AntennaWebToken"]
  }

  public saveToken(token: string): void {
    window.localStorage["AntennaWebToken"] = token;
    console.log(window);
  }

  public destroyToken(): void {
    window.localStorage.removeItem("AntennaWebToken");
  }
}
