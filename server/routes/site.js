var express = require('express');
var router = express.Router();

const API_KEY = 'y1ltQAYqVNiI0gtT31fouXY8VHh3WBtYbKTSCRdr';

/* GET APOD for public site */
router.get('/', async(req, res) => {

  /* Got date formatting code from: https://www.freecodecamp.org/news/javascript-get-current-date-todays-date-in-js/ */
  let date = new Date();
  let yyyy = date.getFullYear();
  let mm = date.getMonth() + 1;
  let dd = date.getDate();
  date = `${yyyy}-${mm}-${dd}`;
  
  const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`;

  try {
    const nasaResponse = await fetch(url);
    const data = await nasaResponse.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({error: 'Cannot fetch APOD on server'});
  }
});

module.exports = router;