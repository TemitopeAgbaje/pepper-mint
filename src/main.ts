import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strips any properties not defined in the DTO
      forbidNonWhitelisted: true, // Throws an error for properties not defined in the DTO
      transform: true, // Automatically transforms payloads to DTO instances
      exceptionFactory: (errors) => {
        // Customize the exception message
        const formattedErrors = errors.map(
          (error) =>
            `${error.property} - ${Object.values(error.constraints).join(', ')}`,
        );
        return new BadRequestException(
          `Validation failed: ${formattedErrors.join('; ')}`,
        );
      },
    }),
  );

  await app.listen(process.env.PORT || 3100);
}
bootstrap();
