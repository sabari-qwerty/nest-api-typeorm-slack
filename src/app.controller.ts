import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { updateDataDto } from './dto/update.data.dto';
import { BodyDataDto } from './dto/body.data.dto';
import { isPositive } from 'class-validator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getAll() {
    return this.appService.getAll();
  }

  @Get('/slack-send-message')
  sendMessage() {
    return this.appService.postToSlack('hello world, I am an bot meessage');
  }

  @Post('/99acres')
  acres(@Body() body: BodyDataDto) {
    const id = 'c9aae1a7-ad59-478c-a6b7-09cdc2d70cd7';

    const conditional =
      !String(body.text).includes('99acres.com') ||
      !String(body.text).includes('search') ||
      !String(body.text).includes('property');

    this.appService.url_validation(
      id,
      body.text,
      conditional,
      'url link - ex: https://www.99acres.com/search/property/rent/tamil-nadu?city=227&preference=R&area_unit=1&res_com=R',
      '99acres',
    );
  }

  @Post('/nobroker')
  nobroker(@Body() body: BodyDataDto) {
    const id = '9c6c61da-fe2e-4cd0-86e6-0db9ce0487b6';

    const conditional =
      !String(body.text).includes('nobroker.in') ||
      !String(body.text).includes('property');

    this.appService.url_validation(
      id,
      body.text,
      conditional,
      'url link - ex: https://www.nobroker.in/property/sale/chennai/Rayala%20Nagar?searchParam=W3sibGF0IjoxMy4wMjk3OTI5LCJsb24iOjgwLjE4NTQxNDIsInBsYWNlSWQiOiJDaElKdjdrSC10UmdVam9SNUhtRERNa2lzNlkiLCJwbGFjZU5hbWUiOiJSYXlhbGEgTmFnYXIifV0=&radius=2.0&city=chennai&locality=Rayala%20Nagar',
      'nobroker',
    );
  }

  @Post('/hanureddyrealty')
  hanureddyrealty(@Body() body: BodyDataDto) {
    const id = '1b520c00-ba6f-46e3-a0dc-9070641ad65e';

    const conditional =
      !String(body.text).includes('hanureddyrealty.com') ||
      !String(body.text).includes('real-estate-buy-residential-properties');

    this.appService.url_validation(
      id,
      body.text,
      conditional,
      ':no_entry_sign: like this - ex: https://hanureddyrealty.com/real-estate-buy-residential-properties/page/2/',
      'hanureddyrealty',
    );
  }

  @Post('/help')
  help() {
    return this.appService.postToSlack(
      `
      :thinking_face: 99acres  example url:  https://www.99acres.com/search/property/rent/tamil-nadu?city=227&preference=R&area_unit=1&res_com=R
      :thinking_face: nobroker example url: https://www.nobroker.in/property/sale/chennai/Rayala%20Nagar?searchParam=W3sibGF0IjoxMy4wMjk3OTI5LCJsb24iOjgwLjE4NTQxNDIsInBsYWNlSWQiOiJDaElKdjdrSC10UmdVam9SNUhtRERNa2lzNlkiLCJwbGFjZU5hbWUiOiJSYXlhbGEgTmFnYXIifV0=&radius=2.0&city=chennai&locality=Rayala%20Nagar 
      :thinking_face: hanureddyrealty example url: https://hanureddyrealty.com/real-estate-buy-residential-properties/page/2/ 
    `,
    );
  }

  async update(id: string, @Body() body: updateDataDto) {
    return this.appService.update(id, body);
  }
}
