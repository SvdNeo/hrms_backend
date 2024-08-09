import express from 'express';
import con from '../utils/db.js';
const router = express.Router();
import jwt from "jsonwebtoken"

router.post('/adminlogin', (req, res) => {
 const sql = `select * from admin where email = ? and password = ?`;
 con.query(sql,[req.body.email,req.body.password],(err,response)=>{
    if(err) {
        res.json({login:false,error:"query error"})
    }
    if(response.length>0){
        const email = response[0].email;
        const token = jwt.sign({role:"admin", email: email, id: response[0].id},'jwt_secret_key',{expiresIn:"1d"});
        res.cookie('token',token);
        return res.json({login:true})
    }else{
        res.json({login:false, Error:"wrong email or password" })
    }
 })
});
router.get('/category', (req, res) => {
    const sql = "SELECT * FROM category";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.post('/add_category', (req, res) => {
    const sql = "INSERT INTO category (`category`) VALUES (?)";
    con.query(sql, [req.body.category], (err, result) => {
        if (err) {
            console.error("Database Query Error:", err); // Log the error for debugging
            return res.json({ Status: false, Error: "Query Error: " + err.message });
        }
        return res.json({ Status: true });
    });
});


export { router as adminRouter };
