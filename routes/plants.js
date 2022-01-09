var express = require('express');
const { update } = require('../models/plant');
const Plant = require('../models/plant');
var router = express.Router();

//Router to handle get requests
router.get('/', async (req, res) => {
    try {
        //get all plants from database
        const plants = await Plant.find();
        //push a response to user with the data from database
        res.json(plants);
    } catch(err) {
        //Push an error to user with code and error-message if anything goes wrong.
        res.status(500).json({ message: err.message });
    }
});

//Get plant by ID
router.get('/:id', getPlant, (req, res) => {
    
    //res.course calls function that gets a single course
    //res.send sends the response to user.
    res.send(res.plants);

    });

//Delete a plant
router.delete('/:id', getPlant, async (req, res) => {

    try {
        //Removes the selected plant from database
        await res.plant.remove();
        //response to user that the plant is deleted.
        res.json({ message: 'The plant is now deleted.'});
    } catch(err) {
        //Push an error to user with code and error-message if anything goes wrong.
        res.status(500).json({ message: err.message});
    }

    });

//Update a plant
router.put('/:id', getPlant, async (req, res) => {

    //check if the response from user contains data.
    if(req.body.plantname != null) {
        res.plant.plantname = req.body.plantname;
    }
    if(req.body.planttype != null) {
        res.plant.planttype = req.body.planttype;
    }
    if(req.body.plantfirstwaterdate != null) {
        res.plant.plantfirstwaterdate = req.body.plantfirstwaterdate;
    }
    if(req.body.plantwaterint != null) {
        res.plant.plantwaterint = req.body.plantwaterint;
    }
    if(req.body.plantcomments != null) {
        res.plant.plantcomments = req.body.plantcomments;
    }

    try {
        //Update plant on database
        const updatePlant = await res.plant.save()
        //response to user with the updated data.
        res.json(updatePlant);
    } catch(err) {
        //Push an error to user with code and error-message if anything goes wrong.
        res.status(400).json({ message: err.message });
    }

});

//Add new plant
router.post('/', async (req, res) => {
    //create a new variable plant and populate in with the data from user
    const plant = new Plant ({
        plantname: req.body.plantname,
        planttype: req.body.planttype,
        plantfirstwaterdate: req.body.plantfirstwaterdate,
        plantwaterint: req.body.plantwaterint,
        plantcomments: req.body.plantcomments
    });
    try {
        //add the new plant to the database
        const newPlant = await plant.save()
        //response to the customer with data from the added plant
        res.status(201).json(newPlant);
    } catch(err) {
        //Push an error to user with code and error-message if anything goes wrong.
        res.status(400).json({ message:err.message});
    }
});


//fucntion to get data from a single plant
async function getPlant(req, res, next){
    let plant;
    try {
        //get data from a specific id.
        plant = await Plant.findById(req.params.id);
        //check if the response from database is empty
        if (plant == null) {
            //response to user that the plant couldnt be found
            return res.status(404).json({ message: 'Cant find the plant' });
        }
    } catch (err) {
        //Push an error to user with code and error-message if anything goes wrong.
        return res.status(500).json({ message: err.message });
    }
    res.plant = plant;
    next();
}
    
module.exports = router;