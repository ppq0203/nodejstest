const http = require('http');

http.createServer((req, res) => {
    res.writeHead(200, {'content-type':'text/plain'});
    res.write("hello")
    setInterval(()=>{res.write("world\n")},1000);
//    res.end("Hello World\n");
}).listen(80, (err) => {
    if(err) {
        console.log(err);
    }
    console.log('Server listen started', new Date());
});

console.log("Server running", new Date());