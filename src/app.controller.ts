/**
 * 앱 시작 시 나오는 페이지로 routing 해주는 컨트롤러
 */

import { Controller, Get } from '@nestjs/common';

@Controller('')                  // 홈 화면 URL
export class AppController {
  @Get()
  home() {
    return 'Welcome to my Movie API';
  }
}
