
import { NextFunction, Request, Response, Router } from "express";
import userRepository from "../repository/user.repository";
import { StatusCodes } from 'http-status-codes';
//import jwtAuthenticationMiddleware from "../middlewares/jwt.authentication.middleware";
//import userRepository from "../repositores/user.repository";

//get / users
//get / users/:uuid
//post / users/
//put / users/:uuid
//delet / users/:uuid

const usersRoute = Router();

usersRoute.get('/users',async (req: Request, res: Response, next: NextFunction) => {
  
    const users = await userRepository.findAllUsers();
    res.status(StatusCodes.OK).send(users);
  
});
usersRoute.get('/users/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
   try{
       const uuid = req.params.uuid;
       const user = await userRepository.findById(uuid);
        res.status(StatusCodes.OK).send(user);

    }catch(error) {
        next(error);
    }
    });
    /*
usersRoute.get('/user/:username, password', async (req: Request<{ username: string, password: string }>,
     res: Response, next: NextFunction) => {
   try{
       const username = req.params.username;
       const password = req.params.password;
       const user = await userRepository.findByUsernameAndPassword(username, password);
        res.status(StatusCodes.OK).send(user);

    }catch(error) {
        next(error);
    }
    });
*/
usersRoute.post('/users', async (req: Request, res: Response, next: NextFunction) => {
const newUser = req.body;

const uuid = await userRepository.create(newUser);

res.status(StatusCodes.CREATED).send(uuid);
});

usersRoute.put('/users/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    const modificadoUser = req.body;
    
    modificadoUser.uuid = uuid;

    await userRepository.update(modificadoUser);

    res.status(StatusCodes.OK).send();

    });

usersRoute.delete('/users/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
const uuid = req.params.uuid;
await userRepository.remuve(uuid);
    res.sendStatus(StatusCodes.OK);
});

export default usersRoute;