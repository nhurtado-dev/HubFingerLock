import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

import { MqttModule } from './common/providers/mosquitto/mqtt.module';

@Module({
  imports: [
    MqttModule,
    LoggerModule.forRoot({
      pinoHttp: {
        quietReqLogger: true,
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
            sync: true,
            translateTime: 'SYS:standard',
          },
        },
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
