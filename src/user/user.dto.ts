//user.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength, Matches, IsEnum, IsAlpha } from 'class-validator';

export enum Role {
    ADMIN = "ADMIN",
    USER = "USER",
}

export class UserDto {
    @ApiProperty({ description: 'User email', example: 'user@example.com' })
    @IsEmail({}, { message: 'Please provide valid Email.' })
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: 'User password',
        example: 'Example123!',
        minLength: 6,
        maxLength: 20,
        pattern: '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,20}$'
    })
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,20}$/, {
        message: "password too weak",
    })
    password: string;

    @ApiProperty({ description: 'First name of the user', example: 'John', minLength: 2, maxLength: 20 })
    @IsNotEmpty()
    @MinLength(2, { message: 'Firstname must have at least 2 characters.' })
    @MaxLength(20)
    @IsAlpha()
    firstName: string;

    @ApiProperty({ description: 'Last name of the user', example: 'Doe', minLength: 2, maxLength: 20 })
    @IsNotEmpty()
    @MinLength(2, { message: 'Lastname must have at least 2 characters.' })
    @MaxLength(20)
    @IsAlpha()
    lastName: string;

    @ApiProperty({ enum: Role, description: 'User role', example: Role.USER })
    @IsNotEmpty()
    @IsEnum(Role)
    role: Role;
}


export class LoginDto {
    @ApiProperty({
        description: 'User email address for login',
        example: 'user@example.com'
    })
    @IsEmail({}, { message: 'Invalid email format.' })
    @IsNotEmpty({ message: 'Email is required.' })
    email: string;

    @ApiProperty({
        description: 'Password for login',
        example: 'Pass123!',
        minLength: 6,
        maxLength: 20
    })
    @IsNotEmpty({ message: 'Password is required.' })
    @MinLength(6, { message: 'Password must be at least 6 characters long.' })
    @MaxLength(20, { message: 'Password must not exceed 20 characters.' })
    password: string;
}