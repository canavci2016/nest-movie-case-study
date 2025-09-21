import { Module } from '@nestjs/common';
import { DirectorService } from './director.service';
import { DirectorController } from './director.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Director, DirectorSchema } from './entities/director.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Director.name, schema: DirectorSchema },
    ]),
  ],
  providers: [DirectorService],
  controllers: [DirectorController],
  exports: [DirectorService],
})
export class DirectorModule { }
