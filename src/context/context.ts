import jwt from 'jsonwebtoken';
import { User } from '../entity/User.js';

export const getUser = (token : string)  =>{
    try {
      if (token) {
        const user = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        return user;
      }
      return null;
    } catch (error) {
      return null;
    }
  };