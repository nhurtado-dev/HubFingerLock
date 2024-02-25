import { Injectable, Logger } from '@nestjs/common';
import * as mqtt from 'mqtt';
import { MqttPuertaDto } from './dto/mqtt-puerta.dto';

@Injectable()
export class MqttService {
  private readonly logger = new Logger(MqttService.name);

  private client: mqtt.MqttClient;

  constructor() {
    // Inicializamos el cliente MQTT
    this.client = mqtt.connect('mqtt://localhost', {
      username: 'YOUR_USERNAME',
      password: 'NobleM600$',
    });

    // Manejo de eventos
    this.client.on('connect', () => {
      this.logger.log('Connected to MQTT broker');
      // Nos suscribimos al topic de ZigBee
      this.client.subscribe('zigbee2mqtt');
    });

    // Manejo de mensajería
    this.client.on('message', (topic, message) => {
      this.logger.log(`Received message on topic ${topic}: ${message.toString()}`);
    });

    // Manejo de errores
    this.client.on('error', (error) => {
      this.logger.error('MQTT Error:', error);
    });
  }

  connect() {
    try {
      // Conexión al broker MQTT
      this.logger.log('Connected to MQTT broker');
      return true;
    } catch (error) {
      return false;
    }
  }

  disconnect() {
    // Desconexión del broker MQTT
    try {
      this.client.end();
      this.logger.log(`Disconnected from MQTT broker`);

      return true;
    } catch (error) {
      return false;
    }
  }

  publish(topic: string, message: MqttPuertaDto) {
    try {
      this.client.publish(topic, JSON.stringify(message));
      this.logger.log(`Published message: ${message} to Topic: ${topic}`);
      return true;
    } catch (error) {
      return false;
    }
  }

  subscribe(topic: string) {
    try {
      this.client.subscribe(topic);
      this.logger.log(`Subscribed to Topic: ${topic}`);
      return true;
    } catch (error) {
      return false;
    }
  }

  unsubscribe(topic: string) {
    try {
      this.client.unsubscribe(topic);
      this.logger.log(`Unsubscribed from Topic: ${topic}`);
      return true;
    } catch (error) {
      return false;
    }
  }
}
