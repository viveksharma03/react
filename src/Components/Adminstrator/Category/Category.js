import {useEffect,useState} from "react";
import { Grid,TextField,Button,Avatar} from "@mui/material";
import {useStyles} from "./CategoryCss"
import { ServerURL,postData } from "../../Services/FetchNodeServices"; 
import Swal from "sweetalert2";
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useNavigate } from "react-router-dom";
export default function Category(props){
const classes=useStyles()
var [icon,setIcon]=useState({filename:'/assets/defaultcar.png',bytes:''})
var [categoryName,setCategoryName]=useState('')
var navigate=useNavigate()
const handlePicture=(event)=>{
//alert("xxxx")
setIcon({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
}
const handleSubmit=async()=>{
var formData=new FormData()

formData.append('categoryname',categoryName)//
formData.append('icon',icon.bytes)
var response=await postData('category/categorysubmit',formData)
//alert(response.status)
if (response.status) {
    Swal.fire({
        icon: 'success',
        title: 'Done',
        text: 'Category Submitted Successfully'

        
      })
}
else{

    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!'
      })
}

}

const clearValues=()=>{
    setCategoryName('')
setIcon({filename:'/assets/defaultcar.png',bytes:''})
}
const handleShowCategoryList=()=>{
navigate('/dashboard/displayallcategory')
}

    return(<div className={classes.mainContainer}>
        <div className={classes.box}>
<Grid container spacing={2}>
<Grid item xs={12} className={classes.headingStyle}>
<div >
                        <div style={{
                            display: "flex",
                            justifyContent: "left",
                           // position: "absolute",
                            right: "31vw",
                            top: "30%",
                            
                            cursor: "pointer"
                           }}>
                            <ListAltIcon onClick={handleShowCategoryList} />
                        </div>
                        <div style={{
                            paddingLeft:'1%',
                            
                           }}>
                            Category Interface
                        </div>
                    </div>
</Grid>
<Grid item xs={12}>
<TextField label="Category Name" fullWidth onChange={(event)=>setCategoryName(event.target.value)}/>
</Grid>
<Grid item xs={6}>
<Button fullWidth variant="contained" component="label" >
        Upload
        <input hidden accept="image/*" multiple type="file" onChange={handlePicture} />
      </Button>
</Grid>
<Grid item xs={6} className={classes.center}>
     <Avatar variant="rounded"
        alt="Category Icon"
        src={icon.filename}
        sx={{ width: 120, height: 56 }}
      />
</Grid>
<Grid item xs={6}>
<Button onClick={handleSubmit} variant="contained" fullWidth>
    Submit
</Button>
</Grid >
<Grid item xs={6}>
<Button onClick={clearValues} variant="contained" fullWidth >
   Reset
</Button>
</Grid>
</Grid>
</div>
    </div>)
}