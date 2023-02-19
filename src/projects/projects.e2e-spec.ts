import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../app.module';
import { spec, request } from 'pactum';

describe('Projects e2e', () => {
    let app: INestApplication;
    const test_user_email = 'testuser1@test.com';
    const test_user_password = 'password123';
    const userData = {
        email: test_user_email,
        phone: '+201006007952',
        password: test_user_password,
        first_name: 'test',
        last_name: 'family',
        gender: 'male',
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
                email: test_user_email,
                password: test_user_password,
            })
            .stores('access_token', 'access_token');
        request.setBearerToken('$S{access_token}');
    });

    describe('Create Project', () => {
        it('should create project', async () => {
            const create_project_data = {
                name: 'project 1',
                description: 'project1',
                location: 'project 1',
            };
            return await spec()
                .post('/projects')
                .withJson(create_project_data)
                .expectStatus(201)
                .expectJsonLike(create_project_data)
                .stores('project_id', 'id');
        });
        it('should fail empty body', async () => {
            return await spec()
                .post('/projects')
                .withJson({})
                .expectStatus(400)
                .expectJson({
                    statusCode: 400,
                    message: [
                        'name must be a string',
                        'description must be a string',
                        'location must be a string',
                    ],
                    error: 'Bad Request',
                });
        });
    });
    describe('Get all Projects', () => {
        it('should get all projects', async () => {
            return await spec()
                .get('/projects/all')
                .expectStatus(200)
                .expectJsonSchema({
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: {
                                type: 'string',
                            },
                            create_at: {
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
                        },
                    },
                    minItems: 1,
                });
        });
    });
    describe('Update Project', () => {
        const update_project_data = {
            name: 'project name updated',
            description: 'project description updated',
            location: 'project location updated',
        };
        const update_project_url = '/projects/{project_id}';
        it('should update project', async () => {
            return await spec()
                .patch(update_project_url)
                .withPathParams('project_id', '$S{project_id}')
                .withJson(update_project_data)
                .expectStatus(200)
                .expectJsonLike(update_project_data);
        });
        it('should fail invalid project id ', async () => {
            return await spec()
                .patch(update_project_url)
                .withPathParams('project_id', 'someinvalidprojectid')
                .expectStatus(400)
                .expectJson({
                    statusCode: 400,
                    message: 'Validation failed (uuid is expected)',
                    error: 'Bad Request',
                });
        });
        it("should fail project id doesn't exist", async () => {
            return await spec()
                .patch(update_project_url)
                .withPathParams(
                    'project_id',
                    'db96844f-42c1-401c-8085-73fa79acaff4',
                )
                .expectStatus(404)
                .expectJson({
                    statusCode: 404,
                    message: 'not found',
                    error: "project with id db96844f-42c1-401c-8085-73fa79acaff4 doesn't exist",
                });
        });
    });

    describe('Delete Project', () => {
        it('should delete project', async () => {
            return await spec()
                .delete('/projects/{project_id}')
                .withPathParams('project_id', '$S{project_id}')
                .expectStatus(200);
        });
        it("should fail project id doesn't exist", async () => {
            return await spec()
                .delete('/projects/{project_id}')
                .withPathParams(
                    'project_id',
                    'db96844f-42c1-401c-8085-73fa79acaff4',
                )
                .expectStatus(404)
                .expectJson({
                    statusCode: 404,
                    message: 'not found',
                    error: "project with id db96844f-42c1-401c-8085-73fa79acaff4 doesn't exist",
                });
        });
    });

    afterAll(async () => {
        await app.close();
    });
});
