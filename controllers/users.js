

const getUsers = (req, res) =>{
    //query params
    const { q, nombre = "No  Name", apikey } = req.query;
    res.json({
        msg: "Get Users",
        q,
        nombre,
        apikey
    })
}
const postUsers = (req, res) =>{
    
    res.json({
        msg: "Post Users",
    })
}
const putUsers = (req, res) =>{
    const  { id } = req.params;
    res.json({
        msg: "Put Users",
        id 
    })
}
const deleteUsers = (req, res) =>{

    res.json({
        msg: "Delete Users"
    })
}


module.exports = {
    getUsers,
    postUsers,
    putUsers,
    deleteUsers
}