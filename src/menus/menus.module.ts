import { Module } from '@nestjs/common';
import { menusService } from './menus.service';
import { menusController } from './menus.controller';
import { RelationalmenuPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [RelationalmenuPersistenceModule],
  controllers: [menusController],
  providers: [menusService],
  exports: [menusService, RelationalmenuPersistenceModule],
})
export class menusModule {}
