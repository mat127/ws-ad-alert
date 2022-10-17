import { Site } from "../site.js";

class WindsurfingCz extends Site {

    site = 'windsurfing.cz';

    url = 'https://www.windsurfing.cz/index.php?page=13';


    parse($) {
        return $('table table table table[width=490]')
            .map(function(i, e) {
                const description = $('div[class=topinzint]', e).text().trim();
                return {
                    description: Site.reduceWhitespace(description),
                    created: $('tr:nth-child(1) td:nth-child(2)', e).text().trim()
                };
            })
            .get();
    }
}

export default new WindsurfingCz();