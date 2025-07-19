function IF(num:number){
    return num>0?num:0
}
function SayHello(name:string){
    return "hello "+name +" ,how are you"
}
function getarray(){
    return ["hamza","ahmad","mohammad"]
}


function getobject(name?:string,id?:number, role?:string){
    const obj={name ,id ,role}
    return  obj
}

function Email(email:unknown){
  if(!email){
    throw new Error("invalid email")
  }
    return  {id:1,email}
}

export{
    IF,
    SayHello,
    getarray,
    getobject,
    Email
}