const { createAccountService, loginService, getUserService, editAccountService, getUsersByIdService, getUsersService } = require("../services/accountService");

const createUser = async (req, res) => {
    const {email, password, first_name, last_name, role} = req.body;
    const data = await createAccountService(email, password, first_name, last_name, role);
    return res.status(200).json(data);
}

const handleLogin = async (req, res) => {
    const {email, password} = req.body;
    const data = await loginService(email, password);

    return res.status(200).json(data);
}

const getProfile = async (req, res) => {
    return res.status(200).json(req.user);
}

const getUser = async (req, res) => {
    const {id, email} = req.query;
    const data = await getUserService(id, email);
    
    return res.status(200).json(data);
}

const editAccount = async(req, res) => {
    const newAcc = req.body;
    const data = await editAccountService(newAcc);

    return res.status(200).json(data);
}

const getUsersbyId = async(req, res) =>{
    const listId = req.body;
    const data = await getUsersByIdService(listId);
    return res.status(200).json(data);
}

const getUsers = async(req, res)=>{
    const data = await getUsersService();
    return res.status(200).json(data);
}

module.exports = {
    createUser, handleLogin, getProfile, getUser, editAccount, getUsersbyId, getUsers
}