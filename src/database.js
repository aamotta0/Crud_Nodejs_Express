import {createPool} from "mysql2/promise";

const pool = createPool({
    host: "localhost",
    port: "3307",
    user: "root",
    password: "2804",
    database: "test01" 
});

export default pool;

