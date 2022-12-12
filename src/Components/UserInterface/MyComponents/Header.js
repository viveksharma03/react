import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { getData, postData, serverURL } from '../../Services/FetchNodeServices';



export default function Header(props) {
    const [categories, setCategories] = useState([])
    const [anchorEl, setAnchorEl] = useState(null)
    const [subCategories, setSubCategories] = useState([])
    const open = Boolean(anchorEl);
    const fetchAllCategories = async () => {
        var response = await getData('user/display_all_category')
        setCategories(response.data)
    }
    const fetchAllSubCategories = async (cid) => {
        var body = { categoryid: cid }
        var response = await postData('user/fetch_all_subcategory_by_category', body)
        setSubCategories(response.data)
    }
    useEffect(function () {
        fetchAllCategories();
    }, [])
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
        // alert(event.currentTarget.value)
        fetchAllSubCategories(event.currentTarget.value)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const showMainMenu = () => {
        return (categories.map((item) => {
            return (
                <Button value={item.categoryid} onClick={handleClick}>{item.categoryname}</Button>
            )

        })
        )
    }

    const showSubMainMenu = () => {
        return (subCategories.map((item) => {
            return (
                <MenuItem onClick={handleClose}>{item.subcategoryname}</MenuItem>
            )

        })
        )
    }
    return (

        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="inherit">
                <Toolbar>
                    <img src='/assets/logo1.png' style={{ width: 70,padding:3}} />
                    <Box sx={{ flexGrow: 1 }} component="div">
                    </Box>
                    <Box>
                        {showMainMenu()}
                        <Menu
                            id="demo-positioned-menu"
                            aria-labelledby="demo-positioned-button"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                        >
                            {showSubMainMenu()}
                        </Menu>
                    </Box>
                    <Button color="inherit">Login/Signup</Button>
                </Toolbar>
            </AppBar>
        </Box>

    )
}