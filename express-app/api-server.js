const express = require('express');
const app =  express();

/** 설정 */
app.use(express.json());
app.use(express.urlencoded({extended: true}));
/** 설정 */


const userDB = [{
    email : "minsang@naver.com",
    password: "123123",
    name: "김민상"
}];

app.post('/register', (req, res) => {
   res.send(userDB.push(req.body));
});

app.get('/users', (req, res) => {
    res.send(userDB);
});

app.get('/wqeqwas', (req, res) => {
    res.send(userDB);
});




app.listen(4001);


