import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User as UserModel } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { hashPassword } from 'src/common/utils/bcrypt/bcrypt.utils';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserModel)
    private userModel: typeof UserModel,
  ) {}

  async create(dto: CreateUserDto) {
    const hashed = hashPassword(dto.password);
    const user = await this.userModel.create({
      ...dto,
      password: hashed,
    });
    return {
      statusCode: 201,
      message: 'User created successfully',
    };
  }

  async findAll() {
    return this.userModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const user = await this.userModel.findByPk(id, {
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt'],
      },
      include: { all: true },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ where: { email } });
  }
}
