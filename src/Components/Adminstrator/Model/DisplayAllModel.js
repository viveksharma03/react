import { useState, useEffect } from "react";
import MaterialTable from "@material-table/core";
import { ServerURL, getData, postData } from "../../Services/FetchNodeServices";
import { Grid, Avatar, TextField, Button } from "@material-ui/core";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useStyles } from "./DisplayAllModelCss";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { wait } from "@testing-library/user-event/dist/utils";

export default function DisplayAllModel(props){
    var classes=useStyles();
    var navigate=useNavigate()
var [model,setModel]=useState([])
var [modelId,setModelId]=useState('')
var [open,setOpen]=useState(false)
var [buttonStatus,setButtonStatus]=useState({upload:true})
var [categoryList, setCategoryList] = useState([])
    var [categoryId, setCategoryId] = useState('')
    var [subCategoryList, setSubCategoryList] = useState([])
    var [subCategoryId, setSubCategoryId] = useState('')
    var [companyId,setCompanyId]=useState('')
    var [companyList,setCompanyList]=useState([])
    var [modelName,setModelName]=useState('')
    var [modelYear,setModelYear]=useState('')
    var [icon, setIcon] = useState({ filename: '/assets/defaultcar.png', bytes: '' })
    var [oldIcon,setOldIcon]=useState('')
    var [prevIcon,setPrevIcon]=useState('')
const handleSetDataForDialog=(rowData)=>{
    setOpen(true)
    setModelId(rowData.modelid)
    setIcon({filename:`${ServerURL}/images/${rowData.icon}`,bytes:''})
    setPrevIcon(`${ServerURL}/images/${rowData.icon}`)
    setOldIcon(rowData.icon)
    setCategoryId(rowData.categoryid)
    setSubCategoryId(rowData.subcategoryid)
    fetchAllSubCategoryByCategory(rowData.categoryid)
    fetchAllCompanyBySubCategory(rowData.subcategoryid)
    setCompanyId(rowData.companyid)
    setModelName(rowData.modelname)
    setModelYear(rowData.modelyear)
}/////data for model table//
const fetchAllModel=async()=>{
var response=await getData('model/display_all_model')
setModel(response.data)
}
useEffect(function(){
    fetchAllModel()
    fetchAllCategory()
},[])
////////////////////
///////////fetch and fill data of category drop down//////////
const fetchAllCategory=async()=>{
    var response=await getData('category/display_all_category')
    setCategoryList(response.data)
}
const fillCategoryDropDown=()=>{
    return categoryList.map((item)=>{
        return(
            <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
        )
    })
}
const handleCategoryChange=(event)=>{
    setCategoryId(event.target.value)
    fetchAllSubCategoryByCategory(event.target.value)
}
///////////////////////////////
///////////fetch and fill data of subcategory drop down//////////
const fetchAllSubCategoryByCategory=async(category_id)=>{
    var body={categoryid:category_id}
    var response=await postData('subcategory/fetch_all_subcategory_by_category',body)
    setSubCategoryList(response.result)
}
const fillSubCategoryDropDown=()=>{
    return subCategoryList.map((item)=>{
        return(
            <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
        )
    })
}
const handleSubCategoryChange=(event)=>{
    setSubCategoryId(event.target.value)
    fetchAllCompanyBySubCategory(event.target.value)
}
///////////////////////////////
///////////fetch and fill data of Company drop down//////////
const fetchAllCompanyBySubCategory=async(subcategory_id)=>{
    var body={subcategoryid:subcategory_id}
    var response=await postData('company/fetch_all_company_by_subcategory',body)
setCompanyList(response.result)
}
const fillCompanyDropDown=()=>{
    return companyList.map((item)=>{
        return(
            <MenuItem value={item.companyid}>{item.companyname}</MenuItem>
        )
    })
}
const handleCompanyChange=(event)=>{
    setCompanyId(event.target.value)
}
///////////////////////////////
const handleClose=()=>{
    setOpen(false)
}
const handlePicture=(event)=>{
    setIcon({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    setButtonStatus({upload:false})
  }
  const handleSavePicture=async()=>{
    var formData=new FormData()
    formData.append('modelid',modelId)
    formData.append('icon',icon.bytes)
    formData.append('oldicon',oldIcon)
    var response=await postData('model/edit_picture',formData)
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
    setButtonStatus({upload:true})
    setOpen(false)
    fetchAllModel()
  }
  const handleDiscard=()=>{
    setButtonStatus({upload:true})
    setIcon({filename:prevIcon,bytes:''})
    //setOpen(false)
  }
const showHidePictureButton=()=>{
    return(
       <div>
       {buttonStatus.upload?<><Button fullWidth variant="contained" component="label">
                           Upload
                           <input hidden accept="image/*" multiple type="file" onChange={handlePicture} />
                       </Button></>:<><Button color="primary" onClick={handleSavePicture} >Save</Button><Button onClick={handleDiscard} color="secondary" >Discard</Button></>}
       </div>
    )
    
}
const handleDelete=async()=>{
    var body={modelid:modelId,oldicon:oldIcon}
    var response=await postData('model/delete_data',body)
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
    fetchAllModel()
}
const handleSubmit=async()=>{
    var body={categoryid:categoryId,subcategoryid:subCategoryId,companyid:companyId,modelname:modelName,modelyear:modelYear,modelid:modelId}
var response=await postData('model/edit_data',body)
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
fetchAllModel()
}
const showDialog=()=>{
    return(
    <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    
    <DialogContent>
    <div className={classes.box} >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    Model Interface
                </Grid>

                <Grid item xs={4} spacing={2}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                           value={categoryId}
                            label="Category"
                            onChange={handleCategoryChange}
                            
                        >
                            {fillCategoryDropDown()}
                        </Select>
                    </FormControl>

                </Grid>
                <Grid item xs={4} spacing={2}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Sub Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={subCategoryId}
                            label="Select Sub Category"
                            onChange={handleSubCategoryChange}
                           
                        >
                           {fillSubCategoryDropDown()}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={4} spacing={2}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Company</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={companyId}
                            label="Category"
                            onChange={handleCompanyChange}
                          
                        >
                           {fillCompanyDropDown()}
                        </Select>
                    </FormControl>

                </Grid>
                <Grid item xs={6}>
                    <TextField value={modelName} label="Model Name" fullWidth onChange={(event)=>setModelName(event.target.value)}></TextField>
                </Grid>
                <Grid item xs={6}>
                    <TextField value={modelYear} label="Model Year" fullWidth onChange={(event)=>setModelYear(event.target.value)}></TextField>
                </Grid>
                <Grid item xs={6}  >
                {showHidePictureButton()}
                </Grid>
                <Grid item xs={6} className={classes.center} >
                    <Avatar
                        alt="Company icon"
                        src={icon.filename}
                        variant="rounded"
                        sx={{ width: 130, height: 60 }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Button variant="contained"  fullWidth onClick={handleSubmit} >Submit</Button>
                </Grid>
                <Grid item xs={6} >
                    <Button variant="contained"  fullWidth onClick={handleDelete}>Delete</Button>
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
    )
}
function displayModels(){
    return(
        <MaterialTable
        title="List of Model"
        columns={[
          { title: 'Model Id', field: 'modelid' },
          { title: 'Category Id', field: 'categoryname' },
          { title: 'Sub Category Id', field: 'subcategoryname' },
          { title: 'Company Id', field: 'companyname' },
          { title: 'Model Name', field: 'modelname' },
          { title: 'Model Year', field: 'modelyear' },
          { title: 'Icon', field: 'icon', render: (rowData) => <Avatar src={`${ServerURL}/images/${rowData.icon}`} variant="rounded" ></Avatar> }

        ]}
        data={model}
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit Company',
            onClick: (event, rowData) => handleSetDataForDialog(rowData)
          },
          {
              icon: 'add',
              tooltip: 'Add User',
              isFreeAction: true,
              onClick: (event) => navigate('/dashboard/model')
            }
        ]}
      />

    )
}

    return(
        
          <div className={classes.dialogContainer}>
    <div className={classes.dialogBox}>
      {displayModels()}
    </div>
    {showDialog()}
  </div>  
       
    )
}