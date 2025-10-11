import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    getAllUsers(): Promise<{
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
    getuser(id: string): Promise<void>;
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
