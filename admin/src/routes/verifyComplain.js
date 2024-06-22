const express = require('express');
const router = express.Router();
const Complains = require("../models/complains")


router.get('/verifyComplain', async (req, res) => {
    try {

        let query = {
            status: { $in: ['Pending', 'Under Process'] }
        };

        // Check if the search query is provided
        if (req.query.search) {
            const searchRegex = new RegExp(req.query.search, 'i');

            query = {
                $or: [
                    { district: { $regex: searchRegex } },
                    { area: { $regex: searchRegex } },
                    { complainHeader: { $regex: searchRegex } },
                    { status: { $regex: searchRegex } },
                    // Adding complainNumber condition if the search query is a valid number
                    !isNaN(req.query.search)
                        ? { complainNumber: parseInt(req.query.search) }
                        : null,
                ].filter(Boolean), // Remove null values from the array
            };
        } else {
            query = {
                status: { $in: ['Pending', 'Under Process'] }
            };
        }

        // Fetch complaints based on the query
        const complains = await Complains.find(query);

        const coordinates = complains.map(complain => [
            parseFloat(complain.latitude),
            parseFloat(complain.longitude)
        ]);

        console.log(coordinates);

        // Return the complaints as JSON
        res.render('verifyComplain', { complains, searchQuery: req.query.search });
    } catch (error) {
        console.error('Error fetching complaints:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

// New route to handle complaint verification
router.post('/verifyComplain/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Complains.findByIdAndUpdate(id, { status: 'Under Process' });

        res.redirect('/verifyComplain');
    } catch (error) {
        console.error('Error updating status:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/solveComplain/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Complains.findByIdAndUpdate(id, { status: 'Solved' });

        res.redirect('/verifyComplain');
    } catch (error) {
        console.error('Error updating status:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router