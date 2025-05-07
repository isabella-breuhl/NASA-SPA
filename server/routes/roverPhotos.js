var express = require('express');
var router = express.Router();
const RoverPhoto = require('../models/roverPhotos');

// CREATE
router.post('/', async (req, res) => { 
  try {
    const photo = await RoverPhoto.create(req.body);
    res.status(201).json(photo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET ONE
router.get('/', async (req, res) => {
  try {
    const photo = await RoverPhoto.findOne({ owner: req.query.owner, url: req.query.url });
    res.json(photo);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

/* Below syntax for .find() from https://www.geeksforgeeks.org/mongodb-check-the-existence-of-the-fields-in-the-specified-collection/ */
// GET COMMENTED ONES
router.get('/:id/comments', async (req, res) => {
  try {
    const photos = await RoverPhoto.find({ 
      owner: req.params.id,
      note: { $exists: true, $ne: '' || null}
    });
    res.json(photos);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

 // UPDATE
 router.put('/:id', async (req, res) => {
    try {
      const updatedPhoto = await RoverPhoto.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true } // returns the updated document
      );
      if (!updatedPhoto) {
        return res.status(404).json('User not found');
      }
      res.json(updatedPhoto);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
 
 // DELETE
 router.delete('/:id', async (req, res) => {
   try {
     const deletedPhoto = await RoverPhoto.findByIdAndDelete(req.params.id);     
     if (!deletedPhoto) {
       return res.status(404).json('Photo not found');
     }
     res.status(200).json('Photo deleted successfully');
   } catch (error) {
     res.status(400).json({ error: error.message });
   }
 });
 
module.exports = router;