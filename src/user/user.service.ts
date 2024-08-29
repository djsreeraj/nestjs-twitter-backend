// user/user.service.ts
import { FirebaseAdmin } from './../../config/firebase.setup';
import { Injectable, BadRequestException } from "@nestjs/common";
import { UserDto } from "./user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entity/user.entity";
import { Repository } from "typeorm";
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class UserService {
    private firebaseApiKey: string;

    constructor(
        private readonly admin: FirebaseAdmin,
        private configService: ConfigService,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {
        this.firebaseApiKey = this.configService.get<string>('FIREBASE_API_KEY');

    }

    async createUser(userRequest: UserDto): Promise<any> {
        const { email, password, firstName, lastName, role } = userRequest;
        const app = this.admin.setup();

        try {
            const createdUser = await app.auth().createUser({
                email,
                password,
                displayName: `${firstName} ${lastName}`,
            });
            await app.auth().setCustomUserClaims(createdUser.uid, { role });
            
            if(createdUser){
                //Copy user details to pg
                const newUser = this.userRepository.create({
                    uid: createdUser.uid,
                    email: createdUser.email,
                    emailVerified: createdUser.emailVerified,
                    firstName,
                    lastName,
                    role
                })

                let user = await this.userRepository.save(newUser);
                console.log("Created user....")
                console.log(user)
            }
            
            return createdUser;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async signInUser(email: string, password: string): Promise<any> {
        try {
            const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.firebaseApiKey}`;
            const response = await axios.post(url, {
                email,
                password,
                returnSecureToken: true
            });
            return response.data; // Includes ID token, refresh token, etc.
        } catch (error) {
            throw new BadRequestException('Authentication failed: ' + error.message);
        }
    }

    async getUserProfile(uid: string): Promise<User> {
        try {
            const user = await this.userRepository.findOne({
                where: { uid: uid }
            });
            
            if (!user) {
                throw new BadRequestException('User does not exist');
            }
            
            return user;
        } catch (error) {
            throw new BadRequestException('Failed to get user profile: ' + error.message);
        }
    }
}