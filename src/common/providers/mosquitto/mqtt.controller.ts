import { Controller, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { MqttService } from './mqtt.service';

@ApiTags('MQTT')
@Controller('mqtt')
export class MqttController {
  constructor(private readonly mqttService: MqttService) {}

  @Post('subscribe')
  public async subscribeMqtt(@Query('topic') topic: string) {
    return this.mqttService.subscribe(topic);
  }

  @Post('unsubscribe')
  public async unsubscribeMqtt(@Query('topic') topic: string) {
    return this.mqttService.unsubscribe(topic);
  }

  @Post('publish/:topic')
  public async publishMqtt(@Param('topic') topic: string, @Query('message') message: string) {
    return this.mqttService.publish(topic, message);
  }

  @Post('connect')
  public async connectMqtt() {
    return this.mqttService.connect();
  }

  @Post('disconnect')
  public async disconnectMqtt() {
    return this.mqttService.disconnect();
  }
}
