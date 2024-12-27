import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { UserProfileService } from "./core/services/user-profile.service";
import { MatIconModule } from "@angular/material/icon";

const MatModules = [
  MatFormFieldModule,
  MatButtonModule,
  MatInputModule,
  MatIconModule,
]

@Component({
  selector: "user-login",
  standalone: true,
  templateUrl: "./user_login.component.html",
  styleUrl: "./user_register.component.css",
  imports: [MatModules,]
})
export class UserLoginComponent {
  constructor(private readonly userService: UserProfileService) {}

  public onLogin(id: string) {
    this.userService.login(id);
  }

  public onLogout() {
    this.userService.logout();
  }
}
