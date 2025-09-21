import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { DirectorService } from './director.service';
import { Create } from './dtos/create';
import { ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { Director } from './models/director.model';
import { ConvertCastErrorToHttpInterceptor } from 'src/core/interceptors/convert-cast-error-to-http.interceptor';

@UseInterceptors(ConvertCastErrorToHttpInterceptor)
@Controller('directors')
export class DirectorController {
  constructor(private directorService: DirectorService) { }

  @ApiOkResponse({
    description: 'Returns list of available directors',
    type: [Director],
  })
  @Get()
  async findAll() {
    return this.directorService.find();
  }

  @ApiResponse({ type: Boolean })
  @Post()
  async save(@Body(new ValidationPipe()) createDto: Create): Promise<boolean> {
    const res = await this.directorService.save(createDto);
    return Boolean(res);
  }

  @ApiResponse({ type: Boolean })
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    const res = await this.directorService.deleteOne({ _id: id });

    return Boolean(res.deletedCount);
  }
}
