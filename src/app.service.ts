import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserModel } from './entities/user.entity';

@Injectable()
export class AppService {
    constructor(
        @InjectModel(UserModel.name) private userModel: Model<UserModel>,
    ) {}

    getHello(): string {
        return 'Hello World!';
    }

    async listarTodos() {
        try {
            const allUsers = await this.userModel.find().exec();
            return allUsers;
        } catch (err) {
            return { message: `Error en la conexion con mongo ${err}` };
        }
    }

    async updateAccount(
        movementAccount: string,
        id: string,
        accountNumber: string,
        amount: number,
    ) {
        try {
            const currentBalance = await this.getAccountBalance(
                id,
                accountNumber,
            );
            const newBalance =
                movementAccount === 'deposit'
                    ? currentBalance.balance + amount
                    : movementAccount === 'extraction'
                    ? currentBalance.balance - amount
                    : null;

            if (!currentBalance.balance) {
                return {
                    message:
                        'Registro no encontrado. cod:update-balance-asdasds',
                };
            }

            if (currentBalance.id === id) {
                const updateAccount = await this.userModel
                    .findByIdAndUpdate(
                        { _id: id, accountNumber: accountNumber },
                        { $set: { balance: newBalance } },
                        { new: true, upsert: false },
                    )
                    .exec();
                console.log('update: ', updateAccount);
                if (!updateAccount) {
                    return { message: 'Registro no encontrado. cod:asdasds' };
                }
                return updateAccount;
            } else {
                return { message: 'datos ingresados incorrectos.' };
            }
        } catch (e) {
            throw new NotFoundException(
                'Error inesperado. cod:update-balance-bdbdbdbdb',
            );
        }
    }

    async validatedUser(dni: string, clave: string) {
        try {
            const user = await this.userModel.findOne({
                $and: [{ dni: dni }, { clave: clave }],
            });
            if (!user) {
                return { message: 'Registro no encontrado. cod:asdasds' };
            }
            if (user.dni === dni && user.clave === clave) {
                return user;
            } else {
                return { message: 'datos ingresados incorrectos.' };
            }
        } catch (e) {
            throw new NotFoundException(
                'Error inesperado. cod:login-bdbdbdbdb',
            );
        }
    }

    async getAccountBalance(id: string, accountNumber: string) {
        try {
            const account = await this.userModel.findOne({
                $and: [{ id }, { accountNumber: accountNumber }],
            });
            if (!account) {
                return {
                    message:
                        'Registro no encontrado. cod:account-get-balance-asdasds',
                };
            }
            if (account.id === id && account.accountNumber === accountNumber) {
                return { balance: account.balance, id: account.id };
            } else {
                return { message: 'datos ingresados incorrectos.' };
            }
        } catch (e) {
            throw new NotFoundException(
                'Error inesperado. cod:account-get-bdbdbdbdb',
            );
        }
    }

    async createUserTest(
        dni: string,
        clave: string,
        username: string,
        accountNumber: string,
        balance: number,
    ) {
        try {
            const model = new this.userModel({
                username: username,
                dni: dni,
                clave: clave,
                accountNumber: accountNumber,
                accountCurrency: '$',
                balance: balance || 0,
            });
            const userCreated = await model.save();
            return userCreated;
        } catch (e) {
            throw new NotFoundException(
                'Error inesperado. cod:create-bdbdbdbdb',
            );
        }
    }
}
