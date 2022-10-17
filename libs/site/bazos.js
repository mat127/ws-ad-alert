import { Site } from "../site.js";

const dateRe = /\[\D*(\d+)\.\D*(\d+)\.\D*(\d+)\]/;

function parseDate(text) {
    const parsed = dateRe.exec(text);
    if(parsed === null) {
        return 'unknown';
    }
    const month = parsed[2].padStart(2, '0');
    const day = parsed[1].padStart(2, '0');
    return `${parsed[3]}-${month}-${day}`;
}

class Bazos extends Site {

    site = 'bazos.cz';

    url = 'https://sport.bazos.cz/inzeraty/windsurf/';

    parse($) {
        return $('.inzeraty .inzeratynadpis')
            .map(function (i, e) {
                const dateStr = $('span[class=velikost10]', e).text();
                const title = $('.nadpis', e).text();
                const description = $('.popis', e).text();
                return {
                    description: Site.reduceWhitespace(title.concat(' ', description)),
                    created: parseDate(dateStr)
                };
            })
            .get();
    }
}

export default new Bazos();