import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Data } from './entities/data.entity';
import { Repository } from 'typeorm';
import { updateDataDto } from './dto/update.data.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { SlackConfig } from '../slack.config';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Data) private dataRepo: Repository<Data>,
    private httpService: HttpService,
  ) {}

  async getAll() {
    return this.dataRepo.find();
  }

  async update(id: string, dto: updateDataDto) {
    return await this.dataRepo.update({ id }, dto);
  }

  url_validation(
    id: string,
    url: string,
    conditional: boolean,
    errorMessage: string,
    websiteName: string,
  ) {
    try {
      new URL(url.trim());

      if (conditional) {
        return this.postToSlack(':no_entry_sign:' + errorMessage);
      }

      const data = {
        url,
      };

      this.update(id, data);

      return this.postToSlack(`:white_check_mark: ${websiteName} url updated `);
    } catch (error) {
      return this.postToSlack(':no_entry_sign: this not url format ');
    }
  }

  async postToSlack(message: string) {
    let response = await firstValueFrom(
      this.httpService.post(
        SlackConfig.url,
        {
          username: SlackConfig.botName,
          icon_emoji: SlackConfig.icon,
          channel: SlackConfig.channel,
          text: message,
        },
        {
          headers: {
            Authorization: 'Bearer ' + SlackConfig.token,
          },
        },
      ),
    );
    if (!response.data.ok) {
      throw new HttpException(
        `Failed to send Slack message, details: ${response.data.error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return response.data.message;
  }
}
