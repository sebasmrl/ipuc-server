import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
   new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted:true
    })
  )
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();













// Test shorts codes
console.log(new Date().toLocaleDateString('es-LA'))
console.log(new Date("1855-03-30"))
// Crear un nuevo objeto Date
var fecha = new Date();

// Crear un objeto Intl.DateTimeFormat para formatear la fecha
var formatoFecha = new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
});

// Formatear la fecha
//var fechaFormateada = formatoFecha.format(fecha);

//console.log(fechaFormateada); // Mostrar la fecha formateada en la consola