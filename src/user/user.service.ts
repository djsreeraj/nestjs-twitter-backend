import { Injectable, BadRequestException } from "@nestjs/common";
import { FirebaseAdmin } from "../../config/firebase.setup";
import { UserDto } from "./user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entity/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
    constructor(
        private readonly admin: FirebaseAdmin,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

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
}