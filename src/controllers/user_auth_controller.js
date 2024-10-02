import userModel from "../models/user_auth_model.js";
import bcrypt from 'bcrypt';
import verificationModel from "../models/verification_model.js";

const createUserController = async ( req , res ) => {
    try {
        const condObj = {
            email: req.body.email ,
        }
        let hashedPassword = await bcrypt.hash(req.body.password , 10)
        const userObj = { 
            name:req.body.name,
            email: req.body.email , 
            password : hashedPassword
        }
        let existingUser = await userModel.findOne(condObj);
        if(existingUser) return res.status(400).send({message:"this user is already exist"}) ;
        let user = new userModel(userObj) ;
        await user.save() ;
        res.status(201).send({
            message:"user created successfully" ,
            status:201,
            success:true,
            data:user
        });
    } catch (error) {
       res.status(500).json({
        message:error.message,
        status:500,
        success:true
       }) 
    }
}


const loginUserController = async ( req , res ) => {
    const { email , password } = req.body ;
    try {
        let existUser = await userModel.findOne({ email:email });
        if(!existUser) return res.status(404).send({message:"User Not Found" , status:404 , success:false});
        let confirm = await bcrypt.compare(password , existUser.password )
        if(!confirm) return res.status(404).send({message:"invalid email or password" , status:404 , success:false});

        if (!existUser.is_active) {
            return res.status(403).send({ message: "Account is not active", status: 403, success: false });
        }
        const payload = {
            name:existUser.name,
            email:existUser.email
        }
        
        let token = generateToken(payload , 3600)
        res.status(200).send({
            message:"Successfully logged in",
            status:200,
            success:true,
            token:token
        })
    } catch (error) {
        res.status(500).json({
            message:error.message,
            status:500,
            success:true
        })  
    }
}

const verificationController = async ( req , res ) => {
    const { email , passportNumber} = req.body
    try {
        const { description } = req.body; 
        let existUser = await userModel.findOne({ email:email });
        const verification = new verificationModel({
            filename: req.file.filename,
            user_id:existUser._id ,
            passport_number : passportNumber
        });
        
        await verification.save();
        res.json({ file: req.file, message: 'Image uploaded and metadata saved' });
    } catch (error) {
        res.status(500).json({
            message:error.message,
            status:500,
            success:true
        }) 
    }
}
export {
    createUserController ,
    loginUserController ,
    verificationController
}
