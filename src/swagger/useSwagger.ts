import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export function useSwagger(app: INestApplication){
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Notes')
    .setDescription('RESTful API')
    .setVersion('1.1.0')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/api/docs', app, swaggerDocument);
}