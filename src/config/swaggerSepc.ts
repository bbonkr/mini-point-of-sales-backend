import { SwaggerDefinition } from 'swagger-jsdoc';
import swaggerJSDoc = require('swagger-jsdoc');
import path from 'path';
import { Http2SecureServer } from 'http2';

const swaggerDefinition: SwaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'MiniPos Backend',
        version: '0.0.1',
        description: 'MiniPos Backend apis',
    },
    schemes: ['http'],
    components: {
        securitySchemes: {
            bearerAuth: {
                // type: 'http'
                // scheme: 'bearer',
                // bearerFormat: 'JWT',
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
            },
        },
        res: {
            badRequest: {
                description: '잘못된 요청',
                schema: {
                    $ref: '#/components/jsonResult',
                },
            },
            forbidden: {
                description: '권한 없음',
                schema: {
                    $ref: '#/components/jsonResult',
                },
            },
            unauthorized: {
                description: '인증 안됨',
                schema: {
                    $ref: '#/components/jsonResult',
                },
            },
            notFound: {
                description: '리소스 없음',
                schema: {
                    $ref: '#/components/jsonResult',
                },
            },
            serverError: {
                description: '서버 예외 발생',
                schema: {
                    $ref: '#/components/jsonResult',
                },
            },
        },
        jsonResult: {
            type: 'object',
            description: '응답 객체 기본 형식',
            properties: {
                success: {
                    type: 'boolean',
                    description: '요청 성공 여부',
                },
                data: {
                    type: 'object',
                    description: '응답 데이터',
                },
                message: {
                    type: 'string',
                    description: '응답 메시지',
                },
            },
        },
    },
};

const swaggerDocsOptions: swaggerJSDoc.Options = {
    swaggerDefinition: swaggerDefinition,
    apis: [path.join(__dirname, '../controllers/**/*.controller.ts')],
};

export const swaggerSpec = swaggerJSDoc(swaggerDocsOptions);
