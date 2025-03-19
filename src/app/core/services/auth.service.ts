import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { UserProfile } from "../models/userprofile.model";
import { PouchDBService } from "./pouchdb.service";
import { JwtService } from "./jwt.service";
import { distinctUntilChanged, map, shareReplay } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<UserProfile | null>(null);

  private currentUser =
    this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  public isAuthenticated: boolean = false;

  constructor(
    private readonly dbService: PouchDBService,
    private readonly jwtService: JwtService,
  ) {}

  public register(credentials: {
    name: string,
    email: string,
  }): boolean {

    // this.dbService.getUserByEmail(credentials.email).then((user) => {
    //   console.log(user);
    //   if (user != null) {
    //     console.log("User already exists. Please login");
    //     return;
    //   }
    // })
    // let newUser = new UserProfile(credentials.name, credentials.email);
    // return this.dbService.put(newUser);
    throw new Error("not implement yet");
  }

  public async login(authToken: string): Promise<boolean> {
    // let user = await this.dbService.getUserByAuthToken(authToken);
    // if (user == null || user.docs.length < 1)
    //   return false;
    // return this.setAuth(user);
    throw new Error("not implement yet");
  }

  public logout(): void {
    this.purgeAuth();
  }

  public getCurrentUser(): any {
    return this.currentUser.subscribe((user: UserProfile | null) => {
      return user;
    })
  }

  public isLogin(): boolean {
    return this.isAuthenticated;
  }

  private setAuth(user: UserProfile | null): boolean {
    if (user == null) {
      console.log("Login user is null");
      return false;
    }
    this.jwtService.saveToken(user!._id);
    this.currentUserSubject.next(user);
    this.isAuthenticated = true;

    return this.isAuthenticated;
  }

  private purgeAuth(): void {
    this.jwtService.destroyToken();
    this.currentUserSubject.next(null);
    this.isAuthenticated = false;
  }
}
