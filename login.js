let session_cookie_list = [];
const server = http.createServer((req,res) => {
    let session_cookie;

    if(req.headers.cookie) {
        let cookies = req.headers.cookie.split(";").map((obj)=>{
            let temp = obj.trim().split("=");
            if(temp[0] == 'sessions') {
                session_cookie = temp[1];
            }
            return obj.trim().split("=");
        });
    }
    let expire_time = new Date().getTime()+1000*86400;
    if(!session_cookie || !session_cookie_list[session_cookie]) {
        session_cookie = SessionStr();
        session_cookie_list[session_cookie] = {
            session_data: {},
            expire: expire_time
        }
        res.setHeader('Set-Cookie', 'session='+session_cookie+'; Expires='+new Date(expire_time).toUTCString()+"; HttpOnly;");
    } else {
        session_cookie_list[session_cookie].expire = expire_time;
        res.setHeader('Set-Cookie', 'session='+session_cookie+"")
    }
});




const http = require('http');

const SessionStr = ()=>{
    let str = "";
    const base_str = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for(let i = 0; i < 64; i++){
        str += base_str[Math.floor(Math.random()*base_str.length)];
    }
    return str;
}

const server = http.createServer((req,res)=>{
    res.statusCode = 200;
    res.setHeader('Contebt-Type', 'text/plain');
    let session_cookie = SessionStr();
    res.setHeader('Set-Cookie', ['sessions='+session_cookie+'; Expires='+new Date(new Date().getTime()+1000*86400).toUTCString()+"; HttpOnly;", 'cookie=test2; Expires='+new Date(new Date().getTime()+1000*86400).toUTCString()+";"]);

    res.end('Hello World\n');
});

server.listen(80, (err) => {
    if(err) {
        console.log(err);
    }
    console.log(`Server running`);
});