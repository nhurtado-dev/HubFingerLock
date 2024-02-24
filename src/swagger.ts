import { Logger as NestLogger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';

import { AppModule } from './app.module';
import { MqttService } from './common/providers/mosquitto/mqtt.service';

const prefix = 'fingerlock/docs';

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

  const options = new DocumentBuilder()
    .setTitle('FingerBox - Documentación')
    .setDescription('Conjunto de APIs diseñadas para la gestión de conectividad mediante socket en el proyecto base FingerBox.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(prefix, app, document);
  await app.listen(8013);
  return app.getUrl();
}

void (async (): Promise<void> => {
  try {
    const url = await bootstrap();
    NestLogger.log(`Documentation running at ${url}/${prefix}`, 'Bootstrap');
  } catch (error) {
    NestLogger.error(error, 'Bootstrap');
  }
})();
