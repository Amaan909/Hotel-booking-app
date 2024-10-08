import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
export type UserType={
    _id:string
    email:string
    password:string
    firstname:string
    lastname:string
}
const UserSchema=new mongoose.Schema({
    // email:{properties}
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    firstname:{type:String,required:true},
    lastname:{type:String,required:true}
})

//middleware
UserSchema.pre("save",async function(next){
    if(this.isModified('password')){
        this.password=await bcrypt.hash(this.password,8)
    }
    next()
})

const User=mongoose.model<UserType>("User",UserSchema)

export default User