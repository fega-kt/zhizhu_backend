import { Injectable } from '@nestjs/common';
import { CreatemenuDto } from './dto/create-menu.dto';
import { UpdatemenuDto } from './dto/update-menu.dto';
import { menuRepository } from './infrastructure/persistence/menu.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { menu } from './domain/menu';

@Injectable()
export class menusService {
  constructor(private readonly menuRepository: menuRepository) {}

  create(createmenuDto: CreatemenuDto) {
    return this.menuRepository.create(createmenuDto);
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.menuRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findOne(id: menu['id']) {
    return this.menuRepository.findById(id);
  }

  update(id: menu['id'], updatemenuDto: UpdatemenuDto) {
    return this.menuRepository.update(id, updatemenuDto);
  }

  remove(id: menu['id']) {
    return this.menuRepository.remove(id);
  }
}
