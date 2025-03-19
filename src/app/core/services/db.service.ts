import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export abstract class DBService {
  constructor() {}
  public abstract create(jsonObj: any): Promise<string>;
  public abstract getById(id: string): any;
  public abstract getAll(): Promise<any>;
  public abstract update(jsonObj: any): Promise<string>;
  public abstract remove(id: string);
  public abstract destroy(): boolean;
}
