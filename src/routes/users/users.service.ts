import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BcryptUtil } from '../../utils/bcrypt.util';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    private readonly bcrypt: BcryptUtil,
    @InjectRepository(User)
    private readonly repository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const verifyUsernameAlreadyExist = await this.repository.findOne({
      where: {
        username: createUserDto.username
      }
    });

    if (verifyUsernameAlreadyExist) {
      throw new HttpException(
        `username ${createUserDto.username} already exists`,
        409
      );
    }

    const hashedPassword = this.bcrypt.encrypt(createUserDto.password);
    createUserDto.password = hashedPassword;

    const user = await this.repository.save(createUserDto);
    return user;
  }

  findAll() {
    return this.repository.find();
  }
  findOneByUsername(username: string) {
    return this.repository.findOne({ where: { username: username } });
  }

  async findOne(id: number) {
    const user = await this.repository.findOne({ where: { id: id } });
    if (!user)
      throw new HttpException(
        `User ${id} does not exist`,
        HttpStatus.NOT_FOUND
      );
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.repository.findOne({ where: { id: id } });
    if (!user) {
      throw new HttpException(`User ${id} not found`, HttpStatus.NOT_FOUND);
    }
    const verifyUsernameAlreadyExist = this.repository.findOne({
      where: {
        username: updateUserDto.username
      }
    });
    if (verifyUsernameAlreadyExist)
      throw new HttpException(
        `Username ${updateUserDto.username} already exists`,
        HttpStatus.CONFLICT
      );

    return this.repository.update(id, updateUserDto);
  }

  async remove(id: number) {
    const user = await this.repository.findOne({ where: { id: id } });
    if (!user) throw new HttpException(`User ${id} does not exist`, 404);
    return this.repository.delete(id);
  }
}
