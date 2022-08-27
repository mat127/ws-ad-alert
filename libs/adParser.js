import axios from 'axios';
import cheerio from 'cheerio';

const url = 'https://www.windsurfing.cz/index.php?page=13';

export async function parseAds() {
    const html = await axios.get(url);
    const $ = cheerio.load(html.data);
    return $('.topinzint')
        .map((i, e) => $(e).text())
        .get();
}