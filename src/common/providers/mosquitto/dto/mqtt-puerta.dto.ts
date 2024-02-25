import { IsNumber, IsString } from 'class-validator';

export class MqttPuertaDto {
  @IsNumber()
  linkquality: number;

  @IsString()
  power_on_behavior: string;

  @IsString()
  state: string;

  @IsString()
  switch_type: string;
}
