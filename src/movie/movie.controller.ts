import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { Create } from './dtos/create';
import { MovieService } from './movie.service';
import { Update } from './dtos/update';
import { PaginationPipe } from 'src/pagination/pagination.pipe';
import { ApiQuery } from '@nestjs/swagger';
import { Pagination } from 'src/pagination/interfaces/pagination.interface';
import { PaginationQuery } from 'src/pagination/dtos/pagination.query';

@Controller('movies')
export class MovieController {
  constructor(private movieService: MovieService) { }

  @ApiQuery({ name: 'pagination', type: PaginationQuery, required: false })
  @Get()
  async findAll(@Query('pagination', PaginationPipe) pagination: Pagination) {
    return this.movieService.find({ pagination: pagination });
  }

  @Post()
  async save(@Body(new ValidationPipe()) createDto: Create) {
    return this.movieService.save(createDto);
  }

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateDto: Update,
  ) {
    return this.movieService.update(id, updateDto);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return this.movieService.deleteOne({ _id: id });
  }
}
