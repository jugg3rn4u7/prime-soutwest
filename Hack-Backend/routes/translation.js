/**
 * Created by user on 11/12/16.
 */
var express = require('express');

const RapidAPI = new require('rapidapi-connect');
const rapid = new RapidAPI('MLH_WINNERS', '436437cc-b281-436f-8c67-8992da83c897');


/* GET users listing. */
function translateText(req, res) {
    // res.send('respond with a resource');


    var textToTranslate = req.body.textToTranslate;
    var sourceLanguage = req.body.sourceLanguage;
    var targetLanguage = req.body.targetLanguage;

    if((textToTranslate || sourceLanguage || targetLanguage) == null){
        res.json({
            error: "You are missing values"
        });
    }

    rapid.call('GoogleTranslate', 'translate', {
        'string': textToTranslate,
        'apiKey': 'AIzaSyClTcZxrKx8fV7a6Yg0UlR34G8dJFRjadk',
        'targetLanguage': targetLanguage,
        'sourceLanguage': sourceLanguage

    }).on('success', (payload) => {
            /*YOUR CODE GOES HERE*/
            console.log(payload);
    res.json({});
    }).on('error', (payload) => {
            /*YOUR CODE GOES HERE*/
        res.json({
            error: "Unable to succesfully transalte text"
        });
    console.log(payload);
    res.json({});

    });
}

module.exports = {
    translateText: translateText
};
