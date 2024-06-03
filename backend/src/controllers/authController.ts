
import { Request, Response ,NextFunction} from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';
import { errorHandler } from '../utils/errorHandler';

export const register = async (req: Request, res: Response, next :NextFunction) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword =  bcrypt.hashSync(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully',newUser });
  } catch (err) {
    next(err)
  }
};


export const login = async (req: Request, res: Response,next:NextFunction) => {

  const { email, password } = req.body;
 
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) return next(errorHandler(404, "User not found! "));

        const validPassword = bcrypt.compareSync(password, validUser.password);

        if (!validPassword) return next(errorHandler(401, "Invalid Credentials"));

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET as string);

        res.cookie('access_token', token, { httpOnly: true }).status(200).json(validUser);
  } catch (err) {
     res.status(401).json({ message: "unauthorized" });
  }
}

export const logOut = async (req:Request, res:Response, next:NextFunction) => {
  try {
   res.clearCookie('access_token');
   res.status(200).json('User has been logged out!')
  } catch (error) {
     next(error)
  }
}
