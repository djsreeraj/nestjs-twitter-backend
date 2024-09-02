//  user/user.controller.ts
import { Controller, Post, Body, Get, HttpException, HttpStatus,  Request, Delete, Param, Query } from "@nestjs/common";
import { UserService } from "./user.service";
import { LoginDto, UserDto } from "./user.dto";
import { Auth } from "src/decorators/auth.decorator";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./entities/user.entity";
import { FollowService } from "./services/follow.service";
import { TimelineService } from "./services/timeline.service";
import { Tweet } from "src/tweet/entities/tweet.entity";

@ApiTags('User')
@Controller("user")
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly followService: FollowService,
        private readonly timelineService: TimelineService,
    ) {}

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

    @Post('/follow/:followUserId')
    @Auth('USER')
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Follow a user', description: 'Allows the authenticated user to follow another user.' })
    @ApiResponse({ status: 200, description: 'User followed successfully' })
    @ApiResponse({ status: 400, description: 'Invalid user ID or failed to follow user' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiParam({ name: 'followUserId', type: String, description: 'ID of the user to follow' })
    followUser(@Request() req, @Param('followUserId') followUserId: string): Promise<void> {
        return this.followService.followUser(req.user.user_id, followUserId);
    }

    @Delete('/unfollow/:unfollowUserId')
    @Auth('USER')
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Unfollow a user', description: 'Allows the authenticated user to unfollow another user.' })
    @ApiResponse({ status: 200, description: 'User unfollowed successfully' })
    @ApiResponse({ status: 400, description: 'Invalid user ID or failed to unfollow user' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiParam({ name: 'unfollowUserId', type: String, description: 'ID of the user to unfollow' })
    unfollowUser(@Request() req, @Param('unfollowUserId') unfollowUserId: string): Promise<void> {
        return this.followService.unfollowUser(req.user.user_id, unfollowUserId);
    }

    @Get('/timeline')
    @Auth('USER')
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Get user timeline', description: 'Retrieves the timeline of the authenticated user.' })
    @ApiResponse({ status: 200, description: 'Timeline retrieved successfully', type: [Tweet] })
    @ApiResponse({ status: 400, description: 'Failed to retrieve timeline' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiQuery({ name: 'page', type: Number, required: false, description: 'Page number for pagination' })
    @ApiQuery({ name: 'limit', type: Number, required: false, description: 'Number of tweets per page' })
    getTimeline(
        @Request() req,
        @Query('page') page: number,
        @Query('limit') limit: number,
    ): Promise<Tweet[]> {
        return this.timelineService.getTimeline(req.user.user_id, page, limit);
    }

}