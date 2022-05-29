const Express=require("express")
const Bodyparser=require("body-parser")
const Mongoose=require("mongoose")


var app=Express()
app.use(Bodyparser.urlencoded({extended:true}))
app.use(Bodyparser.json())

app.use((req, res, next) => { 
    res.setHeader("Access-Control-Allow-Origin", "*");  
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"   ); 
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS"   ); 
    next(); });

var studentModel=Mongoose.model("students",
new Mongoose.Schema({
    admno:String,
    rollno:String,
    name:String,
    Class:String,
    parent:String,
    mobile:String,
    address:String


})
)

var facultyModel=Mongoose.model("faculties",
new Mongoose.Schema({
    name:String,
    admno:String,
    education:String,
    mobile:String,
    address:String,
    pincode:String,
    district:String




})
) 
Mongoose.connect("mongodb+srv://adithya:adithya@cluster0.9dgmv.mongodb.net/collegeDb",{useNewUrlParser: true})

app.post("/api/deletestudent",(req,res)=>{
    var getId=req.body
    studentModel.findByIdAndRemove(getId,(error,data)=>{
        if(error)
        {
            res.send({"status":error})
        }
        else{
            res.send({"status":"success"})
        }
    })
})

app.post("/api/searchstudent",(req,res)=>{
    var getAdmno=req.body
    studentModel.find(getAdmno,
        (error,data)=>{
            if(error)
            {
                res.send({"status":"error"})
            }
            else{
                res.send(data)
            }
        })
})

app.post("/api/addstudent",(req,res)=>{
    var getAdmno=req.body.admno
    var getRollno=req.body.rollno
    var getName=req.body.name
    var getClass=req.body.Class
    var getparent=req.body.parent
    var getMobile=req.body.mobile
    var getAddress=req.body.address
    data={"admno":getAdmno,"rollno":getRollno,"name":getName,"Class":getClass,"parent":getparent,"mobile":getMobile,"address":getAddress}
    
    let mystudent=new studentModel(data)
    mystudent.save((error,data)=>{
        if(error)
        {
            res.send({"status":"error","data":error})


        }
        else{
            res.send({"status":"success","data":data})
        }


    })

})

app.post("/api/deletefaculty",(req,res)=>{

    var getId=req.body
    facultyModel.findByIdAndRemove(getId,
        (error,data)=>{
            if(error)
            {
                res.send({"status":error})
            }
            else{
                res.send({"status":"success"})
            }
        }
        
        )
})



app.post("/api/searchfaculty",(req,res)=>{

    var getName=req.body
    facultyModel.find(getName,
        (error,data)=>{
            if(error)
            {
                res.send({"status":"error"})
            }
            else{
                res.send(data)
            }
        }
        
        )
})

app.post("/api/addfaculty",(req,res)=>{
    var getname=req.body.name
    var geteducation=req.body.education
    var getmobile=req.body.mobile
    var getaddress=req.body.address
    var getpincode=req.body.pincode
    var getdistrict=req.body.district
    data={"name":getname,"education":geteducation,"mobile":getmobile,"address":getaddress,"pincode":getpincode,"district":getdistrict}
    
    let myfaculty=new facultyModel(data)
    myfaculty.save((error,data)=>{
        if(error)
        {
            res.send({"status":"error","data":error})


        }
        else{
            res.send({"status":"success","data":data})
        }


    })

    


})
app.get("/api/viewstudent",(req,res)=>{
    studentModel.find((error,data)=>{
        if(error)
        {
            res.send(error)
        }
        else{
            res.send(data)
        }
    })


})
app.get("/api/viewfaculty",(req,res)=>{
    facultyModel.find((error,data)=>{
        if(error)
        {
            res.send({"status":"error"})
        }
        else{
            res.send(data)
        }

    })


})
app.listen(7000,()=>{
    console.log("server running")


})