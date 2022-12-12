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
import { useStyles } from "./DisplayAllVehicleCss";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';


export default function DisplayAllVehicle(props){
    var classes=useStyles();
    var navigate=useNavigate()
    var [vehicle,setVehicle]=useState([])
    var [vehicleId,setVehicleId]=useState('')
var [open,setOpen]=useState(false)
var [buttonStatus,setButtonStatus]=useState({upload:true})
var [categoryList, setCategoryList] = useState([])
var [categoryId, setCategoryId] = useState('')
var [subCategoryList, setSubCategoryList] = useState([])
var [subCategoryId, setSubCategoryId] = useState('')
var [companyList, setCompanyList] = useState([])
var [companyId, setCompanyId] = useState('')
var [modelList, setModelList] = useState([])
var [modelId, setModelId] = useState('')
var [vendorId, setVendorId] = useState('')
var [registrationNum, setRegistrationNum] = useState('')
var [color, setColor] = useState('')
var [fuelType, setFuelType] = useState('')
var [rating, setRating] = useState('')
var [average, setAverage] = useState('')
var [remark, setRemark] = useState('')
var [capacity, setCapacity] = useState('')
var [itemStatus, setItemStatus] = useState([])
var [feature, setFeature] = useState('')

    var [icon, setIcon] = useState({ filename: '/assets/defaultcar.png', bytes: '' })
    var [oldIcon,setOldIcon]=useState('')
    var [prevIcon,setPrevIcon]=useState('')
const handleSetDataForDialog=(rowData)=>{
    setOpen(true)
    setVehicleId(rowData.vehicleid)
    setIcon({filename:`${ServerURL}/images/${rowData.icon}`,bytes:''})
    setPrevIcon(`${ServerURL}/images/${rowData.icon}`)
    setOldIcon(rowData.icon)
    setCategoryId(rowData.categoryid)
    setSubCategoryId(rowData.subcategoryid)
    fetchAllSubCategoryByCategory(rowData.categoryid)
    fetchAllCompanyBySubCategory(rowData.subcategoryid)
    fetchAllModelByCompany(rowData.companyid)
    setCompanyId(rowData.companyid)
    setModelId(rowData.modelid)
    setVendorId(rowData.vendorid)
    setRegistrationNum(rowData.registrationnum)
    setColor(rowData.color)
    setFuelType(rowData.fueltype)
    setRating(rowData.rating)
    setAverage(rowData.average)
    setRemark(rowData.remark)
    setCapacity(rowData.capacity)
    setItemStatus(rowData.itemstatus)
    setFeature(rowData.feature)

}/////data for model table//
const fetchAllVehicle=async()=>{
var response=await getData('vehicle/display_all_vehicle')
setVehicle(response.data)
}
useEffect(function(){
    fetchAllVehicle()
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
    fetchAllModelByCompany(event.target.value)
}
///////////////////////////////

///////////fetch and fill data of Model drop down//////////
const fetchAllModelByCompany=async(company_id)=>{
    var body={companyid:company_id}
    var response=await postData('model/fetch_all_model_by_company',body)
setModelList(response.result)
}
const fillModelDropDown=()=>{
    return modelList.map((item)=>{
        return(
            <MenuItem value={item.modelid}>{item.modelname}</MenuItem>
        )
    })
}
const handleModelChange=(event)=>{
    setModelId(event.target.value)
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
    formData.append('vehicleid',vehicleId)
    formData.append('icon',icon.bytes)
    formData.append('oldicon',oldIcon)
    var response=await postData('vehicle/edit_picture',formData)
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
    fetchAllVehicle()
  }
  const handleDiscard=()=>{
    setButtonStatus({upload:true})
    setIcon({filename:prevIcon,bytes:''})
    setOpen(false)
  }
  const handleFuelType=(event)=>{
    setFuelType(event.target.value)
  }
  const handleRating=(event)=>{
    setRating(event.target.value)
  }
  const handleStatus=(event)=>{
    setItemStatus(event.target.value)
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
    var body={vehicleid:vehicleId,oldicon:oldIcon}
    var response=await postData('vehicle/delete_data',body)
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
    fetchAllVehicle()
}
const handleSubmit=async()=>{
    var body={categoryid:categoryId,subcategoryid:subCategoryId,companyid:companyId,modelid:modelId,vendorid:vendorId,registrationnum:registrationNum,color:color,fueltype:fuelType,rating:rating,average:average,remark:remark,capacity:capacity,itemstatus:itemStatus,feature:feature,vehicleid:vehicleId}
var response=await postData('vehicle/edit_data',body)
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
fetchAllVehicle()
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
                    <div style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        position: "absolute",
                        right: "31vw",
                        top: "80px",
                        cursor: "pointer"
                        //<ListAltIcon onClick={handleClick} />
                    }}>

                    </div>
                    <div>Vehicle Interface</div>
                </Grid>

                <Grid item xs={3} spacing={2}>
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
                <Grid item xs={3} spacing={2}>
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
                <Grid item xs={3} spacing={2}>
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
                <Grid item xs={3} spacing={2}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Model</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={modelId}
                            label="Model"
                            onChange={handleModelChange}
                            
                        >
                          {fillModelDropDown()}  
                        </Select>
                    </FormControl>

                </Grid>
                <Grid item xs={3}>
                    <TextField value={vendorId} label="Vendor Id" fullWidth onChange={(event) => setVendorId(event.target.value)}></TextField>
                </Grid>
                <Grid item xs={3}>
                    <TextField value={registrationNum} label="Registration No." fullWidth onChange={(event) => setRegistrationNum(event.target.value)}></TextField>
                </Grid>
                <Grid item xs={3}>
                    <TextField value={color} label="Color" fullWidth onChange={(event) => setColor(event.target.value)}></TextField>
                </Grid>
                <Grid item xs={3}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Fuel Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                             value={fuelType}
                            label="Fuel Type"
                            onChange={handleFuelType}
                        >
                            <MenuItem value="CNG">CNG</MenuItem>
                            <MenuItem value="ELECTRIC">ELECTRIC</MenuItem>
                            <MenuItem value="DISEL">DISEL</MenuItem>
                            <MenuItem value="PETROL">PETROL</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={3}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Ratings</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                             value={rating}
                            label="Ratings"
                            onChange={handleRating}
                        >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={3}>
                    <TextField value={average} label="Average" fullWidth onChange={(event) => setAverage(event.target.value)}></TextField>
                </Grid>
                <Grid item xs={3}>
                    <TextField value={remark} label="Remarks" fullWidth onChange={(event) => setRemark(event.target.value)}></TextField>
                </Grid>
                <Grid item xs={3}>
                    <TextField value={capacity} label="Capacity" fullWidth onChange={(event) => setCapacity(event.target.value)}></TextField>
                </Grid>
                <Grid item xs={4}>
                <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Status</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={itemStatus}
        onChange={handleStatus}
      >
        <FormControlLabel value="continue" control={<Radio />} label="Continue" />
        <FormControlLabel value="discontinue" control={<Radio />} label="Discontinue" />
      </RadioGroup>
    </FormControl>

                </Grid>
                <Grid item xs={8}>
                    <TextField value={feature} label="Feature" fullWidth onChange={(event) => setFeature(event.target.value)}></TextField>
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
                    <Button variant="contained" fullWidth
                     onClick={handleSubmit}
                    >Submit</Button>
                </Grid>
                <Grid item xs={6} >
                    <Button variant="contained" fullWidth
                    onClick={handleDelete}
                    >Delete</Button>
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
function displayVehicles(){
    return(
        <MaterialTable
        title="List of Vehicles"
        columns={[
          { title: 'VehicleId/VendorId', field: 'vehicleid',render:(rowData)=><div>{rowData.vehicleid}/{rowData.vendorid}<br/>{rowData.itemstatus}</div> },
          { title: 'Category/SubCategory Name', field: 'categoryname',render:(rowData)=><div>{rowData.categoryname}<br/>{rowData.subcategoryname}</div> },
          { title: 'Company/Model Name/Capacity',render:(rowData)=><div>{rowData.companyname}<br/>{rowData.modelname}/{rowData.capacity}</div> },
          { title: 'Registration Num/Color/Fueltype/average', field: 'registrationnum',render:(rowData)=><div>{rowData.registrationnum}/{rowData.color}<br/>{rowData.fueltype}/{rowData.average}</div> },
          { title: 'Rating', field: 'rating' },
          { title: 'Remark', field: 'remark' },
          { title: 'Feature', field: 'feature' },
          { title: 'Icon', field: 'icon', render: (rowData) => <Avatar src={`${ServerURL}/images/${rowData.icon}`} variant="rounded" ></Avatar> }

        ]}
        data={vehicle}
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
              onClick: (event) => navigate('/dashboard/vehicle')
            }
        ]}
      />

    )
}

    return(
        
          <div className={classes.dialogContainer}>
    <div className={classes.dialogBox}>
      {displayVehicles()}
    </div>
    {showDialog()}
  </div>  
       
    )
}