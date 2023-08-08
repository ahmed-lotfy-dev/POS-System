import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    getAllUsers(): Promise<{
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
    getuser(id: string): Promise<void>;
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
