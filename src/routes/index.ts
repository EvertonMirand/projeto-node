import { Router } from 'express';

const routes = Router();

routes.post('/users', (request, reponse) => {
  const { name, email } = request.body;
  const user = {
    name,
    email,
  };
  return reponse.json(user);
});

export default routes;
