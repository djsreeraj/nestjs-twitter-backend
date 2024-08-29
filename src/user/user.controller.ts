//  user/user.controller.ts
import { Controller, Post, Body, Get, HttpException, HttpStatus,  Request } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDto } from "./user.dto";
import { Auth } from "src/decorators/auth.decorator";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post("/signup")
    signup(@Body() userRequest: UserDto) {
        return this.userService.createUser(userRequest);
    }

    @Post("/login")
    async login(@Body() {email, password}: { email: string, password: string}){
        try {
            const token = await this.userService.signInUser(email, password);
            return { token }
        } catch (error) {
            throw new HttpException('Failed to sign in', HttpStatus.BAD_REQUEST)
        }
    }

    @Get('/profile')
    @Auth('USER')
    async getProfile(@Request() req) {
        return this.userService.getUserProfile(req.user.user_id);
    }

    @Get("/test")
    goodEvening() {
        return "User Route Ping!";
    }
}