import  SQLite,{SQLiteDatabase} from 'react-native-sqlite-storage';

type Migration = (db: SQLiteDatabase) => Promise<void>;

SQLite.enablePromise(true);

/** Database downgrade error */
export class DowngradeError extends Error {
  constructor() {
    super();
    this.name = 'DowngradeError';
  }
}

/** Interface to SQLiteClient client. */
export default class SQLiteClient {
  private privateConnected = false;

  private name: string;

  private migrations: Migration[];

  private privateDb: SQLiteDatabase | null = null;

  constructor(name: string, migrations: Migration[], debug?: boolean) {
    this.name = name;
    this.migrations = migrations;
    if (debug === true) {
      SQLite.DEBUG(debug);
    }
  }

  public get connected(): boolean {
    return this.privateConnected;
  }

  public get dB(): SQLiteDatabase | null {
    return this.privateDb;
  }

  public async connect(): Promise<void> {
    if (this.privateConnected) {
      return;
    }
    try {
      console.log("1")
      console.log(this.privateDb)
      console.log(this.name)
      this.privateDb = await SQLite.openDatabase({ name: this.name, createFromLocation:2 ,location: 'default'});
      console.log("211")
      // MIGRATIONS
      const resultSet = await this.privateDb.executeSql('PRAGMA user_version');
      console.log("211")
      const version: number = resultSet[0].rows.item(0).user_version;
      console.log("211")
      const nextVersion = this.migrations.length;
      console.log("3")
      if (version > nextVersion) {
        console.log("4")
        throw new DowngradeError();
      }
      console.log("6")
      for (let i = version; i < nextVersion; i += 1) {
        const migration = this.migrations[i];
        // eslint-disable-next-line
        await migration(this.privateDb);
      }
      console.log("7")
      if (version !== nextVersion) {
        console.log("8")
        await this.privateDb.executeSql(`PRAGMA user_version = ${nextVersion}`);
        console.log("9")  
    }
    console.log("10")
      this.privateConnected = true;
    } catch (err) {
        console.log("11")
        console.log(err)
      if (err instanceof DowngradeError) {
        
        throw err;
      }
      throw new Error(`SQLiteClient: failed to connect to database: ${this.name}`);
    }
  }
}