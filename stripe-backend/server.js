require('dotenv').config();
const express = require('express');
const Stripe = require('stripe');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Configurar Stripe com a chave secreta
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-06-20'
})

// Middlewares
app.use(cors())
app.use(bodyParser.json())

app.post('/payment-intent', async (req, res) =>{
    try{
        const { amount } = req.body

        // Criação do PaymentIntent no Stripe
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
        });

        // Retorna o clientSecret ao frontend
        res.json({
            clientSecret: paymentIntent.client_secret
        });
    } catch (error){
        res.status(500).json({error: error.message})
    }
})

app.get('/', (req, res) => {
    res.json('Servidor Stripe ...rodando');
})

app.listen(port, () => {
    console.log(`Servidor Stripe ...rodando em http://localhost:${port}`);
});