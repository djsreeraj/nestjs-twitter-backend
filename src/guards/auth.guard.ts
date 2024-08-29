//src/guards/auth.guard.ts
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { FirebaseAdmin } from "config/firebase.setup";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private readonly admin: FirebaseAdmin
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const app = this.admin.setup();
        const request = context.switchToHttp().getRequest();
        const authorizationHeader = request.headers?.authorization;

        if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
            console.log("No token or wrong format");
            throw new UnauthorizedException("Authorization token is missing or invalid");
        }

        const idToken = authorizationHeader.split(' ')[1];

        const permissions = this.reflector.get<string[]>("permissions", context.getHandler());
        try {
            const claims = await app.auth().verifyIdToken(idToken);

            if (claims.role && permissions.includes(claims.role)) {
                request.user = claims;
                return true;
            }
            console.log("Role does not match permissions");
            throw new UnauthorizedException("You do not have permission to access this resource");
        } catch (error) {
            console.log("Error verifying token:", error);
            throw new UnauthorizedException("Invalid or expired authorization token");
        }
    }
}
