import { PrismaService } from 'src/prisma/prisma.service';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    getallusers(): Promise<{
        msg: string;
        users: import("@prisma/client").User[];
    }>;
}
