import { Module } from '@nestjs/common';

import { FurnituresModule } from 'src/modules/furnitures.module';
import { MaterialsModule } from 'src/modules/materials.module';
import { OrderModule } from 'src/modules/order.module';
import { OrderMaterialModule } from 'src/modules/order-material.module';

import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './authorization/users/users.module';
import { AuthModule } from './authorization/auth/auth.module';
import { JwtAuthGuard } from './authorization/jwt/jwt-auth.guard';
import { LocalAuthGuard } from './authorization/local/local-auth.guard';

@Module({
    imports: [FurnituresModule, MaterialsModule, OrderModule, OrderMaterialModule,
              TypeOrmModule.forRoot({
                    type: 'postgres', //тип подключаемой БД
                    port: 5432, //порт
                    username: 'education', //имя пользователя
                    password: 'password', //пароль
                    database: 'furniture_production',
                    host: '127.0.0.1', //хост, в нашем случае БД развернута локально
                    synchronize: true, //отключаем автосинхронизацию(в противном случае при каждом перезапуске наша БД будет создаваться заново)
                    logging: 'all', //включим логирование для удобства отслеживания процессов
                    entities: ['dist/**/*.entity{.ts,.js}'], //указываем путь к сущностям
                    }),
    UsersModule,
    AuthModule,
             ],
    controllers: [],
    providers: [JwtAuthGuard, LocalAuthGuard,],
})
export class AppModule {}
