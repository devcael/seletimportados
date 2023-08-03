import { UserController } from "@/core/controllers/user_controller";

describe('UserController', () => {
    it('should create a new user', async () => {
        const newUser = await UserController.createUser({ nome: 'John', senha: 'password' });
        expect(newUser).toHaveProperty('idusuario');
    });

    it('should get a user by id', async () => {
        const newUser = await UserController.createUser({ nome: 'Jane', senha: 'password' });
        const user = await UserController.getUserById(newUser.idusuario);
        expect(user?.nome).toBe('Jane');
    });

    it('should update a user by id', async () => {
        const newUser = await UserController.createUser({ nome: 'Michael', senha: 'password' });
        const updatedUser = await UserController.updateUserById(newUser.idusuario, { nome: 'Mike' });
        expect(updatedUser[0]).toBe(1);

        const user = await UserController.getUserById(newUser.idusuario);
        expect(user?.nome).toBe('Mike');
    });

    it('should delete a user by id', async () => {
        const newUser = await UserController.createUser({ nome: 'Alice', senha: 'password' });
        const result = await UserController.deleteUserById(newUser.idusuario);
        expect(result).toBe(1);

        const user = await UserController.getUserById(newUser.idusuario);
        expect(user).toBeNull();
    });

    it('should login a user', async () => {
        const newUser = await UserController.createUser({ nome: 'Robert', senha: 'password' });
        const user = await UserController.loginUser('Robert', 'password');
        expect(user?.idusuario).toBe(newUser.idusuario);
    });
});
