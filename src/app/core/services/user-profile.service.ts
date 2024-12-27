import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { UserProfile } from "../models/userprofile.model";
import { PouchDBService } from "./pouchdb.service";
import { JwtService } from "./jwt.service";
import { Observable } from "rxjs/internal/Observable";

@Injectable({
  providedIn: "root"
})
export class UserProfileService {
  private currentUserSubject = new BehaviorSubject<UserProfile | null>(null);

  constructor(
    private readonly dbService: PouchDBService,
    private readonly jwtService: JwtService
  ) {}

  public register(credentials: {
    name: string,
    email: string,
  }): boolean {
    let newUser = new UserProfile(credentials.name, credentials.email);
    return this.dbService.put(newUser);
  }

  public async login(authToken: string) {
    let user: UserProfile | null = await this.dbService.getById(authToken);
    console.log(user);
    this.setAuth(user);
  }

  public logout(): void {
    this.purgeAuth();
  }

  public getCurrentUser(): Observable<UserProfile | null> {
    return this.currentUserSubject.asObservable();
  }

  private setAuth(user: UserProfile | null): void {
    if (user == null) {
      console.log("Login user is null");
      return;
    }
    this.jwtService.saveToken(user!._id);
    this.currentUserSubject.next(user);
  }

  private purgeAuth(): void {
    this.jwtService.destroyToken();
    this.currentUserSubject.next(null);
  }
}
