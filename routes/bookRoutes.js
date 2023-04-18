const express = require('express');
const bookController = require('../controllers/bookController');
const reviewRouter = require('./reviewRoutes');
const authController = require('../controllers/authController');

const router = express.Router();
router
  .get('/bestsellers', bookController.aliasBestsellers, bookController.getAllBooks)
  .get('/audiobooks', bookController.aliasAudiobooks, bookController.getAllBooks)
  .get('/latest', bookController.aliasLatestBooks, bookController.getAllBooks)
  .get('/indian', bookController.getIndianBooks)
  .post(authController.protect, authController.restrictTo('author', 'admin'), bookController.createBook)
  .patch(authController.protect, authController.restrictTo('author', 'admin'), bookController.updateBook)
  .delete(authController.protect, authController.restrictTo('author', 'admin'), bookController.deleteBook);
// .get('/regional', bookController.getRegionalBooks);

router.route('/search').get(bookController.aliasBestsellers, bookController.searchBooks);

// router.route('/userBooks').get(bookController.getUserBooks);

router.route('/:slug').get(bookController.getBook);

router.route('/:slug/similarBooks').get(bookController.getSimilarBooks);

// Nested routes
router.use('/:bookSlug/reviews', reviewRouter);

// router.use(authController.protect);

module.exports = router;
