import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getallusers(): Promise<{
        msg: string;
        users: import("@prisma/client").User[];
    }>;
}
