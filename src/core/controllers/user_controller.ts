import User from "../models/user_model";

export const UserController = {
    async getUserById(id: number): Promise<User | null> {
        return await User.findByPk(id);
    },

    async getAllUsers(): Promise<User[]> {
        return await User.findAll();
    },

    async createUser(user: { nome: string; senha: string }): Promise<User> {
        return await User.create(user);
    },

    async updateUserById(id: number, updatedUser: { nome?: string; senha?: string }): Promise<[number]> {
        return await User.update(updatedUser, { where: { idusuario: id } });
    },

    async deleteUserById(id: number): Promise<number> {
        return await User.destroy({ where: { idusuario: id } });
    },

    async loginUser(nome: string, senha: string): Promise<User | null> {
        return await User.findOne({ where: { nome, senha } });
    },
};