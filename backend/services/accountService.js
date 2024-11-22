require("dotenv").config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const accountModel = require("../models/Account");
const saltRounds = 10;

const createAccountService = async(email, password, first_name, last_name) => {
    try {
        //check user exist
        const user = await accountModel.findOne({email});
        if(user){
            return null;
        }

        //hash user password
        const hashPassword = await bcrypt.hash(password, saltRounds)
    
        //save user to datebase
        let result = await accountModel.create({
            email: email,
            password: hashPassword,
            first_name: first_name,
            last_name: last_name,
            role: "user",
            avatar: 'https://res.cloudinary.com/df7mhs6xj/image/upload/v1730885237/gvh57hvea5d1e5sjqjrx.png',
        })
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const loginService = async(email, password) => {
    try {
        //fetch email
        const user = await accountModel.findOne({email: email});
        if(user){
            //compare password
            const isMatchPassword = await bcrypt.compare(password, user.password);
            if(!isMatchPassword){
                return{
                    EC: 2,
                    EM: "Email/Password không hợp lệ"
                }
            }else{
                //create access token
                const payload = {
                    email: user.email,
                    name: user.last_name,
                }

                const access_token = jwt.sign(
                    payload, 
                    process.env.JWT_SECRET,
                    {
                        expiresIn: process.env.JWT_EXPIRE
                    }
                );
                return {
                    EC:0,
                    access_token,
                    user: {
                        email: user.email,
                        name: user.last_name
                    }
                };
            }
        }else{
            return {
                EC: 1,
                EM: "Email/Password không hợp lệ"
            }
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

const getUserService = async(id, email) => {
    try {
        let query = {};
        if(id) query._id = id;
        if(email) query.email = email;

        const user = await accountModel.findOne(query);
        return user;
    } catch (error) {
        console.log(error);
        return null
    }
}

const editAccountService = async(newAcc) =>{
    try{
        const response = await accountModel.replaceOne(
            {_id: newAcc._id},
            {
                first_name: newAcc.first_name,
                last_name: newAcc.last_name,
                birth: newAcc.birth,
                gender: newAcc.gender,
                email: newAcc.email,
                password: newAcc.password,
                avatar: newAcc.avatar,
                role: newAcc.role
            }
        )
        return response;
    } catch(error){
        return null;
    }
}

const getUsersByIdService = async(listId)=>{
    try {
        const uniUsers = [...new Set(listId)];
        const result = await accountModel.find({_id: { $in: uniUsers}});
        return result;
    } catch (error) {
        return null;
    }
}

const getUsersService = async()=>{
    try {
        const response = await accountModel.find({role: "user"});
        return response;
    } catch (error) {
        return null;
    }
}

module.exports = {
    createAccountService, loginService, getUserService, editAccountService, getUsersByIdService, getUsersService
}