import { Controller, UseGuards, Get, Post, Put, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

/** Custom Guards */
import { EnvironmentGuard } from './environment.guard';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get('/hello')
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('/dev-listar-todos-los-usuarios')
    listarTodosLosUsuarios() {
        return this.appService.listarTodos();
    }

    @UseGuards(EnvironmentGuard)
    @Post('/login')
    login(@Req() req: Request) {
        const { dni, clave } = req.body;
        return this.appService.validatedUser(dni, clave);
    }

    @Post('/saldo')
    accountBalance(@Req() req: Request) {
        const { id, accountNumber } = req.body;
        return this.appService.getAccountBalance(id, accountNumber);
    }

    @Put('/deposit')
    movementAccountDeposit(@Req() req: Request) {
        const { id, accountNumber, amount } = req.body;
        return this.appService.updateAccount(
            'deposit',
            id,
            accountNumber,
            amount,
        );
    }

    @Put('/extraction')
    movementAccountExtraction(@Req() req: Request) {
        const { id, accountNumber, amount } = req.body;
        return this.appService.updateAccount(
            'extraction',
            id,
            accountNumber,
            amount,
        );
    }

    @Post('/create')
    create(@Req() req: Request) {
        const { dni, clave, username, accountNumber, balance } = req.body;
        return this.appService.createUserTest(
            dni,
            clave,
            username,
            accountNumber,
            balance,
        );
    }
}
