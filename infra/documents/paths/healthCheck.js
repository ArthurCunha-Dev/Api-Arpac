export default
{
  '/healthcheck': {
    get: {
      tags: ['Health Check'],
      description: '',
      parameters: [],
      responses: {
        200: {
          description: 'OK'
        },
        500: {
          description: 'Internal Server Error'
        }
      }
    }
  }
}