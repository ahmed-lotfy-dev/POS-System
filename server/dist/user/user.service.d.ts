import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    getallusers(): Promise<{
        users: import("@prisma/client").User[];
    }>;
    getuser(id: string): Promise<void>;
    editUser(userId: number, dto: EditUserDto): Promise<import("@prisma/client").User>;
}
