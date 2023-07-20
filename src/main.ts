import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/httpException.filter';
import { SuccessInterceptor } from './common/interceptors/success.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new SuccessInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //검증을 통과한 뒤, 대상 객체에서 검증 규칙이 정의되어있지 않은 프로퍼티를 모두 제거해주는 옵션
      forbidNonWhitelisted: true, //대상 객체에 검증 규칙이 정의되어있지 않은 프로퍼티가 있으면 오류를 내게 하는 옵션
      forbidUnknownValues: true, //대상 객체에 검증 규칙이 정의되어있지 않은 프로퍼티가 있으면 오류를 내게 하는 옵션
      skipMissingProperties: false, //검증 데코레이터가 붙은 프로퍼티가 대상 오브젝트에 존재하지 않으면 오류를 내개 하는 옵션
    }),
  );
  app.use(cookieParser());

  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('Title')
      .setDescription('API DOCS')
      .setVersion('0.0.0')
      .addTag('Tag')
      .build(),
  );
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
