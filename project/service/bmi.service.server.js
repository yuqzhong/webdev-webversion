var unirest = require('unirest');
const app = require('../../express');

app.post('/api/project/bmiCal',bmiCal);


function bmiCal(req, res) {
    var weight = req.body.weight;
    var height = req.body.height;

    var sendJson = {
        "weight": {"value": weight, "unit": "kg"},
        "height": {"value": height, "unit": "cm"},
        "sex":"m",
        "age":"24",
        "waist":"35.00",
        "hip":"46.00"
    };

    // var json = {"weight":{"value":"50.00","unit":"kg"},
    //     "height":{"value":"165.00","unit":"cm"},
    //     "sex":"m",
    //     "age":"24",
    //     "waist":"35.00",
    //     "hip":"46.00"};
    //
    //
    // console.log(sendJson);
    // console.log(json);


    unirest.post("https://bmi.p.mashape.com/")
        .header("X-Mashape-Key", "XW5gPJqz7PmshypQe1SzDbLzDIxvp1Bf6F7jsntRZbPSjSpS2V")
        .header("Content-Type", "application/json")
        .header("Accept", "application/json")
        .send(sendJson)
        .end(function (result) {
            // console.log(result.status, result.headers, result.body);
            res.send(result);
        });
}
