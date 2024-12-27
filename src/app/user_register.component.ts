import { Component } from "@angular/core";
import { UserProfileService } from "./core/services/user-profile.service";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";

const MatModules = [
  MatFormFieldModule,
  MatButtonModule,
  MatInputModule,
  MatIconModule
];

@Component({
  selector: "user-register",
  standalone: true,
  templateUrl: "./user_register.component.html",
  styleUrl: "./user_register.component.css",
  imports: [MatModules,],
})
export class UserRegisterComponent {
  constructor(private readonly userService: UserProfileService) {}

  public onRegister(name: string, email: string): void {
    this.userService.register({name, email});
  }
}
