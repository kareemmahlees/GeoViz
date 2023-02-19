import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../app.module';
import { spec, request } from 'pactum';
import * as fs from 'fs';
import FormData = require('form-data-lite');

describe('Auth e2e', () => {
    let app: INestApplication;
    const test_user_email = 'testuser@test.com';
    const test_user_password = 'password123';
    const test_user_gender = 'male';
    const test_user_first_name = 'test';
    const test_user_last_name = 'family';
    const formdata = new FormData();
    formdata.append('email', test_user_email);
    formdata.append('phone', '+201006007952');
    formdata.append('password', test_user_password);
    formdata.append('first_name', test_user_first_name);
    formdata.append('last_name', test_user_last_name);
    formdata.append('gender', test_user_gender);
    formdata.append('avatar', fs.readFileSync('test/test_avatar.jpg'), {
        filename: 'test_avatar.jpg',
    });

    beforeAll(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleRef.createNestApplication();
        app.useGlobalPipes(
            new ValidationPipe({
                whitelist: true,
            }),
        );
        app.useLogger(false);
        request.setBaseUrl('http://localhost:8000');
        await app.init();
        await app.listen(8000);
    });

    describe('Sign Up', () => {
        it('should sign-up user', async () => {
            return await spec()
                .post('/auth/sign-up')
                .withMultiPartFormData(formdata)
                .expectStatus(201)
                .expectJsonLike({
                    aud: 'authenticated',
                    role: 'authenticated',
                    user_metadata: {
                        first_name: test_user_first_name,
                        gender: test_user_gender,
                        last_name: test_user_last_name,
                    },
                });
        });

        it('should fail user already registered', async () => {
            await spec().post('/auth/sign-up').withMultiPartFormData(formdata);
            return await spec()
                .post('/auth/sign-up')
                .withMultiPartFormData(formdata)
                .expectStatus(400)
                .expectJson({
                    statusCode: 400,
                    message: 'User already registered',
                    error: 'Bad Request',
                });
        });

        it('should fail empty body', async () => {
            const formData = new FormData();
            return await spec()
                .post('/auth/sign-up')
                .withMultiPartFormData(formData)
                .expectStatus(400)
                .expectJson({
                    statusCode: 400,
                    message: [
                        'email must be an email',
                        'password must be a string',
                        'password must be longer than or equal to 8 characters',
                        'phone must be a valid phone number',
                        'first_name must be a string',
                        'last_name must be a string',
                        'gender must be one of the following values: male, female',
                    ],
                    error: 'Bad Request',
                });
        });
    });

    describe('Sign In', () => {
        it('should sign-in user', async () => {
            return await spec()
                .post('/auth/sign-in')
                .withJson({
                    email: test_user_email,
                    password: test_user_password,
                })
                .expectStatus(200)
                .expectJsonSchema({
                    type: 'object',
                    properties: {
                        access_token: {
                            type: 'string',
                        },
                        token_type: { type: 'string' },
                        expires_in: { type: 'number' },
                        refresh_token: { type: 'string' },
                        user: {
                            type: 'object',
                        },
                        expires_at: { type: 'number' },
                    },
                    required: [
                        'access_token',
                        'token_type',
                        'expires_in',
                        'refresh_token',
                    ],
                })
                .stores('access_token', 'access_token')
                .stores('refresh_token', 'refresh_token');
        });
        it('should fail invalid login creds', async () => {
            return await spec()
                .post('/auth/sign-in')
                .withJson({
                    email: 'wrongemail@email.com',
                    password: test_user_password,
                })
                .expectStatus(400)
                .expectJson({
                    statusCode: 400,
                    message: 'Invalid login credentials',
                    error: 'Bad Request',
                });
        });
    });

    describe('Refresh Token', () => {
        it('should refresh token', async () => {
            return await spec()
                .post('/auth/refresh-token')
                .expectStatus(200)
                .withJson({
                    access_token: '$S{access_token}',
                    refresh_token: '$S{refresh_token}',
                })
                .expectJsonSchema({
                    type: 'object',
                    properties: {
                        access_token: {
                            type: 'string',
                        },
                        refresh_token: {
                            type: 'string',
                        },
                    },
                });
        });
    });

    describe('Get Profile', () => {
        it('should get user profile', async () => {
            return await spec()
                .get('/auth/profile')
                .withHeaders('Authorization', 'Bearer $S{access_token}')
                .expectStatus(200)
                .expectJsonSchema({
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                        },
                        created_at: {
                            type: 'string',
                        },
                        first_name: {
                            type: 'string',
                        },
                        last_name: {
                            type: 'string',
                        },
                        gender: {
                            type: 'string',
                        },
                        avatar_url: {
                            type: 'object',
                            properties: {
                                signedUrl: {
                                    type: 'string',
                                },
                            },
                        },
                    },
                })
                .expectJsonLike({
                    first_name: test_user_first_name,
                    last_name: test_user_last_name,
                    gender: test_user_gender,
                });
        });

        it('should fail unauthorized', async () => {
            return await spec()
                .get('/auth/profile')
                .expectStatus(401)
                .withHeaders(
                    'Authorization',
                    `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXV.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhNjc2OD.js54JmXEVl1iplTa8-jNw1ly5D8tmsZ3HqbpEteOKNU`,
                )
                .expectJson({
                    statusCode: 401,
                    message: 'Unauthorized',
                });
        });
    });

    afterAll(async () => {
        await app.close();
    });
});
