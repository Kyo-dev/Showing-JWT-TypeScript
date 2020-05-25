import {Schema, model, Document} from 'mongoose'
import bcrypt from 'bcryptjs'
export interface IUser extends Document{
    username: string;
    email: string;
    password: string; 
    encryptPassword(password:string):Promise<string>
    validatePassword(password:string):Promise<boolean>
}

const userSchema = new Schema({
    username: {
        type: String,
        min: 5,
        max: 20,
        unique: true,
        lowercase: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        lowercase: true,
        max: 100,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 4,
        max: 30
    }
});

userSchema.methods.encryptPassword = async (password: string):Promise <string> => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

userSchema.methods.validatePassword = async function (password: string):Promise<boolean>{
    return await bcrypt.compare(password, this.password)
}

export default model<IUser>('UserModel', userSchema);