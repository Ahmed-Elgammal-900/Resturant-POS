import { AuthService } from './auth.service';
import { Response } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    handleAuth(body: {
        email: string;
        password: string;
    }, res: Response): Promise<void>;
    SignUp(body: {
        email: string;
        password: string;
        user: string;
    }, res: Response): Promise<void>;
    logOut(res: Response): void;
    checkStatus(req: Request, res: Response): void;
}
