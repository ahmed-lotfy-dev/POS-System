import { User } from '@prisma/client';
import { EditUserDto } from './dto';
import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getAllUsers(users: User[]): Promise<{
        id: string;
        username: string;
        email: string;
        password: string;
        isAdmin: boolean;
        isConfirm: boolean;
        forgetCode: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getMe(user: User): {
        id: string;
        username: string;
        email: string;
        password: string;
        isAdmin: boolean;
        isConfirm: boolean;
        forgetCode: number;
        createdAt: Date;
        updatedAt: Date;
    };
    editUser(userId: string, dto: EditUserDto): Promise<{
        id: string;
        username: string;
        email: string;
        password: string;
        isAdmin: boolean;
        isConfirm: boolean;
        forgetCode: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
