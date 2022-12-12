import { useState,useEffect } from "react";
import MaterialTable from "@material-table/core";
import { ServerURL,postData,getData } from "../../Services/FetchNodeServices";
import { TextField,Button,Grid,Avatar } from "@material-ui/core";
import { useStyles } from "./DisplayAllSubCategoryCss";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function DisplayAllSubCategory(props){
    var classes=useStyles();
var [subCategory,setSubCategory]=useState([])
var [categoryId,setCategoryId]=useState('')
var [categoryList,setCategoryList]=useState([])
var [subCategoryName,SetSubCategoryName]=useState('')
var [subCategoryId,SetSubCategoryId]=useState('')
var [open,setOpen]=useState(false)
var [priority,setPriority]=useState('')
var [buttonStatus,setButtonStatus]=useState({upload:true})
var [icon,setIcon]=useState({filename:'/assets/defaultcar.png',bytes:''})
var [prevIcon,setPrevIcon]=useState('')
var [oldIcon,setOldIcon]=useState('')
var navigate=useNavigate()
const handleSetDataForDialog=(rowData)=>{
setOpen(true)
setIcon({filename:`${ServerURL}/images/${rowData.icon}`,bytes:''})
setPrevIcon(`${ServerURL}/images/${rowData.icon}`)
setOldIcon(rowData.icon)
setCategoryId(rowData.categoryid)
setPriority(rowData.priority)
SetSubCategoryName(rowData.subcategoryname)
SetSubCategoryId(rowData.subcategoryid)
}

const fetchAllSubCategory=async()=>{
    var result=await getData('subcategory/display_all_subcategory')
    setSubCategory(result.data)
    }
    useEffect(function(){
    fetchAllSubCategory()
    },[])
    /////////fillpriority dropdown
    const fillPriorityDropDown=()=>{
        return subCategory.map((item)=>{
            return(
                <MenuItem value={item.priority}>{item.priority}</MenuItem>
            )
        })
    }
    const handlepriorityChange=(event)=>{
        setPriority(event.target.value)
    }
    ///////

/////////Fill Category/////////
const fetchAllCategory=async()=>{
    var result=await getData('category/display_all_category')
setCategoryList(result.data)

}

useEffect(function(){
    fetchAllCategory()
    },[])
    const fillCategoryDropDown=()=>{
        return categoryList.map((item)=>{
            return(
                <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
            )
        })
    }
    const handleCategoryChange=(event)=>{
        setCategoryId(event.target.value)
    }
/////////////////////

const handleClose=()=>{
    setOpen(false)
    setButtonStatus({upload:true})
}
const handlePicture=(event)=>{
    setIcon({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    setButtonStatus({upload:false})
}
const showHidePictureButton=()=>{
     return(
        <div>
        {buttonStatus.upload?<><Button fullWidth variant="contained" component="label">
                            Upload
                            <input hidden accept="image/*" multiple type="file" onChange={handlePicture} />
                        </Button></>:<><Button color="primary" onClick={handleSavePicture} >Save</Button><Button color="secondary" onClick={handleDiscard}>Discard</Button></>}
        </div>
     )
     
}
const handleDiscard=()=>{
setIcon({filename:prevIcon,bytes:''})
setButtonStatus({upload:true})
}

const handleSavePicture=async()=>{
var formData=new FormData()
formData.append('subcategoryid',subCategoryId)
formData.append('icon',icon.bytes)
formData.append('oldicon',oldIcon)

var response=await postData('subcategory/edit_picture',formData)
if (response.status) {
    Swal.fire({
        icon: 'success',
        title: 'Done',
        text: 'Category Submitted Successfully'


    })
}
else {

    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!'
    })
}
setOpen(false)
setButtonStatus({upload:true})
fetchAllSubCategory()
}

const handleEditData=async()=>{
    var body={subcategoryid:subCategoryId,categoryid:categoryId,subcategoryname:subCategoryName,priority:priority}
    var response=await postData('subcategory/edit_data',body)
    if(response.status) {
        Swal.fire({
            icon: 'success',
            title: 'Done',
            text: 'Category Submitted Successfully'
    
    
        })
    }
    else {
    
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!'
        })
    }
    setOpen(false)
    fetchAllSubCategory()
}

const handleDeleteData=async()=>{
    var body={subcategoryid:subCategoryId,oldicon:oldIcon}
var response=await postData('subcategory/delete_data',body)
if(response.status) {
    Swal.fire({
        icon: 'success',
        title: 'Done',
        text: 'Category Submitted Successfully'


    })
}
else {

    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!'
    })
}
setOpen(false)
fetchAllSubCategory()
     
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
                    <Grid item xs={12} className={classes.headingText}>
                        Sub Category
                    </Grid>
                    <Grid item xs={12}>

                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={categoryId}
                                label="category"
                                onChange={handleCategoryChange}
                            >
                                
                              {fillCategoryDropDown()} 

                            </Select>
                        </FormControl>


                    </Grid>
                    <Grid item xs={12}>
                        <TextField value={subCategoryName} label="SubCategory Name" fullWidth onChange={(event)=>SetSubCategoryName(event.target.value)} />
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Priority</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={priority}
                                label="Priority"
                                onChange={handlepriorityChange}
                            >
                                 <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Select>
                        </FormControl>

                    </Grid>
                    <Grid item xs={6}>
                        {showHidePictureButton()}
                    </Grid>
                    <Grid item xs={6} className={classes.center}>
                        <Avatar
                            alt="Sub Category Icon"
                            src={icon.filename}
                            variant="rounded"
                            sx={{ width: 120, height: 56 }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained" fullWidth onClick={handleEditData} >
                           Edit
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained" fullWidth onClick={handleDeleteData}>
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

function displaySubCategory(){


    return(
        <div>
             <MaterialTable
      title="List Of SubCategories"
      columns={[
        { title: 'SubCategoryId', field: 'subcategoryid' },
        { title: 'Category Name', field: 'categoryname' },
        { title: 'SubCategoryName', field: 'subcategoryname' },
        { title: 'Priority', field: 'priority' },
        { title: 'Icon', field: 'icon',render:(rowData)=><Avatar src={`${ServerURL}/images/${rowData.icon}`} variant="rounded"></Avatar> },
      ]}
      data={subCategory}        
      actions={[
        {
          icon: 'edit',
          tooltip: 'Edit SubCategory',
          onClick: (event, rowData) => handleSetDataForDialog(rowData)
        },
        {
            icon: 'add',
            tooltip: 'Add User',
            isFreeAction: true,
            onClick: (event) => navigate('/dashboard/subcategory')
          }
      ]}
    />
        </div>
    )
}


    return(
        <div className={classes.dialogContainer}>
            <div className={classes.dialogBox}>
               {displaySubCategory()}
           </div>
            {showDialog()}
        </div>
    )

}