var express = require('express');
var router = express.Router();
const DscovrPhoto = require('../models/dscovrPhotos');

// CREATE
router.post('/', async (req, res) => {
  try {
    const photo = await DscovrPhoto.create(req.body);
    res.status(201).json(photo);
  } catch (error) { 
    res.status(400).json({ error: error.message });
  }
});

// READ ONE
router.get('/:id', async (req, res) => {
  try {
    const dscovrPhoto = await DscovrPhoto.findById(req.params.id);
    res.json(dscovrPhoto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET ONE
router.get('/', async (req, res) => {
  try {
    const photo = await DscovrPhoto.findOne({ owner: req.query.owner, url: req.query.url });
    res.json(photo);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
   try {
     const update = await DscovrPhoto.findByIdAndUpdate(
       req.params.id,
       req.body,
       { new: true } // returns the updated document
     );
     if (!update) {
       return res.status(404).json('User not found');
     }
     res.json(update);
   } catch (error) {
     res.status(400).json({ error: error.message });
   }
 });

module.exports = router;