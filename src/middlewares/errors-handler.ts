import { INTERNAL_SERVER_ERROR } from 'http-status-codes';

async function errorsHandler(ctx, next) {
  try {
    await next();
  } catch (error) {
    console.log(error);
    const status = error.status || error.statusCode || INTERNAL_SERVER_ERROR;
    ctx.status = status
    ctx.body =  {
      code: status,
      message: error.message || error,
    }
  }
}

export { errorsHandler };
