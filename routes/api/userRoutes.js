const router = require('express').Router();

const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../../controllers/userController.js');

// get all users; post/create new user @ /api/users
router.route('/').get(getUsers).post(createUser);

//Get a single user; put/update user; delete user @ /api/users/:userId
router
  .route('/:id')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;