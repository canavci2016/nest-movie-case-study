import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { Create } from './dtos/create';
import { MovieService } from './movie.service';
import { Update } from './dtos/update';
import { Pagination } from 'src/pagination/interfaces/pagination.interface';
import { PaginationPipe } from 'src/pagination/pagination.pipe';

@Controller('movies')
export class MovieController {
  constructor(private movieService: MovieService) { }

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
    const movie = await this.movieService.findOne({ _id: id });

    if (!movie) {
      throw new NotFoundException(
        'there is no valid movie matches with given information',
      );
    }

    return this.movieService.update(id, updateDto);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return this.movieService.deleteOne({ _id: id });
  }
}
