import { Injectable } from "@angular/core";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
import "rxjs/add/operator/toPromise";

@Injectable()
export class CreateTables {
  constructor(public sqlite: SQLite) {}

  createInitialSurveyTable() {
    return this.sqlite.create({
      name: "parinaam.db",
      location: "default"
    });
  }
}
