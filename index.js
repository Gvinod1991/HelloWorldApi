//Importing the necessary modules
const http=require('http');
const url=require('url');

//Create the server and listen to the port 3000
const server=http.createServer(function(req,res){
    serverLogicFoo(req,res);
});
const serverLogicFoo=(req,res)=>{

    //Parse the URL 
    
    //Detect the HTTP Method

    //Parse the Query string

    //Parse the payload
    
    //return response to the user
     res.end("Hello World!\n");
}
//Start listening to port 3000
server.listen(3000,function(){
    console.log('server listening on port 3000');
});