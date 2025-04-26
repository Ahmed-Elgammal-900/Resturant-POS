"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_entity_1 = require("./users.entity");
const typeorm_2 = require("typeorm");
const deletedemails_entity_1 = require("./deletedemails.entity");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcryptjs");
let AuthService = class AuthService {
    usersRepository;
    deletedEmailsRepository;
    jwtService;
    constructor(usersRepository, deletedEmailsRepository, jwtService) {
        this.usersRepository = usersRepository;
        this.deletedEmailsRepository = deletedEmailsRepository;
        this.jwtService = jwtService;
    }
    async validateUser(email, password) {
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
            password: password,
            user: user.user,
        });
        return { token: token, user: user.user };
    }
    async registerUser(email, password, user) {
        const deleted = await this.deletedEmailsRepository.findOne({
            where: { email },
        });
        if (deleted) {
            throw new Error('this account was deleted');
        }
        const exsist = await this.usersRepository.findOne({ where: { email } });
        if (exsist) {
            throw new Error('this account exsist Sign In');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await this.usersRepository.query('INSERT INTO users (email, PASSWORD, user) VALUES (?, ?, ?)', [email, hashedPassword, user]);
        const payload = { email: email, user: user, password: password };
        const token = this.jwtService.sign(payload);
        return token;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.Users)),
    __param(1, (0, typeorm_1.InjectRepository)(deletedemails_entity_1.DeletedEmails)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map