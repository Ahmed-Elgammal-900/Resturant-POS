import { Users } from './users.entity';
import { Repository } from 'typeorm';
import { DeletedEmails } from './deletedemails.entity';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private usersRepository;
    private deletedEmailsRepository;
    private jwtService;
    constructor(usersRepository: Repository<Users>, deletedEmailsRepository: Repository<DeletedEmails>, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<any>;
    registerUser(email: string, password: string, user: string): Promise<string>;
}
