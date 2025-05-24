import { NextFunction, Request, Response } from "express";
import { ServicesContainer } from "../../shared/infrastructure/ServicesContainer";
import { UserNotFoundError } from "../domain/UserNotFoundError";

export class ExpressUserController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        const users = await ServicesContainer.user.getAll.run();

        return res.json(users).status(200);
    }

    async getOneById(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await ServicesContainer.user.getOneById.run(req.params.id);

            return res.json(user).status(200);
        } catch (error) {
            if (error instanceof UserNotFoundError) {
                return res.status(404).json({ message: error.message });
            }

            throw error;
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        const { id, name, email, createdAt } = req.body as {
            id: string;
            name: string;
            email: string;
            createdAt: string;
        };
        await ServicesContainer.user.create.run(
            id, 
            name, 
            email, 
            new Date(createdAt)
        );
        
        return res.status(201).send();
    }

    async edit(req: Request, res: Response, next: NextFunction) {
        const { id, name, email, createdAt } = req.body as {
            id: string;
            name: string;
            email: string;
            createdAt: string;
        };
        await ServicesContainer.user.edit.run(
            id, 
            name, 
            email, 
            new Date(createdAt)
        );
        
        return res.status(201).send();
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        await ServicesContainer.user.delete.run(req.params.id);
        
        return res.status(204).send();
    }
}