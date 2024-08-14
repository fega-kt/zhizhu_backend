import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { menuEntity } from '../entities/menu.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { menu } from '../../../../domain/menu';
import { menuRepository } from '../../menu.repository';
import { menuMapper } from '../mappers/menu.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class menuRelationalRepository implements menuRepository {
  constructor(
    @InjectRepository(menuEntity)
    private readonly menuRepository: Repository<menuEntity>,
  ) {}

  async create(data: menu): Promise<menu> {
    const persistenceModel = menuMapper.toPersistence(data);
    const newEntity = await this.menuRepository.save(
      this.menuRepository.create(persistenceModel),
    );
    return menuMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<menu[]> {
    const entities = await this.menuRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((user) => menuMapper.toDomain(user));
  }

  async findById(id: menu['id']): Promise<NullableType<menu>> {
    const entity = await this.menuRepository.findOne({
      where: { id },
    });

    return entity ? menuMapper.toDomain(entity) : null;
  }

  async update(id: menu['id'], payload: Partial<menu>): Promise<menu> {
    const entity = await this.menuRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.menuRepository.save(
      this.menuRepository.create(
        menuMapper.toPersistence({
          ...menuMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return menuMapper.toDomain(updatedEntity);
  }

  async remove(id: menu['id']): Promise<void> {
    await this.menuRepository.delete(id);
  }
}
