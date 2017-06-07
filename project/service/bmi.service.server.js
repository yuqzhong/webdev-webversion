var unirest = require('unirest');
const app = require('../../express');

app.post('/api/project/bmiCal',bmiCal);


function bmiCal(req, res) {
    unirest.post("https://bmi.p.mashape.com/")
        .header("X-Mashape-Key", "XW5gPJqz7PmshypQe1SzDbLzDIxvp1Bf6F7jsntRZbPSjSpS2V")
        .header("Content-Type", "application/json")
        .header("Accept", "application/json")
        .send({
            "weight": {"value": "85.00", "unit": "kg"},
            "height": {"value": "170.00", "unit": "cm"},
            "sex": "m",
            "age": "24",
            "waist": "34.00",
            "hip": "40.00"
        })
        .end(function (result) {
            console.log(result.status, result.headers, result.body);
            res.send(result);
        });
}
