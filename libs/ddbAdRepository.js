import { GetCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDocClient } from "../libs/ddbDocClient.js";

export async function saveLastAd(ad) {
    const updateCommand = new UpdateCommand({
        TableName: 'ws-ads',
        Key: {
            'tag': 'last'
        },
        UpdateExpression: "set ad_text = :t",
        ExpressionAttributeValues: {
            ":t": ad
        },
        ReturnValues: "ALL_NEW"
    });
    const data = await ddbDocClient.send(updateCommand);
    return data;
};

export async function getLastAd() {
    const getCommand = new GetCommand({
        TableName: 'ws-ads',
        Key: {
            'tag': 'last'
        },
    });
    const data = await ddbDocClient.send(getCommand);
    if(data.Item === undefined) {
        throw { 'error': 'last ad not found', 'getCommandResponse': data};
    }
    return data.Item.ad_text;
};
