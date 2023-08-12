import UserModel from "../models/user_model";

export const UserController = {
    async getUserById(id: number): Promise<UserModel | null> {
        return await UserModel.findByPk(id);
    },

    async getAllUsers(): Promise<UserModel[]> {
        return await UserModel.findAll();
    },

    async createUser(user: { nome: string; senha: string }): Promise<UserModel> {
        return await UserModel.create(user);
    },

    async updateUserById(id: number, updatedUser: { nome?: string; senha?: string }): Promise<[number]> {
        return await UserModel.update(updatedUser, { where: { idusuario: id } });
    },

    async deleteUserById(id: number): Promise<number> {
        return await UserModel.destroy({ where: { idusuario: id } });
    },

    async loginUser(nome: string, senha: string): Promise<UserModel | null> {
        return await UserModel.findOne({ where: { nome, senha } });
    },
};