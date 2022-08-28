import { parseAds } from './libs/adParser.js';
import { getLastAd, saveLastAd } from './libs/ddbAdRepository.js';
import { notify } from './libs/mailNotifier.js';

async function getNewAds(ads) {
    const lastAd = await getLastAd();
    const idx = ads.indexOf(lastAd);
    return idx >= 0 ? ads.slice(0, idx) : ads;
}

// export for AWS as a lambda handler
export async function run() {
    try {
        const ads = await parseAds();
        const newAds = await getNewAds(ads);
        const promises = [ notify(newAds) ];
        if(newAds.length > 0) {
            promises.push(saveLastAd(newAds[0]));
        }
        return Promise.all(promises);
    }
    catch(error) {
        console.log(error);
    }
}

run()
    .then(() => process.exit());
