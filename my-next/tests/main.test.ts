
import  {getarray, getobject, IF,SayHello,Email}  from "./functions";

describe("currency",()=>{
    it("should return 3",()=>{
        const result=IF(3);
        expect(result).toBe(3);
    })
     it("should return 0",()=>{
        const result=IF(0);
        expect(result).toBe(0);
    })
      it("should return 0",()=>{
        const result=IF(-4);
        expect(result).toBe(0);
    })
})

describe("say hello",()=>{
    it("should say hello hamza, how are you",()=>{
        const result =SayHello("hamza")
        expect(result).toContain("hamza")
        expect(result).toMatch(/hamza/ig)


    })
})
describe("get array",()=>{
   it(("get array"),()=>{
 const  result =getarray();
    expect(result).toContain("hamza");
    expect(result).toHaveLength(3);
    expect(result).toBeDefined();
    expect(result).not.toBeNull();

    expect(result).toEqual( ["hamza","ahmad","mohammad"]);
   })


})

 const  result =getobject("hamza",1);

console.log(result)
describe("get object",()=>{
   it(("get correct object"),()=>{

 const  result =getobject("hamza",1,"admin");
 expect(result).toEqual({name:"hamza",id:1,role:"admin"})
 expect(result).toMatchObject({name:"hamza",id:1})
 expect(result).toHaveProperty("role","admin")


   
   })


})

describe("check email",()=>{
    it("check an error exception",()=>{
     const falsyvals=[null,undefined,"",NaN,0]
     falsyvals.forEach((e)=>{
        expect(()=>{Email(e)}).toThrow()
     })
    })


      it("check an aboject",()=>{
   const result=Email("example@gmail.com")
    expect(result).toMatchObject({email:"example@gmail.com"})
    expect(result.id).toBeGreaterThan(0)
    expect(result.id).toBeDefined()

     })


    })
