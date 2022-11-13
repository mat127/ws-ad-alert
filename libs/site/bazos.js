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

    url = 'https://sport.bazos.cz/inzeraty/windsurf/';

    constructor(site, selector) {
        super();
        this.site = site;
        this.selector = selector;
    }

    parse($) {
        return $(this.selector)
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

export const bazosTop = new Bazos('top.bazos.cz', '.inzeraty .inzeratynadpis:has(.ztop)');
export const bazos = new Bazos('bazos.cz', '.inzeraty .inzeratynadpis:not(:has(.ztop))');
