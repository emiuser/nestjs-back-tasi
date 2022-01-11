import {
    CanActivate,
    ExecutionContext,
    Injectable,
    Inject,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import { ConfigType } from '@nestjs/config';
import config from './config';

@Injectable()
export class EnvironmentGuard implements CanActivate {
    constructor(
        @Inject(config.KEY) private configService: ConfigType<typeof config>,
    ) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const dev = this.configService.devEnvironment;
        if (dev) {
            return true;
        }
        return true;
    }
}
