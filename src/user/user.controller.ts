//  user/user.controller.ts
import { Controller, Post, Body, Get, HttpException, HttpStatus,  Request } from "@nestjs/common";
import { UserService } from "./user.service";
import { LoginDto, UserDto } from "./user.dto";
import { Auth } from "src/decorators/auth.decorator";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./entity/user.entity";

@ApiTags('User')
@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post("/signup")
    signup(@Body() userRequest: UserDto) {
        return this.userService.createUser(userRequest);
    }

    @Post("/login")
    async login(@Body() loginRequest: LoginDto){
        try {
            const token = await this.userService.signInUser(loginRequest);
            return { token }
        } catch (error) {
            throw new HttpException('Failed to sign in', HttpStatus.BAD_REQUEST)
        }
    }

    @Get('/profile')
    @Auth('USER')
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Get user profile', description: 'Retrieves the profile of the authenticated user.' })
    @ApiResponse({ status: 200, description: 'Profile retrieved successfully', type: User })
    @ApiResponse({ status: 400, description: 'User does not exist or failed to get user profile' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })


    async getProfile(@Request() req) {
        return this.userService.getUserProfile(req.user.user_id);
    }

}