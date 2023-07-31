const Item = require('../models/items');
const express = require('express');
const router = express.Router();
const uploads = require('../management/multer');
const  { default:mongoose } = require('mongoose');

// const url = process.env.URL;

router.get('/', async (req, res)=>{
    const items = await Item.find().populate('category');

    if(!items){
        res.status(400).send("No items found")
    }

    res.send(items);
 })


router.post('/', uploads.single('image'), async(req, res)=>{
    const category = Category.findById(req.body.category);
    if(!category){
        return res.status(400).send("Unknown category!")
    }
    
    
    const file = req.file;
    if(!file){
        return res.status(400).send("Image required!")
    }
    const fileName = req.file.filename;
    const path = `${req.protocol}://${req.get('host')}/public/images/`


    let item = new Item({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        image:`${path}${fileName}`,
        category:req.body.category
    })
    item = await item.save()
    .then(()=>{
        res.status(201).send("Item created successfully !")
    })
    .catch((err)=>{
        res.status(500).json({
            error:err,
            message:"Impossible to create products :/"
        })
    })

 })


 router.put('/:id', uploads.single('image'), async (req, res) =>{
    if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(400).send('Invalid id');
    }
    const category = await Category.findById(req.body.category);

    if(!category){
        return res.status(400).send('Invalid Category id');
    }

    const item = await Item.findById(req.params.id);
    if(!item){
        return res.status(400).send('Invalid Item id')
    }

    const file = req.file;
    let image;

    if(file){
        const fileName = file.filename;
        const path = `${req.protocol}://${req.get('host')}/public/images/`;
        image =`${path}${fileName}`
    
    }else{
        image = item.image;
    }

    const modifiedItem = await Item.findByIdAndUpdate( 
        req.params.id,
        {
            name:req.body.name,
            description:req.body.description,
            price:req.body.price,
            image:image,
            category:req.body.category

    },
    {new:true}
    )
    if(!modifiedItem){
        return res.status(500).send('The item cannot be updated')
    }

    res.send(modifiedItem);
   
 })

 router.delete('/:id', async (req, res)=>{
    Item.findByIdAndRemove(req.params.id)
    .then((item) =>{
        if(item){
        return res.status(200).send("Item deleted successfully")
        }
        else{
            return res.status(400).send("Item not found:/");
        }
    })
    .catch((err)=>{
       return res.status(400).json({
        success:false,
        error:err
       }
         
       ) 
    })
 })

 module.exports = router;


 

