import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class JwtService {
  public getToken(): string {
    return window.localStorage["PodysseyToken"]
  }

  public saveToken(token: string): void {
    window.localStorage["PodysseyToken"] = token;
    console.log(window);
  }

  public destroyToken(): void {
    window.localStorage.removeItem("PodysseyToken");
  }
}
