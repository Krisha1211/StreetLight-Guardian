const express = require('express');
const router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');
const moment = require('moment');
const { ObjectId } = require('mongodb');
const Complains = require('../models/complains');

// router.get('/dashboard', connectEnsureLogin.ensureLoggedIn(), (req, res) => {

//     // This route is protected; only authenticated users can access it
//     res.render('dashboard'); // Render your dashboard template or perform other actions

// });

router.get('/',async (req, res) => {

    try {
        const now = new Date();
        const twentyFourHoursAgo = moment(now).subtract(24, 'hours').toDate();
    
        const countLast24Hours = await Complains.countDocuments({
            timestamp: { $gte: twentyFourHoursAgo, $lte: now }
        });

        const lastWeek = moment(now).subtract(7, 'days').toDate();

        const countLastWeek = await Complains.countDocuments({
            timestamp: { $gte: lastWeek, $lte: now }
        });

        const lastMonth = moment(now).subtract(1, 'months').toDate();

        const countLastMonth = await Complains.countDocuments({
            timestamp: { $gte: lastMonth, $lte: now }
        });

        const countPending = await Complains.countDocuments({ status: 'Pending' });

        const countUnderProcess = await Complains.countDocuments({ status: 'Under Process' });

        const countSolved = await Complains.countDocuments({ status: 'Solved' });
    
    
        // This route is protected; only authenticated users can access it
        res.render('dashboard',{countLast24Hours,countLastWeek,countLastMonth,countPending,countSolved,countUnderProcess}); 
    } catch (error) {
        console.error('Error updating status:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }// Render your dashboard template or perform other actions

    
});

module.exports = router;
