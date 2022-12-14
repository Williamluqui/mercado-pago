require('dotenv').config();
const express = require('express')
const app = express()
const MercadoPago = require("mercadopago")

const port = process.env.PORT || 8080;

MercadoPago.configure({
    sandbox:true,
    access_token: process.env.TOKEN_TEST
});
app.set('port', process.env.PORT );


app.get('/', (req, res) => res.send('Hello World!'));

app.get('/payment',async(req, res)=>{

    let id = "" + Date.now() // UUID forma mais recomendada
    let email = "william.luqui@me.com"
    const data = {
        items: [
            item = {
                id:id, // UUID forma mais recomendada
                title: "2x video games; 3x camisas ",
                quantity:1,
                currency_id:'BRL',
                unit_price: parseFloat(55.2)
            }
        ],
        payer:{
            email:email
        },
        external_reference: id
    }
    try {
        let payment = await MercadoPago.preferences.create(data);
        return res.redirect(payment.body.init_point);
    } catch (error) {
        return res.send(error.message)
    }
    

});

app.post("/notify",(req, res)=>{
    console.log(req.query)
    res.send("ok")
})

app.listen(port ,(err)  => {
    console.log(`Server is running on port: ${port}!`); 
});