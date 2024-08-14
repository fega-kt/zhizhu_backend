import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { menu } from '../../domain/menu';

export abstract class menuRepository {
  abstract create(
    data: Omit<menu, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<menu>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<menu[]>;

  abstract findById(id: menu['id']): Promise<NullableType<menu>>;

  abstract update(
    id: menu['id'],
    payload: DeepPartial<menu>,
  ): Promise<menu | null>;

  abstract remove(id: menu['id']): Promise<void>;
}
