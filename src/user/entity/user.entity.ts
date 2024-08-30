//user.enity.ts
import { Entity, Column, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../user.dto';

@Entity('users')
export class User {
    @PrimaryColumn()
    @ApiProperty({ example: 'jhqnSGtBuSTLLNIVhrEeuCocmqb2', description: 'The unique identifier of the user', type: String })
    uid: string;

    @Column()
    @ApiProperty({ example: 'example@gmail.com', description: 'The email address of the user', type: String })
    email: string;

    @Column()
    @ApiProperty({ example: false, description: 'Indicates whether the user\'s email is verified', type: Boolean })
    emailVerified: boolean;

    @Column({ type: 'varchar', length: 15 })
    @ApiProperty({ example: 'Richa', description: 'The first name of the user', type: String, maxLength: 15 })
    firstName: string;

    @Column({ type: 'varchar', length: 15 })
    @ApiProperty({ example: 'Martin', description: 'The last name of the user', type: String, maxLength: 15 })
    lastName: string;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.USER,
    })
    @ApiProperty({ enum: Role, description: 'The role of the user', example: Role.USER, default: Role.USER, enumName: 'Role' })
    role: Role;
}
