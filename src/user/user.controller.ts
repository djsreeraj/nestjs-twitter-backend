import { Controller, Post, Body, Get } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDto } from "./user.dto";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post("/signup")
    signup(@Body() userRequest: UserDto) {
        return this.userService.createUser(userRequest);
    }

    @Get("/test")
    goodEvening() {
        return "User Route Ping!";
    }
}