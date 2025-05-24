import { NextFunction, Request, Response } from "express";
import { ServiceContainer } from "../../shared/infrastructure/ServiceContainer";
import { UserNotFoundError } from "../domain/UserNotFoundError";

export class ExpressUserController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await ServiceContainer.user.getAll.run();

            return res.status(200).json(users.map((user) => user.mapToPrimitives()));
        } catch (error) {
            next(error);
        }
    }

    async getOneById(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await ServiceContainer.user.getOneById.run(req.params.id);

            return res.status(200).json(user.mapToPrimitives());
        } catch (error) {
            if (error instanceof UserNotFoundError) {
                return res.status(404).json({ message: error.message });
                }
                next(error);
            }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { id, name, email, createdAt } = req.body as {
                id: string;
                name: string;
                email: string;
                createdAt: string;
            };
            await ServiceContainer.user.create.run(
                id, 
                name, 
                email, 
                new Date(createdAt)
            );
            
            return res.status(201).send();
        } catch (error) {
            next(error);
        }
        
    }

    async edit(req: Request, res: Response, next: NextFunction) {
        try {
            const { id, name, email, createdAt } = req.body as {
                id: string;
                name: string;
                email: string;
                createdAt: string;
            };
            await ServiceContainer.user.edit.run(
                id, 
                name, 
                email, 
                new Date(createdAt)
            );
            
            return res.status(200).send();
        } catch (error) {
          if (error instanceof UserNotFoundError) {
            return res.status(404).json({ message: error.message });
            }
            next(error);
        }

    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            await ServiceContainer.user.delete.run(req.params.id);
        
        return res.status(204).send();
        } catch (error) {
          if (error instanceof UserNotFoundError) {
            return res.status(404).json({ message: error.message });
            }
            next(error);
        }
    }
}