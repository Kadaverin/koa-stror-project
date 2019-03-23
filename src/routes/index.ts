import { composeRouters } from './../utils';
import { StubRouter } from './stub';
import { UsersRouter } from './users';
import { BooksRouter } from './books';
import { ServicesRouter } from './services';

const composedRouters = composeRouters([
  UsersRouter,
  StubRouter,
  BooksRouter,
  ServicesRouter,
]);

export default composedRouters;
