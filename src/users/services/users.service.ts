import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { RolesService } from './roles.service';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly rolesService: RolesService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { roles, firstName, lastName, email, phoneNumber, password } =
      createUserDto;
    this.isValidCreateUserData(createUserDto);
    const rolesEntities = await this.rolesService.findByIds(roles);
    const existedUser = await this.findOneByEmail(email);
    if (existedUser != null) {
      if (
        existedUser.firstName != firstName ||
        existedUser.lastName != lastName ||
        existedUser.phoneNumber != phoneNumber
      ) {
        throw new HttpException(
          'A user with this email already exists, but with different details.',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException(
          'A user with this email already exists.',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    const user = this.usersRepository.create({
      firstName,
      lastName,
      email,
      phoneNumber,
    });
    user.roles = rolesEntities;
    user.password = await this.hashPassword(password);
    console.log(password, user.password);
    return this.usersRepository.save(user);
  }

  isValidCreateUserData(userData: CreateUserDto | UpdateUserDto) {
    if (!userData.firstName) {
      throw new HttpException(
        `please enter your first name.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!userData.lastName) {
      throw new HttpException(
        `please enter your last name.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!userData.email) {
      throw new HttpException(
        `please enter your email.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    this.isEmail(userData.email);

    if (!userData.phoneNumber) {
      throw new HttpException(
        `please enter a phone number.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    this.isValidPhoneNumber(userData.phoneNumber);

    if (!userData.password) {
      throw new HttpException(
        `please enter a password.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!userData.confirmPassword) {
      throw new HttpException(
        `please confirm your password.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (userData.password != userData.confirmPassword) {
      throw new HttpException(
        'The entered password and its confirmation do not match.',
        HttpStatus.BAD_REQUEST,
      );
    }

    this.isValidPassword(userData.password);
  }

  isValidUpdateUserData(userData: CreateUserDto | UpdateUserDto) {
    if (userData.email) {
      this.isEmail(userData.email);
    }

    if (userData.phoneNumber) {
      this.isValidPhoneNumber(userData.phoneNumber);
    }

    if (userData.password && userData.confirmPassword) {
      if (userData.password != userData.confirmPassword) {
        throw new HttpException(
          'The entered password and its confirmation do not match.',
          HttpStatus.BAD_REQUEST,
        );
      }
      this.isValidPassword(userData.password);
    }
  }

  async findAll() {
    const users = await this.usersRepository.find({ relations: ['roles'] });
    return users.map((user) => {
      delete user.password;
      return user;
    });
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['roles'],
    });
    if (user != null) {
      delete user.password;
      return user;
    } else {
      throw new HttpException(
        `there is no user with this id:${id}.`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  findOneByEmail(email: string) {
    return this.usersRepository.findOne({
      where: { email },
      relations: ['roles'],
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    this.isValidUpdateUserData(updateUserDto);
    const userExists = await this.findOne(id);
    if (userExists == null) {
      throw new HttpException(
        `User with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    if (updateUserDto.roles) {
      const { roles } = updateUserDto;
      const rolesEntities = await this.rolesService.findByIds(roles);
      userExists.roles = rolesEntities;
    }

    if (updateUserDto.email) userExists.email = updateUserDto.email;
    if (updateUserDto.firstName) userExists.firstName = updateUserDto.firstName;
    if (updateUserDto.lastName) userExists.lastName = updateUserDto.lastName;
    if (updateUserDto.phoneNumber)
      userExists.phoneNumber = updateUserDto.phoneNumber;
    if (updateUserDto.password)
      userExists.password = await this.hashPassword(updateUserDto.password);

    return this.usersRepository.save(userExists);
  }

  async remove(id: number) {
    const userExists = await this.findOne(id);
    if (userExists != null) {
      await this.usersRepository.delete(id);
      return { success: true, message: 'user deleted successfully.' };
    } else {
      throw new HttpException(
        `there is no user with this id:${id}.`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  isEmail(email: string) {
    const emailRegExp = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );

    return emailRegExp.test(email);
  }

  hashPassword(password: string) {
    const saltRounds = 10;
    return hash(password, saltRounds);
  }

  isValidPassword(password: string) {
    const lengthRegEx = new RegExp(/^\S{10,30}\S$/m);
    const upperCaseRegEx = new RegExp(/^.*[A-Z]{3}.*$/m);
    const lowerCaseRegEx = new RegExp(/^.*[a-z]{3}.*$/m);
    const numericRegEx = new RegExp(/^.*[\d]{3}.*$/m);
    const specialRegEx = new RegExp(/^.*[~!@#$%^*\-_=+[{\]}\/;:,.?]{3}.*$/m);
    let errorMessage = '';

    if (!lengthRegEx.test(password)) {
      errorMessage += 'Password must be between 10 and 30 characters long. ';
    }
    if (!upperCaseRegEx.test(password)) {
      errorMessage += 'Password must contain at least 3 uppercase letters. ';
    }
    if (!lowerCaseRegEx.test(password)) {
      errorMessage += 'Password must contain at least 3 lowercase letters. ';
    }
    if (!numericRegEx.test(password)) {
      errorMessage += 'Password must contain at least 3 digits. ';
    }
    if (!specialRegEx.test(password)) {
      errorMessage += 'Password must contain at least 3 special characters. ';
    }

    if (errorMessage !== '') {
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }
  }
  isValidPhoneNumber(phoneNumber: string) {
    const phoneNumberRegExp = new RegExp(/^(?:(?:\+212[67])|(?:06|07))\d{8}$/m);
    if (!phoneNumberRegExp.test(phoneNumber)) {
      throw new HttpException('Invalid phone number.', HttpStatus.BAD_REQUEST);
    }
  }
}