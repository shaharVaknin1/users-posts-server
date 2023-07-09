import mysql from "mysql2";
import config from "config";

const dbConfig: mysql.ConnectionOptions = config.get("dbConfig");

const connection = mysql.createConnection(dbConfig);

export default connection;
