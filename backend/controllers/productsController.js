import Product from '../models/ProductModel.js'
// import asyncHandler from "express-async-handler";
import multer from 'multer'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const randomDate = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + randomDate + '.png')
    }
  })
  

export const getProducts = async (req,res) =>{

  try {
    const data = await Product.find({}).populate('category');
       res.status(200).json({
           data:data,
           message:'Successfully fetched!',
           path:'http://localhost:8080/uploads/'

       })
  } catch (error) {
       res.status(400).json({
           message:error.message,
       })
  }
}


export const addProduct =(req,res)=>{
  try {
      console.log(req.body)
      const imageStore =  multer({ storage: storage }).single('photo');
      imageStore(req,res, async function(err){
          if(err){
              res.status(400).json({
                  message:err.message
              })
          }
          console.log()
          const {name,category,price,longDescription,description,attributes,tax,stock,salePrice} = req.body; //destructuring

          let img = ''
          if(req?.file?.filename){
              img = req?.file?.filename
          }

        // const photo = req.file ? req.file.filename : '';
        
          const prodData = new Product({
            name:name,
            description:description,
            longDescription:longDescription,
            attributes:attributes,
            price:price,
            salePrice:salePrice,
            stock:stock,
            photo: img,
            tax:tax,
            category:category,
          }); //creating object
          const saveData = prodData.save(); //save data in db

          if(prodData){
              res.status(201).json({
                  data:prodData,
                  message:'Successfully data inserted!',
                  path:'http://localhost:8080/uploads/'
              }) 
          }

          })
     
  } catch (error) {
      res.status(400).json({
          message:error.message
      })
  }
}


export const getProduct = async (req,res) =>{
  try {
      const productID = req.params.product_id;
      const data = await Product.findOne({_id:productID}).populate('category');
      if(data){
          res.status(200).json({
              data:data,
              message:'Single Category data!',
              path:'http://localhost:8080/uploads/'
          })
      }
 } catch (error) {
      res.status(400).json({
          message:error.message
      })
 }
}

export const deleteProduct = async (req,res) =>{
  try {
      const productID = req.params.product_id;
      const proData = await Product.findOne({_id:productID});
      const data = await Product.deleteOne({_id:productID})

      if(data.acknowledged){
          fs.unlinkSync('./uploads/'+proData.photo)
          res.status(200).json({
              message:'Deleted Successfully'
          })
      }
  }
  catch (error) {
      res.status(400).json({
          message:error.message
      })
 }
}

export const updateProduct = async (req,res) =>{

  try {
      
      const imageStore =  multer({ storage: storage }).single('photo');
      imageStore(req,res, async function(err){
          if(err){
              res.status(400).json({
                  message:err.message
              })
          }

          const productID = req.params.product_id;
          const {name,category,price,longDescription,description,attributes,photo,tax,stock,salePrice} = req.body; //destructuring
          const proData = await Product.findOne({_id:productID});
          let img = ''
          if(req?.file?.filename){
              img = req.file.filename
              fs.unlinkSync('./uploads/'+proData.photo)
          }else{
              img = proData.photo;
          }
          const updateProduct = await Product.updateOne({_id:productID},{$set:
              {
                name:name,
                description:description,
                longDescription:longDescription,
                attributes:attributes,
                price:price,
                salePrice:salePrice,
                stock:stock,
                photo:img,
                tax:tax,
                category:category,
              }})
       
          if(updateProduct.acknowledged){
              res.status(200).json({
                  message:'updated data inserted!',
              }) 
          }

          })
     
  } catch (error) {
      res.status(400).json({
          message:error.message
      })
  } 
}

