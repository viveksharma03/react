import MaterialTable from "@material-table/core";
import { useState,useEffect } from "react";
import { getData,postData,ServerURL } from "../../Services/FetchNodeServices";
import {Avatar,Button,TextField,Grid} from "@material-ui/core";
// ***we can use this also *** import { Avatar,Button,TextField,Grid} from "@mui/material";
import { useStyles } from "./DisplayAllCategoryCss";
import Swal from "sweetalert2";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useNavigate } from "react-router-dom";

export default function DisplayAllCategory(props){
  var classes=useStyles()
  var [icon,setIcon]=useState({filename:'/assets/defaultcar.png',bytes:''})
  var [prevIcon,setPrevIcon]=useState('')
  var [oldIcon,setOldIcon]=useState('')
var [categoryName,setCategoryName]=useState('')
var [categoryId,setCategoryId]=useState('')
  var [buttonStatus,setButtonStatus]=useState({upload:true})
var [category,setCategory]=useState([])
var navigate=useNavigate()
const [open,setOpen]=useState(false)
const fetchAllCategory=async()=>{
var result=await getData('category/display_all_category')
setCategory(result.data)
}
useEffect(function(){
fetchAllCategory()
},[])
const handleSetDataForDialog=(rowData)=>{
  setOpen(true)
  setCategoryId(rowData.categoryid)
setCategoryName(rowData.categoryname)
setIcon({filename:`${ServerURL}/images/${rowData.icon}`,bytes:''})
setPrevIcon(`${ServerURL}/images/${rowData.icon}`)
setOldIcon(rowData.icon)


}
    function displayCategories() {
        return (
          <MaterialTable
            title="List Of Categories"
            columns={[
              { title: 'Category Id', field: 'categoryid' },
              { title: 'Name', field: 'categoryname' },
              { title: 'Icon', field: 'icon',render:(rowData)=><Avatar src={`${ServerURL}/images/${rowData.icon}`} style={{width:40,height:40,}} variant="rounded"/> },
            ]}
            data={category}        
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Categories',
                onClick: (event, rowData) => handleSetDataForDialog(rowData)
              },
              {
                icon: 'add',
                tooltip: 'Add Category',
                isFreeAction: true,
                onClick: (event) => navigate('/dashboard/category')
              }
            ]}
          />
        )
      }
const handleClose=()=>{
  setOpen(false)
}
const handleDiscard=()=>{
  setIcon({filename:prevIcon,bytes:''})
 setButtonStatus({upload:true})

}
const handlePicture=(event)=>{
setIcon({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
setButtonStatus({upload:false})
}
const handleEditData=async()=>{
  var body={categoryname:categoryName,categoryid:categoryId}
  
  
var response=await postData('category/edit_data',body)
if (response.status) {
  Swal.fire({
    
      icon: 'success',
      title: 'Done',
      text: 'Category Updated Successfully'

      
    })
}
else{

  Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!'
    })
}
setOpen(false)

fetchAllCategory()
}


const handleDelete=async()=>{
  var body={categoryid:categoryId,oldicon:oldIcon}
  
  
var response=await postData('category/delete_data',body)
if (response.status) {
  Swal.fire({
    
      icon: 'success',
      title: 'Done',
      text: 'Category Deleted Successfully'

      
    })
}
else{

  Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!'
    })
}
setOpen(false)

fetchAllCategory()
}



const handleSavePicture=async()=>{
  var formData=new FormData()
  formData.append('categoryid',categoryId)
  formData.append('icon',icon.bytes)
  formData.append('oldicon',oldIcon)
var response=await postData('category/edit_picture',formData)
if (response.status) {
  Swal.fire({
    
      icon: 'success',
      title: 'Done',
      text: 'Icon Updated Successfully'

      
    })
}
else{

  Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!'
    })
}
setOpen(false)
setButtonStatus({upload:true})
fetchAllCategory()
}


const showHidePictureButton=()=>{
return(
  <div>
    {buttonStatus.upload?<><Button fullWidth variant="contained" component="label" >
        Upload
        <input onChange={handlePicture} hidden accept="image/*" multiple type="file"  />
      </Button></>:<><Button color="primary" onClick={handleSavePicture} >Save</Button><Button onClick={handleDiscard} color="secondary"  >Discard</Button></>}
  </div>
)
}

      const showDialog=()=>{

        return(
          <div>
          
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            
            <DialogContent>

        <div className={classes.box}>
<Grid container spacing={2}>
<Grid item xs={12} className={classes.headingStyle}>
Category Interface
</Grid>
<Grid item xs={12}>
<TextField value={categoryName} label="Category Name" fullWidth onChange={(event)=>setCategoryName(event.target.value)}/>
</Grid>

<Grid item xs={6}>
{showHidePictureButton()}
</Grid>
<Grid item xs={6} className={classes.center}>
     <Avatar variant="rounded"
        alt="Category Icon"
        src={icon.filename}
        sx={{ width: 120, height: 56 }}
      />
</Grid>
<Grid item xs={6}>
<Button  variant="contained" fullWidth onClick={handleEditData}>
   Edit
</Button>
</Grid >
<Grid item xs={6}>
<Button  variant="contained" fullWidth onClick={handleDelete} >
   Delete
</Button>
</Grid>
</Grid>
</div>
    
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} autoFocus>
               Close
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        )
      }
    return(
        <div className={classes.dialogContainer}>
          <div className={classes.dialogBox}>
{displayCategories()}
</div>
{showDialog()}
        </div>
    )
}


