import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UsersService } from '../services/users.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from '../gards/roles.guard';
import { Roles } from '../decorators/role.decorator';
import { ROLE } from '../enums/role.enum';

@Controller('users')
@UseGuards(RolesGuard)
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id/rdvs')
  findAllRdvs(@Param('id', ParseIntPipe) id: number) {
    console.log(id);
    return this.usersService.findAllRdvs(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Roles(ROLE.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Roles(ROLE.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
