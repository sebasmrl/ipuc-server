import { BadRequestException, InternalServerErrorException, Logger } from "@nestjs/common";

export function handlerDbError(e:any, logger:Logger){
    if(e.code=='23505'){
        logger.error(e.detail)
        throw new BadRequestException(e.detail); 
      }
      logger.error(e.message)
      throw new InternalServerErrorException("Error desconocido, verifica los logs de tu servidor");
}