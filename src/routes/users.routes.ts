import { Router } from 'express';

import { parseISO } from 'date-fns';

import { getCustomRepository } from 'typeorm';
import AppointmentRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../service/CreateAppointmentSerivice';
import CreateUserSevice from '../service/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;
    const createUser = new CreateUserSevice();
    const user = await createUser.execute({
      name,
      email,
      password,
    });
    return response.send(user);
  } catch (err) {
    return response.status(400).json({
      error: err.message,
    });
  }
});

export default usersRouter;
