import { useState, useEffect } from "react";
import { Grid, TextField, Button, Avatar } from "@mui/material";
import { useStyles } from "./SubCategoryCss";
import { ServerURL, postData, getData } from "../../Services/FetchNodeServices";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Swal from "sweetalert2";
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useNavigate } from "react-router-dom";
export default function SubCategory(props) {
    const classes = useStyles()

    var [icon, setIcon] = useState({ filename: '/assets/defaultcar.png', bytes: '' })
    var [categoryId, setCategoryId] = useState('')
    var [subCategoryName, setSubCategoryName] = useState('')
    var [priority, setPriority] = useState('')
    var [categoryList, setCategoryList] = useState([])
    var navigate=useNavigate()
    const fetchAllCategory = async () => {
        var result = await getData('category/display_all_category')
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

    const handleChange = (event) => {
        setCategoryId(event.target.value)
        //alert(event.target.value)
    }

    const handlePicture = (event) => {
        setIcon({ filename: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
    }
    const clearValues = () => {
        setCategoryId('')
        setPriority('')
        setSubCategoryName('')
        setIcon({ filename: '/assets/defaultcar.png', bytes: '' })
    }
    const handleSubmit = async () => {
        var formData = new FormData()
        formData.append('categoryid', categoryId)
        formData.append('subcategoryname', subCategoryName)
        formData.append('priority', priority)
        formData.append('icon', icon.bytes)

        var response = await postData('subcategory/submitsubcategory', formData)
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
    const handlePriority=(event)=>{
        setPriority(event.target.value)
    }
    const handleShowSubCategoryList=()=>{
navigate('/dashboard/displayallsubcategory')
    }
    
    return (
        <div className={classes.mainContainer}>
            <div className={classes.box}>
                <Grid container spacing={2}>
                    <Grid item xs={12} className={classes.headingText}>
                    <div >
                        <div style={{
                            display: "flex",
                            justifyContent: "left",
                            //position: "absolute",
                            right: "31vw",
                            top: "80px",
                            cursor: "pointer"
                           }}>
                            <ListAltIcon onClick={handleShowSubCategoryList} />
                        </div>
                        <div>
                            SubCategory Interface
                        </div>
                    </div>
                        
                    </Grid>
                    <Grid item xs={12}>

                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={categoryId}
                                label="category"
                                onChange={handleChange}
                            >
                                {fillCategoryDropDown()}

                            </Select>
                        </FormControl>


                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="SubCategory Name" fullWidth onChange={(event) => setSubCategoryName(event.target.value)} />
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Priority</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                               // value={age}
                                label="Priority"
                                onChange={handlePriority}
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
                        <Button fullWidth variant="contained" component="label">
                            Upload
                            <input hidden accept="image/*" multiple type="file" onChange={handlePicture} />
                        </Button>
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
                        <Button variant="contained" fullWidth onClick={handleSubmit}>
                            Upload
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained" fullWidth onClick={clearValues}>
                            Reset
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}