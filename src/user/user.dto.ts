//user.dto.ts
import { IsEmail, IsNotEmpty, MaxLength, MinLength, Matches, IsEnum, IsAlpha } from "class-validator";

export enum Role {
    ADMIN = "ADMIN",
    USER = "USER",
}

export class UserDto {
    @IsEmail({}, { message: 'Please provide valid Email.' })
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,20}$/, {
        message: "password too weak",
    })
    password: string;

    @IsNotEmpty()
    @MinLength(2, { message: 'Firstname must have atleast 2 characters.' })
    @MaxLength(20)
    @IsAlpha()
    firstName: string;

    @IsNotEmpty()
    @MinLength(2, { message: 'Lastname must have atleast 2 characters.' })
    @MaxLength(20)
    @IsAlpha()
    lastName: string;

    @IsNotEmpty()
    @IsEnum(Role)
    role: Role;

}