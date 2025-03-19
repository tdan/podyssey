import { Injectable } from "@angular/core";
import PouchDB from "pouchdb";
import { DBService } from "./db.service";
import { UserData, UserProfile } from "../models/userprofile.model";

@Injectable({
  providedIn: "root",
})
export class PouchDBService extends DBService{

  private db: PouchDB.Database;

  constructor() {
    super();
    this.db = new PouchDB("antenapod-web");
  }


  public async create(jsonObj: any): Promise<string> {
    let rev: string = "";

    console.log(jsonObj);
    try{
      let response = await this.db.post(jsonObj);
      rev = response.rev;
    } catch(error) {
      console.log("[PouchDB.create()]", error as Error);
    };

    return rev;
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


  public getByAuthToken(authToken: string): UserProfile {
      throw new Error("Method not implemented.");
  }


  public async getAll(): Promise<any> {
    let result = {};

    try {
      result = await this.db.allDocs({
        include_docs: true,
      });
    } catch(error) {
      console.log("[PouchDB.getAll()]", error as Error);
    }

    return result;
  }


  public async update(jsonObj: any): Promise<string> {
    let rev: string = "";

    try {
     let response = await this.db.put(jsonObj);
      rev = response.rev;
    } catch(error) {
      console.log("[LocalUser.update]", error as Error);
    };

    return rev;
  }


  public remove(id: string) {
    this.db.get(id).then(obj => {
      this.db.remove(obj);
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
