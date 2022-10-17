import axios from "axios";
import * as cheerio from "cheerio";
import { GetCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";

import { ddbDocClient } from "./ddbDocClient.js";
import { notify } from "./mailNotifier.js";

export class Site {

    async process() {
        const ads = await this.parseAds();
        const newAds = await this.getNewAds(ads);
        const promises = this.notify(newAds);
        if(newAds.length > 0) {
            promises.push(this.saveLastAd(newAds[0]));
        }
        return Promise.all(promises);
    }

    async parseAds() {
        const html = await axios.get(this.url);
        const $ = cheerio.load(html.data);
        return this.parse($);
    }

    async getNewAds(ads) {
        const lastAd = await this.getLastAd();
        const idx = ads.findIndex(function(ad) {
            if(ad.created < lastAd.created) {
                return true;
            }
            return ad.created === lastAd.created
                && ad.description === lastAd.description;
        });
        return idx >= 0 ? ads.slice(0, idx) : ads;
    }

    async getLastAd() {
        const getCommand = new GetCommand({
            TableName: 'ws-ads2',
            Key: {
                'site': this.site
            },
        });
        const data = await ddbDocClient.send(getCommand);
        if(data.Item === undefined) {
            throw { 'error': 'last ad not found', 'getCommandResponse': data};
        }
        return data.Item;
    }

    async saveLastAd(ad) {
        const updateCommand = new UpdateCommand({
            TableName: 'ws-ads2',
            Key: {
                'site': this.site
            },
            UpdateExpression: "set created = :c, description = :d",
            ExpressionAttributeValues: {
                ":c": ad.created,
                ":d": ad.description
            },
            ReturnValues: "ALL_NEW"
        });
        const data = await ddbDocClient.send(updateCommand);
        return data;
    }

    static reduceWhitespace(text) {
        return text.replace(/\s+/g, ' ');
    }

    notify(ads) {
        return ads.map(
            ad => notify(this.site, ad.description)
        );
    }
}