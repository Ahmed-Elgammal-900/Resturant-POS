import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';
import { DeletedEmails } from './deletedemails.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @InjectRepository(DeletedEmails)
    private deletedEmailsRepository: Repository<DeletedEmails>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const deleted = await this.deletedEmailsRepository.findOne({
      where: { email },
    });
    if (deleted) {
      throw new Error('this account was deleted');
    }

    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('Invalid Email or Passowrd');
    }

    const isPasswordValid = await bcrypt.compare(password, user.PASSWORD);
    console.log(isPasswordValid);
    if (!isPasswordValid) {
      throw new Error('Invalid Email or Passowrd');
    }

    const token = this.jwtService.sign({
      email: email,
      user: user.user,
    });

    return { token: token, user: user.user };
  }

  async registerUser(email: string, password: string, user: string) {
    const deleted = await this.deletedEmailsRepository.findOne({
      where: { email },
    });
    if (deleted) {
      throw new Error('this account was deleted create new one');
    }

    const exsist = await this.usersRepository.findOne({ where: { email } });

    if (exsist) {
      throw new Error('this account exsist Sign In');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await this.usersRepository.query(
      'INSERT INTO users (email, PASSWORD, user) VALUES (?, ?, ?)',
      [email, hashedPassword, user],
    );
    const payload = { email: email, user: user };
    const token = this.jwtService.sign(payload);
    return token;
  }

  async deleteAccount(user: any) {
    const { email } = user;

    await this.deletedEmailsRepository.query(
      'Insert into deleted_emails (email) VALUES (?)',
      [email],
    );
    await this.usersRepository.query('DELETE FROM users where email = ?', [
      email,
    ]);
  }
}
