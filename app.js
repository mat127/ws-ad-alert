const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://www.windsurfing.cz/index.php?page=13';

axios.get(url)
  .then(function(response) {
    const $ = cheerio.load(response.data);
    const ads = $('.topinzint')
      .map((i, e) => $(e).text())
      .get();
    console.log(ads);
  })
  .catch(error => {
    console.log(error);
  });
