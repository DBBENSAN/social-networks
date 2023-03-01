const router = require('express').Router();

const {
   getThoughts,
   getSingleThought,
   createThought,
   updateThought,
   deleteThought,
   createReaction,
   deleteReaction,
} = require('../../controllers/thoughtController');

router.route('/').get(getThoughts).post(createThought);

router.route('/:id').get(getSingleThought).put(updateThought).delete(deleteThought);

router.route('/:id/reactions').post(createReaction);
