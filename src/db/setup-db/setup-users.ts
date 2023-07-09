import { APIUser } from "../../api/users/types";
import { fetchUsers } from "../../api/users/users";
import connection from "../connection";

export const createUsersTableAndInsertData = async () => {
  try {
    const tableExists = await checkTableExists("users");

    if (!tableExists) {
      const users = await fetchUsers();
      await createUsersTable();
      for (const user of users) {
        await insertUser(user);
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

const checkTableExists = tableName => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT COUNT(*) AS count
       FROM information_schema.tables
       WHERE table_schema = '${connection.config.database}'
       AND table_name = '${tableName}'`,
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          const tableExists = results[0].count === 1;
          resolve(tableExists);
        }
      }
    );
  });
};

const createUsersTable = () => {
  return new Promise((resolve, reject) => {
    const sql = `CREATE TABLE users (
      id INT PRIMARY KEY,
      name VARCHAR(255),
      username VARCHAR(255),
      email VARCHAR(255),
      street VARCHAR(255),
      suite VARCHAR(255),
      city VARCHAR(255),
      zipcode VARCHAR(10),
      lat DECIMAL(9,6),
      lng DECIMAL(9,6),
      phone VARCHAR(255),
      website VARCHAR(255),
      company_name VARCHAR(255),
      catch_phrase VARCHAR(255),
      bs VARCHAR(255)
    )`;

    connection.query(sql, error => {
      if (error) {
        reject(error);
      } else {
        resolve(true);
      }
    });
  });
};

const insertUser = (user: APIUser) => {
  return new Promise((resolve, reject) => {
    const { id, name, username, email, address, phone, website, company } = user;
    const { street, suite, city, zipcode, geo } = address;
    const { lat, lng } = geo;
    const { name: companyName, catchPhrase, bs } = company;

    const sql = `INSERT INTO users (id, name, username, email, street, suite, city, zipcode, lat, lng, phone, website, company_name, catch_phrase, bs)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
      id,
      name,
      username,
      email,
      street,
      suite,
      city,
      zipcode,
      lat,
      lng,
      phone,
      website,
      companyName,
      catchPhrase,
      bs
    ];

    connection.query(sql, values, error => {
      if (error) {
        reject(error);
      } else {
        resolve(true);
      }
    });
  });
};
