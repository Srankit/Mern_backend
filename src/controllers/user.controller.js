import {asyncHandler} from '../utils/asyncHandler.js' 
 import {User} from "../models/user.models.js"
import {ApiError} from "../utils/ApiError.js"
import {uploadCloudinary} from "../utils/cloudinary.js"
import {ApiResponce} from "../utils/ApiResponce.js"



const registerUser = asyncHandler( async (req,res)=>{
   //get fetails from ui
 const {fullName,username,email,password} = req.body
 console.log("fullName",fullName)
//  if(fullName ===""){
//     throw new ApiError(400, "fullname is required ")
//  }

if(
   [fullName,username,email,password].some((field)=> field?.trim()==="")
){
   throw new ApiError (400, "All fields are  required");
}

const existedUser= User.findOne({
    $or:[{ username },{ email }]
})
if (existedUser){
    throw new ApiError(409,"User with email or username alredy exists");
}

const avtatLocalPath= req.filse?.avatar[0]?.path;
const coverImageLocalPath =   req.filse?.coverImage[0]?.path;

if(! avtatLocalPath){
    throw new ApiError(400, "Avatar file is required ");
}

const avatar = await uploadCloudinary(avtatLocalPath);
const cover = await uploadCloudinary(coverImageLocalPath)
 if (!avatar){
      throw new ApiError(400, "Avatar file is required ");
 }

const user = await User.create({
    fullName,
    email,
    avatar:avatar.url,
    coverImage:coverImage?.url || "",
    password,
    username: username.toLowerCase()
 })
  const userDetails = await User.findById(user._id).select(
    "-password", "-refreshToken"
  )

  if(!userDetails){
      throw new ApiError(500, "user not create plz try again ");
  }

return res.status(201).json(
    new ApiResponce(200,userDetails,"User registerd successfully")
)

    // validation  - not empty
// check  if user already exists
//check if user alreasy exists: email,
// check for image , check for avtar
// uload them cloudinary, chek avatar 
// create user object , create entry in db
 // remove password and refresh token field
//check for user creation,
//return response with user details

})


export default registerUser