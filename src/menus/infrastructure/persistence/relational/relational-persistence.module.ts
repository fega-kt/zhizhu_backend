import { Module } from '@nestjs/common';
import { menuRepository } from '../menu.repository';
import { menuRelationalRepository } from './repositories/menu.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { menuEntity } from './entities/menu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([menuEntity])],
  providers: [
    {
      provide: menuRepository,
      useClass: menuRelationalRepository,
    },
  ],
  exports: [menuRepository],
})
export class RelationalmenuPersistenceModule {}
