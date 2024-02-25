import { IsNumber, IsString } from 'class-validator';

export class MqttPuertaDto {
  @IsString()
  action: string

  @IsNumber()
  linkquality: number;

  @IsString()
  power_on_behavior: string;

  @IsString()
  state: string;

  @IsString()
  switch_type: string;
}
