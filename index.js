//Importing the necessary modules
const http=require('http');
const url=require('url');
const stringDecoder=require('string_decoder').StringDecoder;

//Create the server and listen to the port 3000
const server=http.createServer(function(req,res){
    serverLogicFoo(req,res);
});
const serverLogicFoo=(req,res)=>{
    //Parse the URL 
    let parsedUrl=url.parse(req.url,true);
    let trimedPath= parsedUrl.pathname.replace(/^\/+|\/+$/g, '');
    //Detect the HTTP Method
    let httpMethod=req.method;
    //Parse the Query string
    let queryString=parsedUrl.query;
    //Parse the payload
    let buffer="";
    let decoder=new stringDecoder('utf-8');
    req.on('data',function(data){
        buffer+=decoder.write(data);
    });
    req.on('end',function(){
        buffer+=decoder.end();
    //Choose the handler to handle the routes
    let currentHandler=typeof(router[trimedPath])!=='undefined' ? router[trimedPath] : handler.notFound;
    
    let dataToBeSent={
            method:httpMethod,
            payload:buffer,
            path:trimedPath,
            queryString:queryString
    }
    currentHandler(dataToBeSent,function(statusCode,payload){
        statusCode=typeof(statusCode)=='number' ? statusCode : 200;
        payload=typeof(payload)=='object' ? payload : {};
        let resp_message=payload['resp_message'];
        payload=JSON.stringify(payload);
        res.setHeader('Content-Type','application/text');
        res.writeHead(statusCode);
        res.end(resp_message);
        console.log('Responded with these status and payload ',statusCode,payload);
    });
    });
    
}
//Start listening to port 3000
server.listen(3000,function(){
    console.log('server listening on port 3000');
});

//Define Handler
let handler={};

//Define /hello route

handler.hello=function(data,cb){

//Check for the method 
 if(data['method']==='GET' || data['method']==='POST')
    {
        //set the response for the path hello
        data['resp_message']="Hello World !\n";   
    }
    else
    {
        //Method not allowed exception
        data['resp_message']="Method you have requested is not allowed!\n";
    }
  
  cb(200,data);
};
handler.notFound=function(data,cb){
 cb(404);
}
//Define Router
let router={
    hello:handler.hello
}