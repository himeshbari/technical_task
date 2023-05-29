import Category from '../models/categoryModel.js'

export const getCategories = async (req,res) =>{

    try {
         const data = await Category.find();
         res.status(200).json({
             data:data,
             message:'Successfully fetched!'
         })
    } catch (error) {
         res.status(400).json({
             message:error.message
         })
    }
 }

 
export const addCategory =(req,res)=>{
    try {

        const {name,image,description} = req.body; //destructuring

        const cateData = new Category({name,image,description}); //creating object
        const saveData = cateData.save(); //save data in db

        if(cateData){
            res.status(201).json({
                data:cateData,
                message:'Successfully data inserted!'
            }) 
        }

    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
}


export const getCategory = async (req,res) =>{
    try {
        const categoryID = req.params.category_id;
        const data = await Category.findOne({_id:categoryID});
        if(data){
            res.status(200).json({
                data:data,
                message:'Single Category data!'
            })
        }
   } catch (error) {
        res.status(400).json({
            message:error.message
        })
   }
}

export const deleteCategory = async (req,res) =>{
    try {
        const categoryID = req.params.category_id;

        const data = await Category.deleteOne({_id:categoryID})
        if(data.acknowledged){
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

export const updateCategory = async (req,res) =>{
    try {
        const categoryID = req.params.category_id;
        const {name,image,description} = req.body;
        const updateCategory = await Category.updateOne({_id:categoryID},{$set:{name,image,description}})
        if(updateCategory.acknowledged){
            res.status(200).json({
                message:'Update Successfully'
            })
        }
    }
    catch (error) {
        res.status(400).json({
            message:error.message
        })
   }
}
