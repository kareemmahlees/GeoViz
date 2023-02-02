import {
    Body,
    Controller,
    // Get,
    // Headers,
    Post,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { RefreshTokenDTO, UserSignInDTO, UserSignUpDTO } from '../dto';
import { AuthService } from './auth.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/sign-up')
    @UseInterceptors(FileInterceptor('avatar'))
    async signUpUser(
        @Body() payload: UserSignUpDTO,
        @UploadedFile() file: Express.Multer.File,
    ) {
        return await this.authService.signUpUser(payload, file);
    }

    @Post('/sign-in')
    async signInUser(@Body() payload: UserSignInDTO) {
        return await this.authService.signInUser(payload);
    }

    @Post('/refresh-token')
    async refreshToken(@Body() payload: RefreshTokenDTO) {
        return await this.authService.refreshToken(payload);
    }

    // @Get('/profile')
    // async getUserProfile(@Headers('Authorization') jwt: string) {
    //     return await this.authService.getUserProfile(jwt);
    // }
}
