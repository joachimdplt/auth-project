// src/main.ts
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Récupérer ConfigService
  const configService = app.get(ConfigService);
  
  // ✅ VÉRIFICATION : Afficher les variables d'environnement
  console.log('\n🔍 === VÉRIFICATION CONFIGURATION ===');
  console.log('✅ NODE_ENV:', configService.get<string>('NODE_ENV'));
  console.log('✅ PORT:', configService.get<number>('PORT'));
  
  const dbUrl = configService.get<string>('DATABASE_URL');
  console.log('✅ DATABASE_URL:', dbUrl?.includes('mysql://') ? '✓ Configuré (mysql://)' : '✗ Format incorrect ou manquant');
  
  const jwtSecret = configService.get<string>('JWT_SECRET');
  console.log('✅ JWT_SECRET:', jwtSecret ? '✓ Configuré' : '✗ Manquant');
  
  console.log('✅ JWT_ACCESS_TOKEN_EXPIRATION:', configService.get<string>('JWT_ACCESS_TOKEN_EXPIRATION'));
  console.log('✅ JWT_REFRESH_TOKEN_EXPIRATION:', configService.get<string>('JWT_REFRESH_TOKEN_EXPIRATION'));
  console.log('=================================\n');
  
  // ValidationPipe global
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Démarrer l'application
  const port = configService.get<number>('PORT', 3000);
  await app.listen(port);
  
  console.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();