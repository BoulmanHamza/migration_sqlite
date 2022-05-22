import { SQLiteDatabase } from 'react-native-sqlite-storage';
import SQLiteClient from './sqLiteClient';


const DB_NAME = 'agrisud.db';
const DB_DEBUG = true;
const DB_MIGRATIONS = [
  async (dB: SQLiteDatabase): Promise<void> => {
    console.log("global ssssss")
    // USE dB TO CREATE TABLES
    // dB.executeSql('DROP TABLE IF EXISTS Users')
    dB.executeSql('CREATE TABLE IF NOT EXISTS Users(user_id INTEGER PRIMARY KEY NOT NULL,prenom VARCHAR(40), name VARCHAR(30))',[])
    dB.executeSql('INSERT INTO Users (user_id,prenom,name) VALUES (1,"hahahaha","hamza")',[])
    dB.executeSql('INSERT INTO Users (user_id,prenom,name) VALUES (2,"hahhaha","hamza2")',[])
    console.log("global ssssss22222")
    dB.executeSql('SELECT * FROM `users`', [], function(tx, res) {
    for (let i = 0; i < res.rows.length; ++i) {
      console.log('item:', res.rows.item(i).Name)
    }
  })
  dB.executeSql('CREATE TABLE IF NOT EXISTS livre(user_id INTEGER PRIMARY KEY NOT NULL,prenom VARCHAR(40), name VARCHAR(30))',[])

},
];


/** Application's SQLite client */
export const sqLiteClient = new SQLiteClient(DB_NAME, DB_MIGRATIONS, DB_DEBUG);

/** Applicaiton initialization. */
export const initialize = async (): Promise<void> => {
  await sqLiteClient.connect();
};