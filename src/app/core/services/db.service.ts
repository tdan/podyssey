import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export abstract class DBService {
  constructor() {}
  public abstract put(obj: any): boolean;
  public abstract getById(id: string): any;
  public abstract remove(id: string): any;
  public abstract destroy(): boolean;
}
