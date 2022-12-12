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
import { useStyles } from "./DisplayAllCompany.Css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { PermDeviceInformation } from "@mui/icons-material";

export default function DisplayAllCompany(props) {
  var classes = useStyles()
  var navigate=useNavigate();
  const [company, setCompany] = useState([])
  const [open, setOpen] = useState(false)
  const [categoryList, setCategoryList] = useState([])
  const [subCategoryList, setSubCategoryList] = useState([])
  const [categoryId, setCategoryId] = useState('')
  const [subCategoryId, setSubCategoryId] = useState('')
  const [companyId,setCompanyId]=useState('')
  const [companyName,setCompanyName]=useState('')
  const [icon,setIcon]=useState({filename:'assets/defaultcar.png',bytes:''})
  const [buttonStatus,setButtonStatus]=useState({upload:true})
  const [oldIcon,setOldIcon]=useState('')
  const [prevIcon,setPrevIcon]=useState('')
  /////fetch data for display table/////////////
  const fetchAllCompany = async () => {
    var result = await getData('company/display_all_company')
    //alert(result.data)
    setCompany(result.data)
  }
  useEffect(function () {
    fetchAllCompany()
  }, [])
  //////////////////////

  ///////////fetch alll category////
  const fetchAllCategory = async () => {
    var result = await getData('category/display_all_category')
    //alert(result.data)
    setCategoryList(result.data)
  }
  useEffect(function () {
    fetchAllCategory()
  }, [])
  const fillCategoryDropDown = () => {
    return categoryList.map((item) => {
      return (
        <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
      )
    })
  }
  const handleCategoryChange = (event) => {
    setCategoryId(event.target.value)
    fetchAllSubCategoryByCategory(event.target.value)
  }
  //////////////////////////////

  /////////////fetch and fill sub category dropdown/////
  const fetchAllSubCategoryByCategory = async (category_id) => {
    var body = { categoryid: category_id }
    var result = await postData('subcategory/fetch_all_subcategory_by_category', body)
    //alert(result.data)
    setSubCategoryList(result.result)
  }
 
  const fillSubCategoryDropDown = () => {
    return subCategoryList.map((item) => {
      return (
        <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
      )
    })
  }
  const handleSubCategoryChange = (event) => {
    setSubCategoryId(event.target.value)
  }
  ////////////////////////////////////////////////////
  const handleSetDataForDialog = (rowData) => {
    setOpen(true)
    setCategoryId(rowData.categoryid)
    setSubCategoryId(rowData.subcategoryid)
    setCompanyId(rowData.companyid)
    setCompanyName(rowData.companyname)
    setIcon({filename:`${ServerURL}/images/${rowData.icon}`,bytes:''})
    setOldIcon(rowData.icon)
    fetchAllSubCategoryByCategory(rowData.categoryid)
    setPrevIcon(`${ServerURL}/images/${rowData.icon}`)
  }
  const handleClose = () => {
    setOpen(false)
    setButtonStatus({upload:true})
  }
  const handlePicture=(event)=>{
    setIcon({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    setButtonStatus({upload:false})
  }
  const handleSavePicture=async()=>{
    var formData=new FormData()
    formData.append('companyid',companyId)
    formData.append('icon',icon.bytes)
    formData.append('oldicon',oldIcon)
    var response=await postData('company/edit_picture',formData)
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
    fetchAllCompany()
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
                       </Button></>:<><Button color="primary" onClick={handleSavePicture}  >Save</Button><Button color="secondary" onClick={handleDiscard} >Discard</Button></>}
       </div>
    )
    
}
const handleDeleteData=async()=>{
  var body={companyid:companyId,oldicon:oldIcon}
  var response= await postData('company/delete_data',body)
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
fetchAllCompany()
}
const handleSubmitData=async()=>{
  var body={categoryid:categoryId,subcategoryid:subCategoryId,companyname:companyName,companyid:companyId}
var response=await postData('company/edit_data',body)
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
fetchAllCompany()
}
  const showDialog = () => {
    return (
      <div>
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
                  Company Interface
                </Grid>

                <Grid item xs={6} spacing={2}>
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
                <Grid item xs={6} spacing={2}>
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
                <Grid item xs={12}>
                  <TextField value={companyName} label="Company Name" fullWidth onChange={(event)=>setCompanyName(event.target.value)}></TextField>
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
                  <Button variant="contained"  fullWidth onClick={handleSubmitData}  >Submit</Button>
                </Grid>
                <Grid item xs={6} >
                  <Button variant="contained"  fullWidth onClick={handleDeleteData} >Delete</Button>
                </Grid>
              </Grid>
            </div>

          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
  function displayCompanies() {
    return (

      <MaterialTable
        title="List of Company"
        columns={[
          { title: 'Company Id', field: 'companyid' },
          { title: 'Category Name', field: 'categoryname' },
          { title: 'Sub Category Name', field: 'subcategoryname' },
          { title: 'Company Name', field: 'companyname' },
          { title: 'Icon', field: 'icon', render: (rowData) => <Avatar src={`${ServerURL}/images/${rowData.icon}`} variant="rounded" ></Avatar> }

        ]}
        data={company}
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
              onClick: (event) => navigate('/dashboard/company')
            }
        ]}
      />

    )
  }
  return (<div className={classes.dialogContainer}>
    <div className={classes.dialogBox}>
      {displayCompanies()}
    </div>
    {showDialog()}
  </div>)
}