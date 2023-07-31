const Category = require('../models/category');
const express = require('express');
const router = express.Router();


router.get('/', async (req,res)=>{

    const categories = await Category.find();
    if(!categories){
        return res.status(400).send("No categores available");

    }
    res.send(categories);
})

router.get('/:id', async (req,res)=>{
    const category  = await Category.findById(req.params.id)

    if(!category){
        return res.status(400).send("Invalid category id");

    }

    res.send(category);
})



router.post('/', async (req,res)=>{
    let category = new Category({
        name:req.body.name,
       categoryType:req.body.categoryType,
        
    })

    category = await category.save()
    .then((category)=>{
        if(category){
            return res.status(200).send(category);

        }else{
            return res.status(400).send("Category cannot be created");

        }

    })
    .catch((err)=>{
        return res.status(500).json({
            error:err,
            message:"Error occurred"
        })
    })
})

router.put('/:id', async (req,res)=>{
    const category = await Category.findByIdAndUpdate(
        req.params.id,
        {
            name:req.body.name,
            categoryType:req.body.categoryType
        },
        {new:true }
    )
    if(!category){
        return res.status(400).send("Invalid category Id");
    }
    res.send(category);

})

router.delete('/:id', async (req,res)=>{
    const category = await Category.findByIdAndRemove(req.params.id)
    .then((category)=>{
        if(category){
            return res.status(200).send("Category deleted successfully")
        }else{
            return res.status(400).send("Invalid category Id")
        }
    })
    .catch(err =>{
        return res.status(500).json({
            error:err,
            message:"Error during category deletion"
        })

    })
})


module.exports = router;


//  router.get('/', async (req,res)=>{
//     const categories = await Category.find();

//     if(!categories){
//         return  res.status(400).send("No categories available");
//     }

//     res.send(categories);
//  })
//  router.post('/', async(req,res)=>{
    
//     const category = new Category({
//         name:req.body.name,
//         categoryType:req.body.categoryType,
       

//     })

//     category = await category.save()
//     .then((category)=>{
//         if(category){
//             return res.status(200).send(category)
//         }else{
//             return res.status(400).send('Category cannot be created');
//         }

//     })
//     .catch((err)=>{
//         return res.status(500).json({
//             error:err,
//             message:"Error occured"

//         })
       
//     })

// })
