const express = require('express');
const request = require('request');
const app = express();

/** 설정 */
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('views', `${__dirname}/views`);
app.set('view engine', 'hbs');
/** 설정 */

app.get('/', (req, res) => {
    res.render('index', {
        title: '회원가입',
        subject: 'Hello express !'
    });
});


app.get('/login', (req, res) => {
   res.render('login', {
       title: "로그인",
       subject: "로그인"
   });
});


app.post('/login', (req, res) => {
    request('http://localhost:4001/users', (err, response, body) => {
        const user = JSON.parse(body).find((user) => user.email === req.body.email);
        if(!user) return res.send('회원이 아닙니다');
        if(user.password !== req.body.password) return res.send('비밀번호가 틀렸습니다');

        res.send(`${user.name}님 환영합니다`);
    });
});

app.get('/register', (req, res) => {
    res.render('register', {
       title: "회원가입",
       subject: "회원가입 페이지"
    });
});

app.post('/register', (req, res) => {
    const addUsers = {
        uri: "http://localhost:4001/register",
        method: "POST",
        form: req.body
    }
    console.log(req)
    console.log(req.body);
    request(addUsers);
    res.redirect('/login');
});

app.get('/users', (req, res) => {
   request('http://localhost:4001/users', (err, response, body) =>{
       res.render('users',{
           userList: JSON.parse(body)
       });
   });
});



app.listen(4000);