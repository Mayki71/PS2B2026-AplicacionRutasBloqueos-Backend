import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './modules/auth/auth.module';
import { ReportsModule } from './modules/reports/reports.module';

import { ConfigModule } from '@nestjs/config';
import { supabase } from './config/supabase.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ReportsModule,
    AdminModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// Test conexión a Supabase con tipado correcto
const testConnection = async () => {
  try {
    const { data, error } = await supabase.from('usuarios').select('*').limit(1);

    if (error) {
      console.error('❌ Error conectando a Supabase:', error.message);
    } else {
      console.log('✅ Supabase conectado correctamente');
      if (data) {
        console.log(`📊 Se encontraron ${data.length} registros`);
      }
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('❌ Error al conectar con Supabase:', err.message);
    } else {
      console.error('❌ Error desconocido:', err);
    }
  }
};

testConnection();