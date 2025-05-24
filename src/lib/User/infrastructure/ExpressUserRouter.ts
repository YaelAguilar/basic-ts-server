import {  Router } from 'express';
import { ExpressUserController } from './ExpressUserController';

const controller = new ExpressUserController();

const ExpressUserRouter = Router();

ExpressUserRouter.get('/users/', async (req, res, next) => {
    await controller.getAll(req, res, next);
});

ExpressUserRouter.get("/users/:id/", async (req, res, next) => {
    await controller.getOneById(req, res, next);
});

ExpressUserRouter.post("/users/", async (req, res, next) => {
    await controller.create(req, res, next);
});

ExpressUserRouter.put("/users/", async (req, res, next) => {
    await controller.edit(req, res, next);
});

ExpressUserRouter.delete("/users/:id", async (req, res, next) => {
    await controller.delete(req, res, next);
});

export { ExpressUserRouter };