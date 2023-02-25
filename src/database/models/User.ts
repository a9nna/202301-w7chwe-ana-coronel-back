import {model, Schema} from "mongoose"

const userSchema = new Schema({
  image: String,
  username:{
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true,
    minLength:8
  },
  email:{
    type: String,
    required: true
  } ,
  enemies: Object, 
  friends: Object
});

const User = model("User", userSchema, "users")

export default User;
