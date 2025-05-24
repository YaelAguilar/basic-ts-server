import { User } from '../../domain/User';
import { UserId } from "../../domain/UserId";
import { UserName } from "../../domain/UserName";
import { UserEmail } from "../../domain/UserEmail";
import { UserCreatedAt } from "../../domain/UserCreatedAt";
import { UserRepository } from "../../domain/UserRepository";
import { UserNotFoundError } from '../../domain/UserNotFoundError';

export class UserEdit {
    constructor(private repository: UserRepository) {}

    async run(id: string, name: string, email: string, createdAt: Date): Promise<void> {
        const user = new User(
            new UserId(id),
            new UserName(name),
            new UserEmail(email),
            new UserCreatedAt(createdAt)
        );

        const userExists = await this.repository.getOneById(user.id);

        if (!userExists) {
            throw new UserNotFoundError("User not found");
        }
        return this.repository.edit(user);
    }
}