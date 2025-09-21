import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { DirectorService } from './director.service';
import { Create } from './dtos/create';

@Controller('directors')
export class DirectorController {
  constructor(private directorService: DirectorService) {}

  @Get()
  async findAll() {
    return this.directorService.find();
  }

  @Post()
  async save(@Body(new ValidationPipe()) createDto: Create) {
    return this.directorService.save(createDto);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return this.directorService.deleteOne({ _id: id });
  }
}
