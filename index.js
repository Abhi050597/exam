const express= require('express');
const config= require('config');
const empsRelatedRoutes= require('./routes/emps');
const cors= require('cors');
const app= express();
app.use(cors('*'))



app.use(express.json());
app.use('/emps',empsRelatedRoutes);



const portNo=config.get("PORT");
app.listen(portNo,()=>{
    console.log("server started at"+portNo);
})
