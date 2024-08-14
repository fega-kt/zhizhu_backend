import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { menusService } from './menus.service';
import { CreatemenuDto } from './dto/create-menu.dto';
import { UpdatemenuDto } from './dto/update-menu.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { menu } from './domain/menu';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllmenusDto } from './dto/find-all-menus.dto';

@ApiTags('Menus')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'menus',
  version: '1',
})
export class menusController {
  constructor(private readonly menusService: menusService) {}

  @Post()
  @ApiCreatedResponse({
    type: menu,
  })
  create(@Body() createmenuDto: CreatemenuDto) {
    return this.menusService.create(createmenuDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(menu),
  })
  async findAll(
    @Query() query: FindAllmenusDto,
  ): Promise<InfinityPaginationResponseDto<menu>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.menusService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: menu,
  })
  findOne(@Param('id') id: string) {
    return this.menusService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: menu,
  })
  update(@Param('id') id: string, @Body() updatemenuDto: UpdatemenuDto) {
    return this.menusService.update(id, updatemenuDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.menusService.remove(id);
  }
}
