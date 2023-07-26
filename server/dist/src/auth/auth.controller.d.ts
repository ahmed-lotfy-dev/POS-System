import { AuthService } from './auth.service';
import { SignInAuth, SignUpAuth } from './dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(dto: SignUpAuth): Promise<{
        access_token: string;
    } | {
        msg: string;
    }>;
    signin(dto: SignInAuth): Promise<{
        access_token: string;
    }>;
}
