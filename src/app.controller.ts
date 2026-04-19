import { Controller, Get } from '@nestjs/common';
import { supabase } from './config/supabase.config';

@Controller()
export class AppController {

  @Get('insert')
  async insertTest() {
    const { data, error } = await supabase
      .from('test')
      .insert([{ name: 'prueba' }]);

    if (error) {
      return { error: error.message };
    }

    return { data };
  }

}