//user.enity.ts
import { Entity, Column, PrimaryColumn } from 'typeorm';
import { Role } from '../user.dto';

@Entity('users')
export class User {
    @PrimaryColumn()
    uid: string;

    @Column()
    email: string;

    @Column()
    emailVerified: boolean;

    @Column({type: 'varchar', length: 15})
    firstName: string;

    @Column({ type: 'varchar', length: 15})
    lastName: string;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.USER,
    })
    role: Role;
}
