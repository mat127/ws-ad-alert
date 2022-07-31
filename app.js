const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://www.windsurfing.cz/index.php?page=13';

function parseAds(html) {
    const $ = cheerio.load(html);
    return $('.topinzint')
      .map((i, e) => $(e).text())
      .get();
}

axios.get(url)
  .then(function(response) {
    const ads = parseAds(response.data);
    console.log(ads);
  })
  .catch(function(error) {
    console.log(error);
  });
