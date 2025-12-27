import { Request, Response, NextFunction } from 'express';
import userService from './user.service';
import { sendSuccess, sendError } from '../../utils/response';
import { createUserSchema, updateUserSchema, getUserSchema } from './user.schema';

export class UserController {
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = createUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await userService.getUserByEmail(validatedData.email);
      if (existingUser) {
        return sendError(res, 'User with this email already exists', 409);
      }

      const user = await userService.createUser(validatedData);
      return sendSuccess(res, 'User created successfully', user, 201);
    } catch (error: any) {
      next(error);
    }
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = getUserSchema.parse({ id: req.params.id });
      const user = await userService.getUserById(id);
      
      if (!user) {
        return sendError(res, 'User not found', 404);
      }

      return sendSuccess(res, 'User retrieved successfully', user);
    } catch (error: any) {
      next(error);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = getUserSchema.parse({ id: req.params.id });
      const validatedData = updateUserSchema.parse(req.body);
      
      const user = await userService.updateUser(id, validatedData);
      return sendSuccess(res, 'User updated successfully', user);
    } catch (error: any) {
      next(error);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = getUserSchema.parse({ id: req.params.id });
      await userService.deleteUser(id);
      return sendSuccess(res, 'User deleted successfully', undefined, 204);
    } catch (error: any) {
      next(error);
    }
  }

  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.getAllUsers();
      return sendSuccess(res, 'Users retrieved successfully', users);
    } catch (error: any) {
      next(error);
    }
  }
}

export default new UserController();

