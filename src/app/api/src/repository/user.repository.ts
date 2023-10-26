import db from "../databases/db";
import User from "../model/user.model";

class UserRepository{

async findAllUsers(): Promise<User[]>{
    const sql = "SELECT uuid, name, username, email, telefone FROM user_model";
    const { rows } = await db.query<User>(sql);
    //const rw=result.rows;
    return rows || [];
}

async findById(uuid: string): Promise<User> {
    try {
        const query = "SELECT uuid, name, username, email, telefone FROM user_model WHERE uuid = $1";
        const values = [uuid];
        const { rows } = await db.query<User>(query, values);
        const  [user]  = rows;
        return user;
    } catch (error){
        throw new Error("Erro na consulta por ID");
    }   
}
async findByUsernameAndPassword(username: string, password: string): Promise<User | null> {
    try {
        const query = `SELECT uuid, username, password FROM user_model 
                            WHERE username = $1 AND password = crypt($2, 'my_salt')`;
        const values = [username, password];
        const { rows } = await db.query<User>(query, values);
        const [user] = rows;
        return user || null;
    } catch(error) {
        throw new Error("Erro na consulta pelo nome de usuario e/ou senha");
    }
}

async create(user: User): Promise<string> {
 const script =`INSERT INTO user_model (name, username, email, telefone, password)
                    VALUES($1, $2, $3, $4, crypt($5, 'my_salt')) RETURNING uuid`;    
 const values = [user.name, user.username, user.email, user.telefone, user.password];
 const { rows } = await db.query<{ uuid: string }>(script, values);
 const [newUser] = rows;
 return newUser.uuid;
}

async update(user: User): Promise<void> {
 const script = `UPDATE user_model SET name = $1, username = $2, email = $3,
                    telefone = $4, password = crypt($5, 'my_salt') WHERE uuid = $6`;    
 const values = [user.name, user.username, user.email, user.telefone, user.password, user.uuid];
 await db.query(script, values);
}

async remuve(uuid: string): Promise<void> {
    const sql = `DELETE FROM user_model WHERE uuid = $1`;
    const values = [uuid];
    await db.query(sql, values);
}
}
export default new UserRepository();