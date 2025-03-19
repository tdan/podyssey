import { Component, EventEmitter, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { Router } from "@angular/router";

const modules = [
  MatButtonModule,
  MatIconModule,
  FormsModule,
  MatFormFieldModule,
  MatInputModule,
];

@Component({
  selector: "search-box",
  standalone: true,
  templateUrl: "./searchbox.component.html",
  styleUrl: "./searchbox.component.css",
  imports: [modules],
})
export class SearchBoxComponent {
  @Output() searchResults = new EventEmitter<any[]>();

  constructor(private router: Router) {}

  public onSearchButtonClicked(query: string) {
    this.router.navigate(
      ['/search'],
      { queryParams: { term: query }}
    );
  }
}
