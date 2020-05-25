import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import UserModel, {IUser} from '../models/user_model'


export async function signUp(req: Request, res: Response): Promise<Response | void> {
  const {username, email, password} = req.body
  let ban:boolean = true;
  const user_model: IUser = new UserModel ({
    username,
    email,
    password
  });
  user_model.password = await user_model.encryptPassword(user_model.password)
  if(!(user_model.username.length >= 5 && user_model.username.length <= 20)){ban = false}
  if (ban){
    try {
         const newUser = await user_model.save()
         const token:string = jwt.sign({
           _id: newUser._id
         },
          process.env.SECRET_KEY || 'tokentest'
         );
        
         res.header('auth-token', token).json(newUser)
    } catch (error) {
      console.log(error)
      res.json({message: "Invalid"})
    }
  } else {
    res.json({message: "Data error"})
  }
}

export const signIn = async(req: Request, res: Response): Promise<Response | void> => {
  const user = await UserModel.findOne({email: req.body.email})
  if (!user) {return res.status(400).json('Email or password invalid')}
  const validPassword:boolean = await user.validatePassword(req.body.password)
  if(!validPassword) return res.status(400).json('Email or password invalid')
  const token: string = jwt.sign({_id: user._id}, process.env.SECRET_KEY || 'tokentest', {
    expiresIn: 60 * 60 
  })  
  console.log(user)
  res.header('auth-token', token).json(user)
}

export const profile = async(req: Request, res: Response): Promise<Response | void> => {
  const user = await UserModel.findById(req.userId, {
    password: 0
  });
  if(!user) return res.status(404).json('User not found');
  res.json(user);
}