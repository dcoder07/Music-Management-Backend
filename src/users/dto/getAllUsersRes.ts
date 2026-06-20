import { IsOptional } from 'class-validator';

export class UserDTO {

    id: number;

    firstName: string;

    lastName: string;

    email: string;

    password: string;
}

export class GetAllUsersResponse {

    @IsOptional()
    users: UserDTO[];

    isSuccess: boolean;
}
