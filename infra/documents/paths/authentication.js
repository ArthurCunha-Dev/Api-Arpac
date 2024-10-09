export default
{
  '/v1/auth/login': {
    post: {
      summary: 'Authentication user',
      tags: ['Auth'],
      description: 'Authentication user',
      parameters: [
        {
          in: 'body',
          name: 'body',
          description: 'description',
          require: 'require',
          schema: {
            type: 'object',
            properties: {
                email: {
                type: 'string',
                require: true,
                example: 'escola@email.com'               
              }, 
              password: {
                type: 'string',
                require: true,
                example: '125@Teste'               
              },
            }
          }
        }
      ],
    responses: {
      200: {
        description: 'Located successfully'
      },
      400: {
        description: 'Bad Request'
      },
      404: {
        description: 'Not found'
      },
      409: {
        description: 'Conflict, already exists'
      },
      500: {
        description: 'Internal server Error'
      }
    }
    }
   
  },
  '/v1/auth/forgot_password': {
    post: {
      summary: 'Forgot password',
      tags: ['Auth'],
      description: 'Forgot password',
      parameters: [
        {
          in: 'body',
          name: 'body',
          description: 'description',
          require: 'require',
          schema: {
            type: 'object',
            properties: {
                email: {
                type: 'string',
                require: true,
                example: 'escola@email.com'
              }
            }
          }
        }
      ],
      responses: {
        200: {
          description: 'Requested successfully'
        },
        400: {
          description: 'Bad Request'
        },
        404: {
          description: 'Not found'
        },

        500: {
          description: 'Internal Server Error'
        }
      }
      }
    },
    '/v1/auth/new_password': {
      post: {
        summary: 'Create new password',
        tags: ['Auth'],
        description: 'Create new password',
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'description',
            require: 'require',
            schema: {
              type: 'object',
              properties: {
                code: {
                  type: 'string',
                  require: true,
                  example: '81e7a77f'
                },
                newPassword: {
                  type: 'string',
                  require: true,
                  example: '125@Teste'               
                },
                confirmNewPassword: {
                  type: 'string',
                  require: true,
                  example: '125@Teste'               
                },
              }
            }
          }
        ],
        responses: {
          200: {
            description: 'Requested successfully'
          },
          400: {
            description: 'Bad Request'
          },
          404: {
            description: 'Not found'
          },
  
          500: {
            description: 'Internal Server Error'
          }
        }
        }
      },
      '/v1/auth/refresh_token': {
        post: {
          summary: 'Refresch token',
          tags: ['Auth'],
          description: 'Refresch token',
          parameters: [
            {
              in: 'body',
              name: 'body',
              description: 'description',
              require: 'require',
              schema: {
                type: 'object',
                properties: {
                  refreshToken: {
                    type: 'string',
                    require: true,
                    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzZXIiOiJYMm5jOXVhZFIweUFBVW1rOEp0UWRnPT0iLCJleHBpcmVzSW4iOjE3MDE1Mjc5MjY4NjAsImlhdCI6MTY5ODkzNTkzMH0.BU18PRN4mirBxYfKz7x6JrlAq0D1Ha6qDxD4VdWxh0I'                  
                  }
                }
              }
            }
          ],
          responses: {
            200: {
              description: 'Requested successfully'
            },
            400: {
              description: 'Bad Request'
            },
            404: {
              description: 'Not found'
            },
    
            500: {
              description: 'Internal Server Error'
            }
          }
          }
        },
}



