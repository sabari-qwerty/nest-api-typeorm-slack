import { IsString } from 'class-validator';

export class BodyDataDto {
  @IsString()
  token: string;

  @IsString()
  team_id: string;

  @IsString()
  team_domain: string;

  @IsString()
  channel_id: string;

  @IsString()
  channel_name: string;

  @IsString()
  user_id: string;

  @IsString()
  user_name: string;

  @IsString()
  command: string;
  @IsString()
  text: string;
  @IsString()
  api_app_id: String;
  @IsString()
  is_enterprise_install: string;

  @IsString()
  response_url: string;

  @IsString()
  trigger_id: string;
}
