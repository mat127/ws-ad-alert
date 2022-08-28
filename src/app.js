import { parseAds } from '../libs/adParser.js';
import { getLastAd, saveLastAd } from '../libs/ddbAdRepository.js';

async function getNewAds(ads) {
    const lastAd = await getLastAd();
    const idx = ads.indexOf(lastAd);
    return idx >= 0 ? ads.slice(0, idx) : ads;
}

async function run() {
    try {
        const ads = await parseAds();
        const newAds = await getNewAds(ads);
        // TODO: notify new ads
        console.log(newAds);
        if(newAds.length > 0) {
            saveLastAd(newAds[0]);
        }
    }
    catch(error) {
        console.log(error);
    }
}

run();
