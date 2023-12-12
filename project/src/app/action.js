"use server";
export default async function processForm(previousState, FormData){
// this is where we assign the form data to variables
   const id = parseInt(FormData.get("id"));
   const email = FormData.get("email");
   const name = FormData.get("name");
   const method = FormData.get("method");
   const petType= FormData.get("petType");
   const petName= FormData.get("petName");
   const schema = FormData.get("schema");
   const baseURL = FormData.get("BASE_URL");
   const userid = FormData.get("userid");
// this is where we create the data object that we will send to the server (for POST and PATCH) it only includes the properties that are not null from the form data
   const dataJson = Object.assign( //create a new object, and add the following properties to it if they exist
        {},
        email && { email: email },
        name && { name: name },
        petType && { type: petType },
        petName && { name: petName },
        // userid && { userid: userid }
      );

let fetchUrl=baseURL+"/api/"+schema+"/" //create the fetch url based on the schema and the method

if(id&&method!=="POST"){
    fetchUrl=fetchUrl+id; //if we have an id and the method is not POST (POST is the only method that doesn't need an id) then add the id to the fetch url
}
let fetchData={  "method": method, "cache": 'no-store' }; //Next.js is a stupid poopoo head and caches fetch requests, so we need to add this to the fetch 
if(method==="POST"||method==="PATCH"){//check the method and add the appropriate headers and body
    Object.assign(fetchData,{//POST and PATCH have a body, so we need to add one that is the dataJson object we created earlier
        "headers":{
            "content-type":"application/json",
        },
        "body":JSON.stringify(dataJson),
        });
}
console.log(userid);
if(userid){
    fetchUrl=fetchUrl+"?userid="+userid;
}
console.log(fetchUrl,fetchData);
let data = await fetch(fetchUrl,fetchData); //fetch the data with the fetch url and the fetch data we created earlier
try{
   let json = await data.json(); //try to parse the data as JSON
    Object.assign(previousState,{"data":Array.isArray(json)?json:[json],"error":null,"code":data.status}); //if it is JSON, then add it to the previous state object
}catch(e){
   let json =[] //if it isn't JSON, then we will just add the data as a string to the previous state object and set the error and code properties
    Object.assign(previousState?previousState:{},{"error":data.statusText, "code":data.status,"data":json});
}
return previousState; //return the previous state object regardless of whether or not we were able to parse the data as JSON
}

export async function loginAction(previousState, FormData){
let email = FormData.get("email");
let baseURL = FormData.get("BASE_URL");
console.log(email);
//get the user from the database
let data = await fetch(baseURL+"/api/user/search",{  
    "method": "POST",
    "cache": 'no-store',
    "headers":{
        "content-type":"application/json",
    },
    "body":JSON.stringify({"email":email}),
    });
if(data.status===200){
    console.log(data);
    
}else{
    console.log(data);
}
previousState.data=await data.json();
return previousState;
}

export async function signupAction(previousState, FormData){
    let email = FormData.get("email");
    let name = FormData.get("name");
    let baseURL = FormData.get("BASE_URL");
    console.log(email);
    //get the user from the database
    let data = await fetch(baseURL+"/api/user",{  
        "method": "POST",
        "cache": 'no-store',
        "headers":{
            "content-type":"application/json",
        },
        "body":JSON.stringify({"email":email,"name":name}),
        });
    if(data.status===200){
        console.log(data);
        
    }else{
        console.log(data);
    }
    previousState.data=await data.json();
    return previousState;
}