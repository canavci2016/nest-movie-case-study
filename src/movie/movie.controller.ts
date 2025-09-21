import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { Create } from './dtos/create';
import { MovieService } from './movie.service';
import { Update } from './dtos/update';
import { PaginationPipe } from 'src/pagination/pagination.pipe';
import { ApiOkResponse, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { Pagination } from 'src/pagination/interfaces/pagination.interface';
import { PaginationQuery } from 'src/pagination/dtos/pagination.query';
import { Movie } from './models/movie.model';
import { ConvertCastErrorToHttpInterceptor } from 'src/core/interceptors/convert-cast-error-to-http.interceptor';

@UseInterceptors(ConvertCastErrorToHttpInterceptor)
@Controller('movies')
export class MovieController {
  constructor(private movieService: MovieService) { }

  @ApiOkResponse({
    description: 'Returns list of available movies',
    type: [Movie],
  })
  @ApiQuery({ name: 'pagination', type: PaginationQuery, required: false })
  @Get()
  async findAll(@Query('pagination', PaginationPipe) pagination: Pagination) {
    return this.movieService.find({ pagination: pagination });
  }

  @ApiResponse({ type: Boolean })
  @Post()
  async save(@Body(new ValidationPipe()) createDto: Create) {
    const res = await this.movieService.save(createDto);
    return Boolean(res);
  }

  @ApiResponse({ type: Boolean })
  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateDto: Update,
  ) {
    const res = await this.movieService.update(id, updateDto);

    return Boolean(res.modifiedCount);
  }

  @ApiResponse({ type: Boolean })
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    const res = await this.movieService.deleteOne({ _id: id });
    return Boolean(res.deletedCount);
  }
}
