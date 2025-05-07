var express = require('express');
var router = express.Router();
 
const API_KEY = 'y1ltQAYqVNiI0gtT31fouXY8VHh3WBtYbKTSCRdr';

// GET astroid data from NASA
router.get('/astroids/:date', async (req, res) => {
    let date = req.params.date;
    const url = `https://api.nasa.gov/neo/rest/v1/feed?api_key=${API_KEY}&start_date=${date}&end_date=${date}`;
   
    try {
        fetch(url)
          .then( data => data.json())
          .then( data => res.json(data.near_earth_objects[date]));
    } catch (error) {
      res.status(500).json({error: 'Cannot fetch on server'});
    }
});
 
// Filter astroids with body filter
router.post('/astroids', async (req, res) => {
  let astroidObj = req.body.astroids;
  let filterBool = req.body.filter;

  try {
    let response = astroidObj.filter( (photo) => photo.is_potentially_hazardous_asteroid === filterBool);
    res.json(response);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

// GET 1 dscovr photo from NASA 
router.get('/dscovr/:date', (req, res) => {
  let date = req.params.date;
  const url = `https://api.nasa.gov/EPIC/api/natural/date/${date}?api_key=${API_KEY}`;
 
  /* Code to change date format from: https://webdeveloper.com/community/386640-replace-with-in-a-date-string/ */
  date = date.replace(/-/g, '/');
  
  try {
      fetch(url)
        .then( data => data.json())
        .then( data => {
          let photoUrl = `https://api.nasa.gov/EPIC/archive/natural/${date}/png/${data[0].image}.png?api_key=${API_KEY}`;
          res.json(photoUrl)
        });
  } catch (error) {
    res.status(500).json({error: 'Cannot fetch on server'});
  }
});

// GET rover data from NASA 
router.get('/rover/:date', (req, res) => {
  let date = req.params.date;
  const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&api_key=${API_KEY}`;

  try {
      fetch(url)
        .then( data => data.json())
        .then( data => res.json(data));
  } catch (error) {
    res.status(500).json({error: 'Cannot fetch on server'});
  }
});

module.exports = router;