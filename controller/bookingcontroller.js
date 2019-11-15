const planModel = require("../model/planModel");
const stripe = require("stripe")(
    'sk_test_47EMWv8lRQOXrXdFal2lB90Y00XrNQs9Vw');




module.exports.checkout = async function(req,res){
    const id = req.body.id;
    const plan = await planModel.findById(id);

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
          name: plan.name,
          description:plan.description,
          images: ['https://example.com/t-shirt.png'],
          amount: 500,
          currency: 'usd',
          quantity: 1,
        }],
       success_url :"/",
       cancel_url : "/"
    });
    res.status(201).json({
        data:plan,
        success:"payment oject send",
        session
    })
};