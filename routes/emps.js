const express = require('express');
const config=require('config');
const appForEmps= express.Router();
const mysql= require('mysql2');
var connection= mysql.createConnection({
    host : config.get("host"),
    user : config.get("user"),
    password : config.get("password"),

    database : config.get("database"),
});



appForEmps.get("/",(request,response)=>{
   connection.query("select * from emp ",(error,result)=>{
    if(error==null)
    {
        var data= JSON.stringify(result);
        response.setHeader("Content-Type","application/json");
        response.write(data);
    }
    else
    {
        console.log(error);
        response.setHeader("Content-Type","application/json");
        response.write(error);
    }
    response.end();

   })
})

appForEmps.post("/",(request,response)=>{
  
    var query=`insert into emp values(${request.body.id},'${request.body.e_name}','${request.body.email}','${request.body.password}',${request.body.emp_id},'${request.body.dname}','${request.body.doj}')`;
    connection.query(query,(error,result)=>{
        if(error==null)
        {
            var data=JSON.stringify(result);
            response.setHeader("Content-Type","application/json");
            response.write(data);

        }
        else{
            console.log(error);
            response.setHeader("Content-Type","application/json");
response.write(error);


        }
        response.end();
    })
})

 appForEmps.put("/:id",(request,response)=>
{
    var query=`update emp set dname='${request.body.dname}',doj='${request.body.doj}' where id=${request.params.id}`;
    connection.query(query,(error,result)=>
    {
        if(error==null){
            var data=JSON.stringify(result);
            response.setHeader("Content-Type","application/json");
            response.write(data);
        }
        else{
            console.log(error);
            response.setHeader("Content-Type","application/json");
            response.write(error);
        }
        response.end();
    })
})
appForEmps.delete("/:doj",(request,response)=>
{
    var query=`delete from emp where doj='${request.params.doj}'`;
    connection.query(query,(error,result)=>
    {
        if(error==null)
        {
            var data=JSON.stringify(result);
            response.setHeader("Content-Type","application/json");
            response.write(data);
        }
        else{
            console.log(error);
            response.setHeader("Conten-Text","application/json");
            response.write(error);
        }
        response.end();
    })
    
})



module.exports = appForEmps;