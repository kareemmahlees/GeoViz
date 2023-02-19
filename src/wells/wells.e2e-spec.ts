import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../app.module';
import { spec, request } from 'pactum';

describe('Wells e2e', () => {
    let app: INestApplication;
    const testUserEmail = 'testuser2@test.com';
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
    });

    describe('Create Well', () => {
        const createWellUrl = '/wells/{project_id}';
        const wellData = {
            name: 'well name',
            x_location: 'x _location',
            y_location: 'y_location',
            kb: 'well kb',
            td: 'well td',
            trajectory: 'well trajectory',
        };
        it('should create well', async () => {
            return await spec()
                .post(createWellUrl)
                .withJson(wellData)
                .expectStatus(201)
                .withPathParams('project_id', '$S{project_id}')
                .expectJsonLike(wellData)
                .stores('well_id', 'id');
        });
        it("should fail project id doesn't exist", async () => {
            return await spec()
                .post(createWellUrl)
                .withJson(wellData)
                .expectStatus(404)
                .withPathParams(
                    'project_id',
                    'e3cde19e-0dac-4756-a102-eeefe47fd838',
                )
                .expectJsonLike({
                    statusCode: 404,
                    message: 'not found',
                    error: "project with id e3cde19e-0dac-4756-a102-eeefe47fd838 doesn't exist",
                });
        });
        it('should fail empty body', async () => {
            return await spec()
                .post(createWellUrl)
                .withJson({})
                .expectStatus(400)
                .withPathParams('project_id', '$S{project_id}')
                .expectJsonLike({
                    statusCode: 400,
                    message: [
                        'name must be a string',
                        'x_location must be a string',
                        'y_location must be a string',
                        'kb must be a string',
                        'td must be a string',
                        'trajectory must be a string',
                    ],
                    error: 'Bad Request',
                });
        });
    });

    describe('Update Well', () => {
        const updateWellUrl = '/wells/{well_id}';
        const updateWellData = {
            name: 'well name updated',
            x_location: 'x _location updated',
            y_location: 'y_location updated',
            kb: 'well kb updated',
            td: 'well td updated',
            trajectory: 'well trajectory updated',
        };
        it('should update well', async () => {
            return await spec()
                .patch(updateWellUrl)
                .withPathParams('well_id', '$S{well_id}')
                .withJson(updateWellData)
                .expectStatus(200)
                .expectJsonLike(updateWellData);
        });
        it("should fail well id doesn't exist", async () => {
            return await spec()
                .patch(updateWellUrl)
                .withPathParams(
                    'well_id',
                    '74a2ba28-d50d-4e87-a64e-735a03fa62aa',
                )
                .withJson(updateWellData)
                .expectStatus(404)
                .expectJson({
                    statusCode: 404,
                    message: 'not found',
                    error: "well with id 74a2ba28-d50d-4e87-a64e-735a03fa62aa doesn't exist",
                });
        });
    });

    describe('Get project details', () => {
        it('should get project details', async () => {
            return await spec()
                .get('/projects/{project_id}')
                .withPathParams('project_id', '$S{project_id}')
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
                        description: {
                            type: 'string',
                        },
                        location: {
                            type: 'string',
                        },
                        id: {
                            type: 'string',
                        },
                        wells: {
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
                                },
                            },
                        },
                    },
                });
        });
        it("should fail project id doesn't exist", async () => {
            return await spec()
                .get('/projects/{project_id}')
                .withPathParams(
                    'project_id',
                    'f9e0d7d8-ce03-475e-90cd-e84b24acff86',
                )
                .expectStatus(404)
                .withJson({
                    statusCode: 404,
                    message: 'not found',
                    error: "project with id f9e0d7d8-ce03-475e-90cd-e84b24acff86 doesn't exist",
                });
        });
    });

    describe('Delete Well', () => {
        const deleteWellUrl = '/wells/{well_id}';
        it('should delete well', async () => {
            return await spec()
                .delete(deleteWellUrl)
                .withPathParams('well_id', '$S{well_id}')
                .expectStatus(200);
        });
        it("should fail well id doesn't exist", async () => {
            return await spec()
                .delete(deleteWellUrl)
                .withPathParams(
                    'well_id',
                    '74a2ba28-d50d-4e87-a64e-735a03fa62aa',
                )
                .expectStatus(404)
                .expectJson({
                    statusCode: 404,
                    message: 'not found',
                    error: "well with id 74a2ba28-d50d-4e87-a64e-735a03fa62aa doesn't exist",
                });
        });
    });

    afterAll(async () => {
        await app.close();
    });
});
