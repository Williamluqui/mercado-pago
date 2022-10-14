require('dotenv').config();
const express = require('express')
const app = express()
const port = 3000
const MercadoPago = require("mercadopago")
const {TOKEN_TEST} = process.env;

MercadoPago.configure({
    sandbox:true,
    access_token: TOKEN_TEST
});
app.set('port',3000);
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



app.listen(port,(err)  => {
    console.log(`Server is running on port: ${port}!`); 
});