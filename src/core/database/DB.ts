import * as mongodb from "mongodb";
import * as config from "config";

export class DB {
    public static dbDriver = mongodb;
    public static db: mongodb.Db;

    public static async init(): Promise<boolean> {
        DB.db = await DB.dbDriver.MongoClient.connect("mongodb://" + config.get("mongoDbSettings.dbUser") + ":" + config.get("mongoDbSettings.dbPassword") + "@" + config.get("mongoDbSettings.dbHost"));
        DB.db.collection("tags").createIndex({geoJSON: "2dsphere"});
        DB.db.collection("users").createIndex({geoJSON: "2dsphere"});
        return true;
    }
}
