import { Injectable } from "@angular/core";
import PouchDB from "pouchdb";
import { DBService } from "./db.service";
import { UserProfile } from "../models/userprofile.model";

@Injectable({
  providedIn: "root",
})
export class PouchDBService extends DBService{
  getByAuthToken(authToken: string): UserProfile {
      throw new Error("Method not implemented.");
  }
  private db: PouchDB.Database;

  constructor() {
    super();
    this.db = new PouchDB("antenapod-web");
  }

  public put(jsonObj: any): boolean {
    let success: boolean = false;

    console.log(jsonObj);
    this.db.put(jsonObj).then( response => {
      success = true;
    }).catch(error => {
      console.log(error);
    });

    return success;
  }

  public async getById(id: string): Promise<UserProfile | null> {
    let obj = null;

    try{
      obj = await this.db.get(id);
    } catch(error) {
      console.log(error);
    }

    return obj;
  }

  public remove(id: string) {
    this.db.get(id).then(obj => {
      return this.db.remove(obj);
    }).catch(error => {
      console.log(error);
    })
  }

  public destroy(): boolean {
    let success: boolean = false;

    this.db.destroy().then(response => {
      success = response["ok"]; // return true
    }).catch(error => {
        console.log(error);
    });

    return success;
  }

}
