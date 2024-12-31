import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phoneNumber:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['Student','Recruiter'],
        default:'Student',
        required:true
    },
    profile:{
        bio:{
            type:String,
        },
        skills:[{
            type:String,
        }],
        resume:{
            type:String,      // URL to resume file to database
        },
        resumeOriginalname:{
            type:String, // original name of resume file 
        },
        company:{
            type : mongoose.Schema.Types.ObjectId,
            ref: "Company",
        },
        profilePhoto:{
            type :String, // URL to profile phot file 
        },
        profilePhoto:{
            type: String, // URL to profile photo
        default:"",
        },
     

    },

},{timestamps: true});

export const User = mongoose.model("User",userSchema);
