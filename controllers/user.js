import User from "../models/user.js";


const getAllUsers = async (req, res) => {

    const users = await User.find({});

    //const key1 = req.query.key1; //http://localhost:4000/users/all?key1=lande&&key2=sujay
    //console.log(key1); //params are used to get data from url

    res.json({
        success: true,
        users
    });
}

const registerUser = async (req, res) => {

    // const users = await User.create({ //hardcoded user
    //     name: 'John',
    //     email: 'john@gamil.com',
    //     password: '123456',
    // });

    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
    });

    res.status(201).cookie("tempi","lol").json({
        success: true,
        message: "User created successfully"
    });
}

const jokeFunction = async (req, res) => {
    res.json({
        success: true,
        message: "just joking"
    });
}

const getUserDetails = async (req, res) => {
    
    const { id } = req.params;

    const user = await User.findById(id);

    res.json({
        success: true,
        user
    });
}

export { getAllUsers, registerUser, jokeFunction, getUserDetails};