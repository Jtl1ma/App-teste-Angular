import { Pool } from "pg";

const connectionString = 'postgres://ysxbxwsr:UOt-hWTaUjFrCEd2sEkJIPxvya4cctzX@kesavan.db.elephantsql.com/ysxbxwsr';

const db = new Pool({ connectionString });

export default db;