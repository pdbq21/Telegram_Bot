/**
 * Created by ruslan on 28.05.17.
 */
const fs = require('fs');
const request = require('request');
const TelegramBot = require('node-telegram-bot-api');
const token = '334778612:AAHzWw0sGy6jsAdGhykLDwFtjCABN8ATwHA';
const bot = new TelegramBot(token, {polling: true});
bot.on("inline_query", (query) => {
    const link = (text) => {
        const params = {
            tl: 'uk',
            ie: 'UTF-8',
            client: 'gtx',
            url: 'https://translate.google.com/translate_tts'
        };
        return `${params.url}?ie=${params.ie}&q=${encodeURIComponent(text)}&tl=${params.tl}&client=${params.client}`
    };
    bot.answerInlineQuery(query.id, [
        {
            type: "audio",
            id: query.id,
            audio_url: link(query.query),
            title: "Audio massage",
            performer: (query.query.length > 20) ? query.query.substring(0, 17) + '...' : query.query
        }
    ]);
});