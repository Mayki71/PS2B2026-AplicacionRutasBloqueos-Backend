import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { supabase } from './config/supabase.config';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { MailModule } from './modules/auth/mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// Test coneccion a Supabase
const testConnection = async () => {
  const { data, error } = await supabase.from('usuarios').select('*').limit(1);

  if (error) {
    console.error('Error conectando a Supabase:', error.message);
  } else {
    console.log('Supabase conectado correctamente');
  }
};

testConnection();
