import { useState, useEffect } from "react";
import { Grid, Button, TextField, Avatar } from "@mui/material";
import { ServerURL, postData, getData } from "../../Services/FetchNodeServices";
import { useStyles } from "./CompanyCss";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Swal from "sweetalert2";
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useNavigate } from "react-router-dom";
export default function Company(props) {
    var navigate = useNavigate()
    var classes = useStyles();
    var [categoryList, setCategoryList] = useState([])
    var [categoryId, setCategoryId] = useState('')
    var [subCategoryList, setSubCategoryList] = useState([])
    var [subCategoryId, setSubCategoryId] = useState('')
    var [companyName, setCompanyName] = useState('')
    var [icon, setIcon] = useState({ filename: '/assets/defaultcar.png', bytes: '' })

    const handlePicture = (event) => {
        setIcon({ filename: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
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
    }
    ////////////////////////////////////
    const handleSubmit = async () => {
        var formData = new FormData()
        formData.append('categoryid', categoryId)
        formData.append('subcategoryid', subCategoryId)
        formData.append('companyname', companyName)
        formData.append('icon', icon.bytes)

        var response = await postData('company/submitcompany', formData)
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
    }

    const handleReset = () => {
        setCategoryId('')
        setSubCategoryId('')
        setCompanyName('')
        setIcon({ filename: '/assets/defaultcar.png' })
    }

    const handleClick = () => {
        navigate('/dashboard/displayallcompany')
    }
    return (<div className={classes.mainContainer}>
        <div className={classes.box} >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <div >
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
                        <div>
                            Company Interface
                        </div>
                    </div>
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
                    <TextField label="Company Name" fullWidth onChange={(event) => setCompanyName(event.target.value)}></TextField>
                </Grid>
                <Grid item xs={6}  >
                    <Button fullWidth variant="contained" component="label" className={classes.center}>
                        Upload
                        <input hidden accept="image/*" multiple type="file" onChange={handlePicture} />
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