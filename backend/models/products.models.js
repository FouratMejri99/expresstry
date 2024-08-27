const mongoose = require ('mongoose');
const Schema = mongoose.Schema; 
mongoose.connect('mongodb://127.0.0.1:27017/TnkerMarketPlace')
const ProductSchema = new Schema ({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true  },
    createdBy: { type: String, required: true  }
}, {timestamps: true} )


module.exports= mongoose.model('products',ProductSchema)