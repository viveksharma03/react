import { useState, useEffect } from "react";
import { Grid, Button, TextField, Avatar } from "@mui/material";
import { ServerURL, getData, postData } from "../../Services/FetchNodeServices";
import { useStyles } from "./VehicleCss";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Swal from "sweetalert2";
import ListAltIcon from '@mui/icons-material/ListAlt';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { useNavigate } from "react-router-dom";


export default function Vehicle(props) {
    var classes = useStyles()
    var navigate = useNavigate()
    var [categoryList, setCategoryList] = useState([])
    var [categoryId, setCategoryId] = useState('')
    var [subCategoryList, setSubCategoryList] = useState([])
    var [subCategoryId, setSubCategoryId] = useState('')
    var [companyId, setCompanyId] = useState('')
    var [modelId, setModelId] = useState('')
    var [vendorId, setVendorId] = useState('')
    var [registrationNum, setRegistrationNum] = useState('')
    var [color, setColor] = useState('')
    var [fuelType, setFuelType] = useState('')
    var [rating, setRating] = useState('')
    var [average, setAverage] = useState('')
    var [remark, setRemark] = useState('')
    var [capacity, setCapacity] = useState('')
    var [companyList, setCompanyList] = useState([])
    var [modelList, setModelList] = useState([])
    var [itemStatus, setItemStatus] = useState([])
    var [feature, setFeature] = useState('')
    var [icon, setIcon] = useState({ filename: '/assets/defaultcar.png', bytes: '' })

    const handlePicture=(event)=>{
        setIcon({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    }
    const handleFuelType = (event) => {
        setFuelType(event.target.value)
    }
    const handleRating = (event) => {
        setRating(event.target.value)
    }
    //Category
    const fetchAllCategory = async () => {
        var response = await getData('category/display_all_category')
        setCategoryList(response.data)
    }
    useEffect(function () {
        fetchAllCategory();
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
    //End Category///

    //Sub Category
    const fetchAllSubCategoryByCategory = async (category_id) => {
        var body = { categoryid: category_id }
        var response = await postData('subcategory/fetch_all_subcategory_by_category', body)
        setSubCategoryList(response.result)
        //alert("hello")
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
        fetchAllCompanyBySubCategory(event.target.value)
    }

    //End Subcategory

    ////for company//////////
    const fetchAllCompanyBySubCategory = async (subcategory_id) => {
        var body = { subcategoryid: subcategory_id }
        var response = await postData('company/fetch_all_company_by_subcategory', body)
        setCompanyList(response.result)
        //alert("hello")
    }

    const fillCompanyDropDown = () => {
        return companyList.map((item) => {
            return (
                <MenuItem value={item.companyid}>{item.companyname}</MenuItem>
            )
        })
    }
    const handleCompanyChange = (event) => {
        setCompanyId(event.target.value)
        fetchAllModelBySubCompany(event.target.value)
    }
    ////////////End Company/////////

    ////for Model//////////
    const fetchAllModelBySubCompany = async (company_id) => {
        var body = { companyid: company_id }
        var response = await postData('model/fetch_all_model_by_company', body)
        setModelList(response.result)
        //alert("hello")
    }

    const fillModelDropDown = () => {
        return modelList.map((item) => {
           // alert(item.modelname)
            return (
                
                <MenuItem value={item.modelid}>{item.modelname}</MenuItem>
            )
        })
    }

    ///////////End Model ////////

    ///Submit////
const handleSubmit=async()=>{
    var formData=new FormData()
    formData.append('categoryid',categoryId)
    formData.append('subcategoryid',subCategoryId)
    formData.append('companyid',companyId)
    formData.append('modelid',modelId)
    formData.append('vendorid',vendorId)
    formData.append('registrationnum',registrationNum)
    formData.append('color',color)
    formData.append('fueltype',fuelType)
    formData.append('rating',rating)
    formData.append('average',average)
    formData.append('remark',remark)
    formData.append('capacity',capacity)
    formData.append('itemstatus',itemStatus)
    formData.append('feature',feature)
    formData.append('icon',icon.bytes)
var response=await postData('vehicle/submitvehicle',formData)
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

    //End Submit/////
    const handleModelChange = (event) => {
        setModelId(event.target.value)
    }
    const handleStatus=(event)=>{
        setItemStatus(event.target.value)
    }
    const handleClick=()=>{
navigate('/dashboard/displayallvehicle')
    }

    const handleReset=()=>{
        setCategoryId('')
        setSubCategoryId('')
        setCompanyId('')
        setModelId('')
        setVendorId('')
        setRegistrationNum('')
        setColor('')
        setFuelType('')
        setRating('')
        setAverage('')
        setRemark('')
        setCapacity('')
        setItemStatus('')
        setFeature('')
        setIcon({filename:'/assets/defaultcar.png', bytes: ''})
    }
    ////////////End Model/////////
    return (<div className={classes.mainContainer}>
        <div className={classes.box} >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <div style={{
                        display: "flex",
                        justifyContent: "left",
                        //position: "absolute",
                        right: "26vw",
                        top: "80px",
                        cursor: "pointer"
                       
                    }}>
                         <ListAltIcon onClick={handleClick} />
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
                    <TextField label="Vendor Id" fullWidth onChange={(event) => setVendorId(event.target.value)}></TextField>
                </Grid>
                <Grid item xs={3}>
                    <TextField label="Registration No." fullWidth onChange={(event) => setRegistrationNum(event.target.value)}></TextField>
                </Grid>
                <Grid item xs={3}>
                    <TextField label="Color" fullWidth onChange={(event) => setColor(event.target.value)}></TextField>
                </Grid>
                <Grid item xs={3}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Fuel Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            // value={age}
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
                        <InputLabel id="demo-simple-select-label">Rating</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            // value={age}
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
                    <TextField label="Average" fullWidth onChange={(event) => setAverage(event.target.value)}></TextField>
                </Grid>
                <Grid item xs={3}>
                    <TextField label="Remark" fullWidth onChange={(event) => setRemark(event.target.value)}></TextField>
                </Grid>
                <Grid item xs={3}>
                    <TextField label="Capacity" fullWidth onChange={(event) => setCapacity(event.target.value)}></TextField>
                </Grid>
                <Grid item xs={4}>
                <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Status</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={handleStatus}
      >
        <FormControlLabel value="continue" control={<Radio />} label="Continue" />
        <FormControlLabel value="discontinue" control={<Radio />} label="Discontinue" />
      </RadioGroup>
    </FormControl>

                </Grid>
                <Grid item xs={8}>
                    <TextField label="Feature" fullWidth onChange={(event) => setFeature(event.target.value)}></TextField>
                </Grid>
                <Grid item xs={6}  >
                    <Button fullWidth variant="contained" component="label" className={classes.center}>
                        Upload
                        <input hidden accept="image/*" multiple type="file"
                        onChange={handlePicture}
                        />
                    </Button>
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
                    onClick={handleReset}
                    >Reset</Button>
                </Grid>
            </Grid>
        </div>
    </div>)
}