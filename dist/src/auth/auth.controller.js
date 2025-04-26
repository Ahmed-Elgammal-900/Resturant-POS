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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_gurad_1 = require("../auth/auth.gurad");
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async handleAuth(body, res) {
        const { email, password } = body;
        const { token, user } = await this.authService.validateUser(email, password);
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 3600000,
            sameSite: 'lax',
            secure: process.env.ENVIROMENT === 'production',
        });
        res.json({ isAuth: true, user: user });
    }
    async SignUp(body, res) {
        const { email, password, user } = body;
        const result = await this.authService.registerUser(email, password, user);
        res.cookie('token', result, {
            httpOnly: true,
            maxAge: 3600000,
            sameSite: 'lax',
            secure: process.env.ENVIROMENT === 'production',
        });
        res.json({ user: user, isAuth: true });
    }
    logOut(res) {
        res.clearCookie('token', {
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.ENVIROMENT === 'production',
        });
        res.json({ isAuth: false });
    }
    checkStatus(req, res) {
        res.json(req['user']);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('SignIn'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "handleAuth", null);
__decorate([
    (0, common_1.Post)('SignUp'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "SignUp", null);
__decorate([
    (0, common_1.Post)('Logout'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "logOut", null);
__decorate([
    (0, common_1.Get)('status'),
    (0, common_1.UseGuards)(auth_gurad_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "checkStatus", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map