import { User } from '@prisma/client';
import { EditUserDto } from './dto';
import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getAllUsers(users: User[]): Promise<{
        username: string | null;
        email: string;
        password: string;
        id: string;
        isAdmin: boolean;
        isConfirm: boolean | null;
        forgetCode: number | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getMe(user: User): {
        username: string | null;
        email: string;
        password: string;
        id: string;
        isAdmin: boolean;
        isConfirm: boolean | null;
        forgetCode: number | null;
        createdAt: Date;
        updatedAt: Date;
    };
    editUser(userId: string, dto: EditUserDto): Promise<{
        username: string | null;
        email: string;
        password: string;
        id: string;
        isAdmin: boolean;
        isConfirm: boolean | null;
        forgetCode: number | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
