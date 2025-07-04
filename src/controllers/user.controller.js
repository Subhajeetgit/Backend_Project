import { asyncHandler } from "../utils/asynchandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {ApiResponse}  from "../utils/ApiResponse.js"
const registerUser = asyncHandler(async (req, res) => {
      const {fullname, email, username, password}=req.body
      console.log("email", email);

      if(
        [fullname, email, username, password].some((field)=>field?.trim()==="")
      ){
        throw new ApiError(400, "All fields are required")
      } 
     const existedUser= await User.findOne({
        $or: [{username}, {email}]
      })
      if(existedUser){
        throw new ApiError(409, "User already exists")
      }

      const avatarLocalPath=req.files?.avatar[0]?.path;
      // const coverImageLocalPath=req.files?.coverImage[0]?.path;


      let coverImageLocalPath;
      if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length>0){
        coverImageLocalPath=req.files.coverImage[0].path
      }

      if(!avatarLocalPath){
        throw new ApiError(400, "Avatar required")
      }
    const avatar= await uploadOnCloudinary(avatarLocalPath)
   const coverImage= await uploadOnCloudinary(coverImageLocalPath)

   if(!avatar){
    throw new ApiError(400, "Avatar required");
   }

   const user=await User.create({
    fullname,
    avatar: avatar.url,
    coverImage:coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase()

   })

   const CreatedUser=await User.findById(user._id).select(
    "-password -refreshToken"
   )
   if(!CreatedUser){
    throw new ApiError(500, "Something went wrrong while registering the user");
   }
   return res.status(201).json(
    new ApiResponse(200, CreatedUser, "User registered Sucessfully")
   )

});

export { registerUser };
