import { Logger as NestLogger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';

import { AppModule } from './app.module';
import { MqttService } from './common/providers/mosquitto/mqtt.service';

const prefix = 'fingerlock/api';

async function bootstrap(): Promise<string> {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Initialize MQTT service
  const mqttService = app.get(MqttService);
  mqttService.connect(); // Connect to MQTT broker

  app.enableCors();
  app.setGlobalPrefix(prefix);
  await app.listen(3013);
  return app.getUrl();
}

void (async (): Promise<void> => {
  try {
    const url = await bootstrap();
    NestLogger.log(`Application running at ${url}/${prefix}`, 'Bootstrap');
  } catch (error) {
    NestLogger.error(error, 'Bootstrap');
  }
})();
