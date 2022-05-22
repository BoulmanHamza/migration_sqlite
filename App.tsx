import React, { FC, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { initialize } from './sqlite_migration_conf/global';
import { DowngradeError } from './sqlite_migration_conf/sqLiteClient';
import styles from './sqlite_migration_conf/styles';
import  sqlite, {SQLiteDatabase} from 'react-native-sqlite-storage';
// const sqlite=require('react-native-sqlite-storage')

const db=sqlite.openDatabase({name:"agrisud.db",createFromLocation:1},()=>{
    console.log("opened");
    db.executeSql('CREATE TABLE IF NOT EXISTS users(user_id INTEGER PRIMARY KEY NOT NULL,prenom VARCHAR(40), name VARCHAR(30))',[])
    db.executeSql('INSERT INTO users (user_id,prenom,name) VALUES (1,"hahahaha","hamza")',[])
    db.executeSql('INSERT INTO users (user_id,prenom,name) VALUES (2,"hahhaha","hamza2")',[])
    db.executeSql('SELECT * FROM users', [], function(tx, res) {
      console.log("teetetette")
      console.log("zx"+res.rows.item(0))
      for (let i = 0; i < res.rows.length; ++i) {
        console.log("sdgfsdfsss")
        console.log('item:', res.rows.item(i).name)
        // setTest(res.rows.item(i).Name)
      }
    })
    console.log("fin")
},(err)=>{
  console.log("Error : "+err)
})

const App: FC = () => {
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(false);
  // const [errorMessage, setErrorMessage] = useState('');
  // useEffect(() => {
  //   const execute = async (): Promise<void> => {
  //     try {
  //       await initialize();

  //     } catch (err) {
  //       if (err instanceof DowngradeError) {
  //         setErrorMessage('Downgrade error');
  //       } else {
  //         setErrorMessage('Unexpected error');
  //       }
  //       setError(true);
  //     }
  //     setLoading(false);
  //   };
  //   execute();
  // });

  // if (loading) {
  //   return (
  //     <View style={styles.container}>
  //       <Text>Initializing application....</Text>
  //     </View>
  //   );
  // }
  // if (error) {
  //   return (
  //     <View style={styles.container}>
  //       <Text>{`Error: ${errorMessage}`}</Text>
  //     </View>
  //   );
  // }

   const [test, setTest]=useState("")
   useEffect(() => {
     setTest("hsmxs")

      // async (dB: SQLiteDatabase): Promise<void> => {
      //   console.log("global ssssss")
      //   // USE dB TO CREATE TABLES
      //   // dB.executeSql('DROP TABLE IF EXISTS Users')
      //   // dB.executeSql('CREATE TABLE IF NOT EXISTS Users(user_id INTEGER PRIMARY KEY NOT NULL,prenom VARCHAR(40), name VARCHAR(30))',[])
      //   // dB.executeSql('INSERT INTO Users (user_id,prenom,name) VALUES (1,"hahahaha","hamza")',[])
      //   // dB.executeSql('INSERT INTO Users (user_id,prenom,name) VALUES (2,"hahhaha","hamza2")',[])
      //   console.log("global ssssss22222")
      //   dB.executeSql('SELECT * FROM personne', [], function(tx, res) {
      //   for (let i = 0; i < res.rows.length; ++i) {
      //     console.log('item:', res.rows.item(i).Name)
      //     setTest(res.rows.item(i).Name)
      //   }
      // })
      // dB.executeSql('CREATE TABLE IF NOT EXISTS livre(user_id INTEGER PRIMARY KEY NOT NULL,prenom VARCHAR(40), name VARCHAR(30))',[])
    
    // }




      // db.transaction((tx: { executeSql: (arg0: string, arg1: never[], arg2: (tx: any, results: any) => void) => void; })=>{
      //   tx.executeSql("SELECT * FROM personne WHERE id=1",[],(tx,results)=>{
      //     let len=results.rows.length;
      //     if(len>0){
      //       let row =results.rows.item(0)
      //       setTest(row)
      //       console.log("in if")
      //     }
      //     console.log("not in if")
      //   })
      // })
   });
   




  return (
    <View style={styles.container}>
      <Text>{"hhhhhhhhhhhhhh  "+test}</Text>
    </View>
  );
};

/* Application entry component */
export default App;