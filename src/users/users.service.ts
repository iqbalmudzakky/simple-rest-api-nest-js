import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User as UserModel } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserModel)
    private userModel: typeof UserModel,
  ) {}

  async create(dto: CreateUserDto) {
    return this.userModel.create(dto);
  }

  async findAll() {
    return this.userModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return this.userModel.findByPk(id, { include: { all: true } });
  }
}
