import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../app.module';
import { spec, request } from 'pactum';
import * as fs from 'fs';
import FormData = require('form-data-lite');

describe('Logs e2e', () => {
    let app: INestApplication;
    const testUserEmail = 'testuser3@test.com';
    const testUserPassword = 'password123';
    const userData = {
        email: testUserEmail,
        phone: '+201006007952',
        password: testUserPassword,
        first_name: 'test',
        last_name: 'family',
        gender: 'male',
    };
    const projectData = {
        name: 'project 1',
        description: 'project 1',
        location: 'project 1',
    };
    const wellData = {
        name: 'well name',
        x_location: 'x _location',
        y_location: 'y_location',
        kb: 'well kb',
        td: 'well td',
        trajectory: 'well trajectory',
    };
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
        request.setBaseUrl('http://localhost:8000');
        await app.init();
        await app.listen(8000);
        await spec().post('/auth/sign-up').withMultiPartFormData(userData);
        await spec()
            .post('/auth/sign-in')
            .withJson({
                email: testUserEmail,
                password: testUserPassword,
            })
            .stores('access_token', 'access_token');
        request.setBearerToken('$S{access_token}');
        await spec()
            .post('/projects')
            .withJson(projectData)
            .stores('project_id', 'id');
        await spec()
            .post('/wells/{project_id}')
            .withPathParams('project_id', '$S{project_id}')
            .withJson(wellData)
            .stores('well_id', 'id');
    });
    describe('Upload log', () => {
        const uploadLogUrl = '/logs/{well_id}';
        const formData = new FormData();
        formData.append('file', fs.readFileSync('test/test_log.csv'), {
            filename: 'test_log.csv',
        });
        it('should upload log', async () => {
            return await spec()
                .post(uploadLogUrl)
                .withPathParams('well_id', '$S{well_id}')
                .withMultiPartFormData(formData)
                .expectStatus(201)
                .expectJsonLike({
                    well_id: '$S{well_id}',
                    name: 'test_log',
                })
                .stores('log_id', 'id');
        });
        it("should fail well id doesn't exist", async () => {
            return await spec()
                .post(uploadLogUrl)
                .withPathParams(
                    'well_id',
                    '9a453060-d15f-4e14-b684-458bbcc5b4d4',
                )
                .withMultiPartFormData(formData)
                .expectStatus(404)
                .expectJson({
                    statusCode: 404,
                    message: 'not found',
                    error: "well with id 9a453060-d15f-4e14-b684-458bbcc5b4d4 doesn't exist",
                });
        });
    });

    describe('Update log', () => {
        const updateLogUrl = '/logs/{log_id}';
        const formData = new FormData();
        formData.append('file', fs.readFileSync('test/test_log.csv'), {
            filename: 'test_log.csv',
        });
        it('should update log', async () => {
            return await spec()
                .patch(updateLogUrl)
                .withPathParams('log_id', '$S{log_id}')
                .withMultiPartFormData(formData)
                .expectStatus(200)
                .expectJsonLike({
                    name: 'test_log',
                    well_id: '$S{well_id}',
                    id: '$S{log_id}',
                });
        });
        it("should fail log id doesn't exist", async () => {
            return await spec()
                .patch(updateLogUrl)
                .withPathParams(
                    'log_id',
                    'faa01015-1d8c-4411-8a35-ae2eb8110af7',
                )
                .withMultiPartFormData(formData)
                .expectStatus(404)
                .expectJson({
                    statusCode: 404,
                    message: 'not found',
                    error: "log with id faa01015-1d8c-4411-8a35-ae2eb8110af7 doesn't exist",
                });
        });
    });
    describe('Get log file', () => {
        it('should return log file data', async () => {
            return await spec()
                .get('/logs/{log_id}')
                .withPathParams('log_id', '$S{log_id}')
                .expectStatus(200);
        });
        it("should fail log id doesn't exist", async () => {
            return await spec()
                .get('/logs/{log_id}')
                .withPathParams(
                    'log_id',
                    'faa01015-1d8c-4411-8a35-ae2eb8110af7',
                )
                .expectStatus(404)
                .expectJson({
                    statusCode: 404,
                    message: 'not found',
                    error: "log with id faa01015-1d8c-4411-8a35-ae2eb8110af7 doesn't exist",
                });
        });
    });
    describe('Get well data', () => {
        it('should get well data', async () => {
            return await spec()
                .get('/wells/{well_id}')
                .withPathParams('well_id', '$S{well_id}')
                .expectStatus(200)
                .expectJsonSchema({
                    type: 'object',
                    properties: {
                        created_at: {
                            type: 'string',
                        },
                        name: {
                            type: 'string',
                        },
                        x_location: {
                            type: 'string',
                        },
                        y_location: {
                            type: 'string',
                        },
                        kb: {
                            type: 'string',
                        },
                        td: {
                            type: 'string',
                        },
                        trajectory: {
                            type: 'string',
                        },
                        id: {
                            type: 'string',
                        },
                        project_id: {
                            type: 'string',
                        },
                        logs: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    created_at: {
                                        type: 'string',
                                    },
                                    name: {
                                        type: 'string',
                                    },
                                    id: {
                                        type: 'string',
                                    },
                                },
                            },
                        },
                    },
                });
        });
        it("should fail well id doesn't exist", async () => {
            return await spec()
                .get('/wells/{well_id}')
                .withPathParams(
                    'well_id',
                    '9a453060-d15f-4e14-b684-458bbcc5b4d5',
                )
                .expectStatus(404)
                .expectJson({
                    statusCode: 404,
                    message: 'not found',
                    error: "well with id 9a453060-d15f-4e14-b684-458bbcc5b4d5 doesn't exist",
                });
        });
    });
    describe('Delete log', () => {
        it('should delete log', async () => {
            return await spec()
                .delete('/logs/{log_id}')
                .withPathParams('log_id', '$S{log_id}')
                .expectStatus(200);
        });
        it("should fail log id doesn't exist", async () => {
            return await spec()
                .delete('/logs/{log_id}')
                .withPathParams(
                    'log_id',
                    '9a9a5af9-e020-4bd4-9b6a-46b54befb2d4',
                )
                .expectStatus(404)
                .expectJson({
                    statusCode: 404,
                    message: 'not found',
                    error: 'log with id 9a9a5af9-e020-4bd4-9b6a-46b54befb2d4 was not found',
                });
        });
    });
    afterAll(async () => {
        await app.close();
    });
});
