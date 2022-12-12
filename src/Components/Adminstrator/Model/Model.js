import { useState, useEffect } from "react";
import { Grid, Button, TextField, Avatar } from "@mui/material";
import { ServerURL, postData, getData } from "../../Services/FetchNodeServices";
import { useStyles } from "./ModelCss";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Swal from "sweetalert2";
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useNavigate } from "react-router-dom";
export default function Model(props) {
    var navigate=useNavigate()
    var classes = useStyles();
    var [categoryList, setCategoryList] = useState([])
    var [categoryId, setCategoryId] = useState('')
    var [subCategoryList, setSubCategoryList] = useState([])
    var [subCategoryId, setSubCategoryId] = useState('')
    var [companyId,setCompanyId]=useState('')
    var [companyList,setCompanyList]=useState([])
    var [modelName,setModelName]=useState('')
    var [modelYear,setModelYear]=useState('')
    var [icon, setIcon] = useState({ filename: '/assets/defaultcar.png', bytes: '' })

    const handlePicture=(event)=>{
        setIcon({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    }

    //// category///////////
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
    /////////////////////////////

    //////////sub category//////////////
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
    ////////////////////////////////////

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
    }
    /////////////////////
const handleSubmit=async()=>{
    var  formData=new FormData()
    formData.append('categoryid',categoryId)
    formData.append('subcategoryid',subCategoryId)
    formData.append('companyid',companyId)
    formData.append('modelname',modelName)
    formData.append('modelyear',modelYear)
    formData.append('icon',icon.bytes)

    var response=await postData('model/submitmodel',formData)
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

const handleReset=()=>{
    setCategoryId('')
    setSubCategoryId('')
    setCompanyId('')
    setModelName('')
    setModelYear('')
    setIcon({filename:'/assets/defaultcar.png'})
    
    
}

const handleClick=()=>{
    navigate('/dashboard/displayallmodel')
}
    return (<div className={classes.mainContainer}>
        <div className={classes.box} >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                <div style={{
                            display: "flex",
                            justifyContent: "left",
                            //position: "absolute",
                            right: "31vw",
                            top: "80px",
                            cursor: "pointer"
                           }}>
                            <ListAltIcon onClick={handleClick} />
                        </div>
                    <div>Model Interface</div>
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
                    <TextField label="Model Name" fullWidth onChange={(event)=>setModelName(event.target.value)}></TextField>
                </Grid>
                <Grid item xs={6}>
                    <TextField label="Model Year" fullWidth onChange={(event)=>setModelYear(event.target.value)}></TextField>
                </Grid>
                <Grid item xs={6}  >
                    <Button fullWidth variant="contained" component="label" className={classes.center}>
                        Upload
                        <input hidden accept="image/*" multiple type="file" onChange={handlePicture}/>
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
                    <Button variant="contained"  fullWidth onClick={handleSubmit}>Submit</Button>
                </Grid>
                <Grid item xs={6} >
                    <Button variant="contained"  fullWidth onClick={handleReset}>Reset</Button>
                </Grid>
            </Grid>
        </div>
    </div>)
}