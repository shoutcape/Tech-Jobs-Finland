const express = require('express');
const router = express.Router();




router.get('/', async (req, res) => {
  let allJobs = [];
  const fetchAllJobs = async (pageNumber = 1) => {
    //const itDuunitApi = `https://duunitori.fi/api/v1/fdfadafa0ccb207844460fe7a7b9c73ecc9d1a04/jobentries?area=&format=json&page=${pageNumber}&page_size=100&search=&t=1729169399&tag=ohjelmistokehitt%C3%A4j%C3%A4&tag=full+stack+developer&tag=backend+developer&tag=frontend+developer&tag=web+developer&tag=j%C3%A4rjestelm%C3%A4asiantuntija&tag=scrum+master&tag=data+analyst&tag=k%C3%A4ytt%C3%B6liittym%C3%A4suunnittelija&tag=UX+designer&tag=UIX+Designer&tag0=tieto-+ja+tietoliikennetekniikka`;
const itDuunitApi = `https://duunitori.fi/api/v1/fdfadafa0ccb207844460fe7a7b9c73ecc9d1a04/jobentries?area=&format=json&page=${pageNumber}&page_size=100&search=&t=1729175939&tag0=tieto-+ja+tietoliikennetekniikka`
    const response = await fetch(itDuunitApi);
    const data = await response.json();
    allJobs.push(...data.results);
    if (data.next) {
      await fetchAllJobs(pageNumber + 1);
    }
  };
  try {
    await fetchAllJobs();
    res.json({ allJobs });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(401).json(error.message);
  }
});

module.exports = router;


