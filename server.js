var qs = require('querystring');
require('http').createServer(function(req,res){
    if(req.url == '/'){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end([
            '<form method="POST" action="/url">',
            '<h1>My form</h1>',
            '<fieldset>',
            '<label>Personal information</label>',
            '<p>What is your name?</p>',
            '<input type="text" name="name">',
            '<p><button>Submit</button></p>',
            '</form>'
        ].join(''));
    }
    else if(req.url == '/url' && 'POST' == req.method){
        var body = '';
        //console.log(req);
        req.on('data',function(chunk){
            body += chunk;
         });
        req.on('end',function(){
            res.writeHead(200,{'Content-Type':'text/html'});
            console.log(qs.parse(body));
	    res.end('<p>Your name is <b>' + qs.parse(body).name + '</b></p>');
        });

    }
    else{
        res.writeHead(404);
        res.end('Not Found');
    }
}).listen(8080);
