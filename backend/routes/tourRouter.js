const express = require('express');
const tourController = require('../controllers/tourController');

const router = express.Router();

router
    .route('/top-5-cheap')
    .get(tourController.aliasTopTours, tourController.getAllTours);

router
    .route('/monthly-plan/:year')
    .get(tourController.getMonthlyPlan);

router
    .route('/tour-stats')
    .get(tourController.getTourStats);

router
    .route('/tours-within/:distance/center/:latlng/unit/:unit')
    .get(tourController.getToursWithin);

router
    .route('/distances/:latlng/unit/:unit')
    .get(tourController.getDistances);

router
    .route('/')
    .get(tourController.getAllTours)
    .post(tourController.createTour);

router
    .route('/:id')
    .get(tourController.getTour)
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour);

module.exports = router;