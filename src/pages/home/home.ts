import { Component } from "@angular/core";
import { NavController, Platform } from "ionic-angular";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
import { Network } from "@ionic-native/network";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  online: boolean = false;
  constructor(
    public navCtrl: NavController,
    private sqlite: SQLite,
    public platform: Platform,
    public network: Network
  ) {
    this.platform.ready().then(readySource => {
      let type = this.network.type;
      console.log("Connection type: ", this.network.type);
      // Try and find out the current online status of the device
      if (type == "unknown" || type == "none" || type == undefined) {
        console.log("The device is not online");
        this.online = false;
      } else {
        console.log("The device is online!");
        this.online = true;
      }

      let disconnectSub = network.onDisconnect().subscribe(() => {
        console.log("you are offline");
        this.online = false;
      });

      let connectSub = network.onConnect().subscribe(() => {
        console.log("you are online");
        this.online = true;
      });

      this.sqlite
        .create({
          name: "parinaam.db",
          location: "default"
        })
        .then((db: SQLiteObject) => {
          db
            .executeSql(
              "CREATE TABLE IF NOT EXISTS initial_survey(initial_survey_id INTEGER PRIMARY KEY AUTOINCREMENT, area_name TEXT, area_landmark TEXT, area_location TEXT, is_default INT, Is_deleted INT, created_by TEXT, date_created TEXT, modified_by TEXT, date_modified TEXT, no_of_families TEXT, background_native_region TEXT, main_language_spoken TEXT, no_of_year_residents TEXT, most_common_livelihood TEXT, most_common_livelihood_others TEXT, access_electricity TEXT, access_running_water TEXT, shelter_type TEXT, housing_type TEXT, sanitation_facilities TEXT, utilities_house TEXT, permanancy_residence TEXT, children_attend_school TEXT, ngo_working_community TEXT, ngo_name TEXT, mfi_working_community TEXT, mfi_name TEXT, medical_facilities TEXT, presence_of_ward TEXT, political_instability TEXT, near_ujjivan_branch TEXT, presence_fraud_illegal TEXT)",
              {}
            )
            .then(res => console.log("Executed SQL"))
            .catch(e => console.log(e));

          db
            .executeSql(
              "INSERT INTO initial_survey VALUES(null,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
              [
                "sd",
                "vdfv",
                "fv",
                "dvdv",
                "dvdfd",
                "sd",
                "vdfv",
                "fv",
                "dvdv",
                "dvdfd",
                "sd",
                "vdfv",
                "fv",
                "dvdv",
                "dvdfd",
                "sd",
                "vdfv",
                "fv",
                "dvdv",
                "dvdfd",
                "sd",
                "vaaaaaaaaaaaaaaaaaaaadfv",
                "fv",
                "dvdv",
                "dvdfd",
                "sd",
                "vdfv",
                "fv",
                "dvdv",
                "dvdfd",
                "dvdfs",
                "dfbvv"
              ]
            )
            .then(res => {
              console.log("Insert", res);
              if (res.rowsAffected > 0) {
                console.log(res.insertId);
              } else {
                console.log("Reeor", res.insertId);
              }
            })
            .catch(e => {
              console.log(e);
            });

          db
            .executeSql(
              "SELECT * FROM initial_survey ORDER BY initial_survey_id DESC",
              {}
            )
            .then(res => {
              console.log(res.rows);
            })
            .catch(e => console.log(e));

          db
            .executeSql(
              "UPDATE initial_survey SET area_name=?, area_landmark=?, area_location=? WHERE initial_survey_id=3",
              ["Prakash", "Jaya", "Jayaprakash"]
            )
            .then(res => {
              console.log(res);
            })
            .catch(e => {
              console.log(e);
            });

          db
            .executeSql(
              "SELECT * FROM initial_survey ORDER BY initial_survey_id DESC",
              {}
            )
            .then(res => {
              console.log(res.rows);
              for (var i = 0; i < res.rows.length; i++) {
                console.log(res.rows.item(i).area_name);
              }
            })
            .catch(e => console.log(e));

          db
            .executeSql(
              "SELECT area_name, area_landmark, area_location FROM initial_survey WHERE initial_survey_id=?",
              [1]
            )
            .then(res => {
              console.log(res.rows);
              console.log(res.rows.item(0).area_name);
            })
            .catch(e => {
              console.log(e);
            });
        })
        .catch(e => console.log(e));
    });
  }
}
