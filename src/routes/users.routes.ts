import { Router, request } from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';
import CreateUserSevice from '../service/CreateUserService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UpdateUserAvatarService from '../service/UpdateUserAvatarService';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;
    const createUser = new CreateUserSevice();
    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.send(user);
  } catch (err) {
    return response.status(400).json({
      error: err.message,
    });
  }
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    try {
      const updateUserAvatar = new UpdateUserAvatarService();
      const user = await updateUserAvatar.execute({
        user_id: request.user.id,
        avatarFileName: request.file.filename,
      });
      delete user.password;
      return response.json(user);
    } catch (err) {
      return response.status(400).json({
        error: err.message,
      });
    }
  },
);

export default usersRouter;
