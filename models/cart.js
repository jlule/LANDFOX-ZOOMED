const mongoose = require('mongoose');
const cartSchema = mongoose.Schema({

    cartItem:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'cartItem',
        required:true
    },

    user:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true

    },

    totalPrice:{
        type:Number

    }
})

Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;