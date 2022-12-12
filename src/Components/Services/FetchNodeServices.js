import axios from "axios"
const ServerURL="http://localhost:5000"

const getData=async(url)=>{
    try{
        var response=await fetch(`${ServerURL}/${url}`)
        var result=response.json()
        return(result)
    }
    catch(e){
        return(null)
    }
}

const postData=async(url,body)=>{
    try{
       /*  *****remove due to version change****** const headers={
            headers:{
                "content-type":isFile?"multipart/form-data":"application/json",
            }}*/
            var response=await axios.post(`${ServerURL}/${url}`,body)
            var result=await response.data
            return(result)
    }
    catch(error){
       // console.log(error)
        return(false)
    }
}
export{getData,postData,ServerURL}