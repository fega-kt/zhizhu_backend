import { menu } from '../../../../domain/menu';
import { menuEntity } from '../entities/menu.entity';

export class menuMapper {
  static toDomain(raw: menuEntity): menu {
    const domainEntity = new menu();
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: menu): menuEntity {
    const persistenceEntity = new menuEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
