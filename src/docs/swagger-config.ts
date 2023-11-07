const host = `${process.env.BASE_URL}:${process.env.PORT}` || 'http://localhost:3333';

const swaggerDefinition = {
    openapi: "3.0.3",
    info: {
        title: "API to perform authentication with JSON Web Token.",
        description: "The purpose of this API is to authenticate something using the JSON Web Token.",
        termsOfService: "https://github.com/shunny2/jwt-prisma",
        contact: {
            name: "API Support",
            email: "alexander.davis.098@gmail.com"
        },
        license: {
            name: "MIT License",
            url: "https://opensource.org/licenses/MIT"
        },
        version: "1.0.0"
    },
    servers: [
        {
            url: `${host}/api/v1`,
            description: "testing API"
        }
    ],
    paths: {
        "/auth": {
            get: {
                summary: "User authentication",
                description: "This route is responsible for verifying that you're authenticated.",
                tags: [
                    "Auth"
                ],
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                responses: {
                    200: {
                        description: "Welcome to the API"
                    },
                    401: {
                        description: "Unauthorized"
                    },
                    403: {
                        description: "Forbidden"
                    }
                }
            }
        },
        "/auth/me": {
            get: {
                summary: "Authenticated user data",
                description: "This route is responsible for returning authenticated user data.",
                tags: [
                    "Auth"
                ],
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                responses: {
                    200: {
                        description: "OK",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    $ref: "#/components/schemas/User"
                                },
                                examples: {
                                    user: {
                                        value: {
                                            user: {
                                                id: "string",
                                                name: "string",
                                                email: "string",
                                                createdAt: "string"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    401: {
                        description: "Unauthorized"
                    },
                    403: {
                        description: "Forbidden"
                    }
                }
            }
        },
        "/auth/login": {
            post: {
                summary: "User Sign in",
                description: "This route is responsible for signing in to the user, generating the token, and refreshing the token.",
                tags: [
                    "Auth"
                ],
                responses: {
                    200: {
                        description: "OK",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    $ref: "#/components/schemas/User"
                                },
                                examples: {
                                    user: {
                                        value: {
                                            token: "string"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    400: {
                        description: "Bad request"
                    },
                    500: {
                        description: "Unable to register. There was an internal server error."
                    }
                },
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/User"
                            },
                            examples: {
                                user: {
                                    value: {
                                        email: "johndoe@gmail.com",
                                        password: "12345678"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/auth/refresh": {
            post: {
                summary: "Refresh Token",
                description: "This route is responsible for updating the user's token.",
                tags: [
                    "Auth"
                ],
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                responses: {
                    200: {
                        description: "OK",
                        content: {
                            "application/json": {
                                examples: {
                                    token: {
                                        value: {
                                            message: "string",
                                            token: "string"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    401: {
                        description: "Unauthorized"
                    },
                    403: {
                        description: "Forbidden"
                    },
                    500: {
                        description: "Unable to update. There was an internal server error."
                    }
                }
            }
        },
        "/auth/logout": {
            post: {
                summary: "Logout",
                description: "This route is responsible for terminating the user's session.",
                tags: [
                    "Auth"
                ],
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                responses: {
                    204: {
                        description: "No Content",
                    },
                    401: {
                        description: "Unauthorized"
                    },
                    403: {
                        description: "Forbidden"
                    },
                    500: {
                        description: "Unable to update. There was an internal server error."
                    }
                }
            }
        },
        "/users": {
            post: {
                summary: "User Register",
                description: "This route is responsible for registering new users.",
                tags: [
                    "Users"
                ],
                responses: {
                    201: {
                        description: "Created",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    $ref: "#/components/schemas/User"
                                },
                                examples: {
                                    user: {
                                        value: {
                                            id: "string"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    400: {
                        description: "Bad request"
                    },
                    500: {
                        description: "Unable to register. There was an internal server error."
                    }
                },
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/User"
                            },
                            examples: {
                                user: {
                                    value: {
                                        name: "John Doe",
                                        email: "johndoe@gmail.com",
                                        password: "12345678",
                                        repeatPassword: "12345678"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            get: {
                summary: "Number of users",
                description: "This route is responsible for displaying the number of registered users.",
                tags: [
                    "Users"
                ],
                responses: {
                    200: {
                        description: "OK",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {
                                        $ref: "#/components/schemas/User"
                                    }
                                },
                                examples: {
                                    user: {
                                        value: {
                                            count: "number"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    500: {
                        description: "Could not load the user list. An internal server error has occurred."
                    }
                }
            }
        },
        "/users/search": {
            get: {
                summary: "Returns a users by name",
                description: "This route is responsible for returning specific users based on the given name.",
                tags: [
                    "Users"
                ],
                parameters: [
                    {
                        in: "query",
                        name: "search",
                        description: "Name of the user to get",
                        required: true,
                        schema: {
                            type: "string"
                        }
                    },
                    {
                        in: "query",
                        name: "take",
                        description: "The number of records you want to fetch from the database.",
                        schema: {
                            type: "number"
                        }
                    },
                    {
                        in: "query",
                        name: "skip",
                        description: "The number of records you want to fetch from the database.",
                        schema: {
                            type: "number"
                        }
                    },
                ],
                responses: {
                    200: {
                        description: "OK",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    $ref: "#/components/schemas/User"
                                },
                                examples: {
                                    user: {
                                        value: {
                                            user: [
                                                {
                                                    id: "string",
                                                    name: "string",
                                                    email: "string",
                                                    password: "string",
                                                    createdAt: "string"
                                                }
                                            ]
                                        }
                                    }
                                }
                            }
                        }
                    },
                    404: {
                        description: "This user does not exist."
                    },
                    500: {
                        description: "Error finding user. An internal server error has occurred."
                    }
                }
            }
        }
    },
    components: {
        schemas: {
            User: {
                type: "object",
                properties: {
                    id: {
                        type: "string"
                    },
                    name: {
                        type: "string"
                    },
                    email: {
                        type: "string"
                    },
                    password: {
                        type: "string"
                    },
                    createdAt: {
                        type: "string"
                    }
                }
            }
        },
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT"
            }
        }
    }
};

export const SwaggerConfigs = {
    swaggerDefinition,
    host,
    apis: [
        'src/routes/*.js'
    ]
}