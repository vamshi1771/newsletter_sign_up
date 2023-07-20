const express= require("express");
const bodyparser=require("body-parser");
const request= require("request");
const https=require("https");
const app=express();


app.use(express.static("public"));// before "express.static" we are trying to pullup local files and to make static to server

app.use(bodyparser.urlencoded({extended:true}));


app.get("/",function(req,res){
    res.sendFile(__dirname+"/sign_in.html");
});


app.post("/",function(req,res){

    var firstname=req.body.f1;
    var lastname=req.body.L1;
    var email=req.body.email;
    console.log(firstname,lastname, email);
  


const data={
    members:[
        {
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME:firstname,
                LNAME:lastname
            }
        }
    ]
};
const jsondata=JSON.stringify(data);

const url= "https://US21.api.mailchimp.com/3.0/lists/8c0026a90b";
 
const options={
    method:"POST",
    auth:"vamshi:b0d48d681e98915c1696e6536a8a3647-us21"
}



const request=https.request(url,options, function(response){
    response.on("data",function(data){
        if(response.statusCode===200) {
            res.sendFile(__dirname+"/sucess.html");
        }
        else {
        res.sendFile(__dirname+"/failure.html");
        }
    console.log(JSON.parse(data));
   })
});
request.write(jsondata);
request.end();
});

app.post("/failure.html",function(req,res){
    res.redirect("/")
});



app.listen(3000,function(){
    console.log("server is running on port 3000");
});

//b0d48d681e98915c1696e6536a8a3647-us21