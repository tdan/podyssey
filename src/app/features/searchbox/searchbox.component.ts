import { Component, EventEmitter, Output } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "search-box",
    templateUrl: "./searchbox.component.html",
    styleUrl: "./searchbox.component.css",
    imports: []
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
