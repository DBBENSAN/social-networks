const router = require('express').Router();

const {
   getUsers,
   getSingleUser,
   createUser,
   deleteUser,
   updateUser,
   addFriend,
   removeFriend
} = require('../../controllers/userController');

router.route('/')
   .get(getUsers)
   .post(createUser);

router.route('/:id')
   .get(getSingleUser)
   .put(updateUser)
   .delete(deleteUser);

router.route('/:userId/friends/')
   .post(addFriend);

router.route('/:id/friends/')
   .delete(removeFriend);

module.exports = router;