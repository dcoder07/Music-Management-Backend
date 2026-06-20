import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { UserDTO } from './getAllUsersRes.js';

export class CreateUserRequest {

  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

}

export interface UserResponse {
  message: string;
  data?: UserDTO;
  isSuccess: boolean;
}
