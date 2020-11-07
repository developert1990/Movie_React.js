const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// // 로컬에서 사용할때
// const pool = mysql.createPool({
//     host: 'localhost',
//     port: 3306,
//     user: 'root',
//     password: process.env.LOCAL_PASSWORD,
//     database: 'bulletin_practice',
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0,
// });

// 헤로쿠에서 사용할때
const pool = mysql.createPool({
    host: 'us-cdbr-east-02.cleardb.com',
    port: 3306,
    user: 'b8eb5c4c367daa',
    password: process.env.DATABASE_PASSWORD,
    database: 'heroku_e67d4c770cbf6a0',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

const promisePool = pool.promise();



// --------------------------- create new user ---------------------------------------- 
exports.createNewUser = async (req, res, next) => {
    const body = req.body;
    const { firstName, password, email } = body;
    const saltRounds = 10;

    try {
        const hash = await bcrypt.hash(password, saltRounds);
        const emailAlreadyExists = await emailDoesExist(email);
        if (!emailAlreadyExists) {
            const result = await storeUserInfo(firstName, hash, email);
            res.json({
                result: 'Success',
                msg: "",
                email: email,
                status: 200,
                firstName: firstName,
            });
        } else {
            res.json({
                msg: "username is overlapped",
                status: 405
            })
        }
    } catch (error) {
        next(new Error(error.message))
    }
}
const emailDoesExist = async (email) => {
    const QUERY = 'SELECT email from hongmovieusers where email = ?';
    const [rows] = await promisePool.query(QUERY, email);
    console.log('rows: ', rows[0]);
    return rows.length > 0;
}

const storeUserInfo = async (firstname, password, email) => {
    const QUERY = 'INSERT INTO hongmovieusers(firstname, password, email, date) VALUES (?,?,?, current_timestamp)';
    const [rows] = await promisePool.query(QUERY, [firstname, password, email]);
    return rows;
}

// --------------------------- sign in user ------------------------------------------

exports.signinWithToken = async (req, res, next) => {
    try {
        Object.keys(req.body).length === 0 && res.json({
            msg: 'Please enter username and password !!',
            state: 400,
        })
        const { email, password } = req.body;

        const getUserDataFromDB = async (email) => {
            const QUERY = "SELECT email,password, firstname FROM hongmovieusers where email =?";
            const [rows] = await promisePool.query(QUERY, email);
            console.log('rows: ' + rows);
            return rows.length == 0 ? 0 : rows;
        }
        const userDataFromDB = await getUserDataFromDB(email);
        console.log('data: ', userDataFromDB);

        userDataFromDB === 0 && res.json({ msg: `Username doesn't exsists`, status: 450 })
        const passwordHash = userDataFromDB[0].password;
        const firstName = userDataFromDB[0].firstname;
        console.log('passwordHash: ' + passwordHash);
        console.log('firstName: ' + firstName);

        const isAuthenticated = await bcrypt.compare(password, passwordHash);
        console.log('isAuthenticated: ' + isAuthenticated)
        if (isAuthenticated) {
            console.log('인증성공해서 들어옴');
            const token = jwt.sign({
                user_id: email
            }, process.env.SECRET_KEY, {
                expiresIn: '20s'
            });
            console.log(token);
            res.cookie('token', token, { httpOnly: true, maxAge: 3000 });
            console.log('cookie 저장된것: ' + req.cookies);
            res.json({
                result: 'Success',
                token: token,
                msg: "",
                email: email,
                status: 200,
                firstName: firstName,
            });
            console.log(token);
        } else {
            res.json({ msg: "Password is not correct", status: 400 });
        }
    } catch (error) {
        console.error(err);
    }
}