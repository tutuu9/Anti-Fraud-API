import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Anti-Fraud API',
            version: '1.0.0',
            description: 'API for collecting user events and calculating fraud risk scores'
        },
        servers: [
            {
                url: 'http://localhost:5000'
            }
        ]
    },
    apis: ['src/routes/*.ts']
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);