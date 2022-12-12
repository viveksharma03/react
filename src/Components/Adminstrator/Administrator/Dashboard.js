import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Avatar, Grid } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SideBar from './Sidebar';
import Category from "../Category/Category";
import DisplayAllCategory from "../Category/DisplayAllCategory";
import SubCategory from "../SubCategory/SubCategory";
import DisplayAllSubCategory from "../SubCategory/DisplayAllSubCategory";
import Company from "../Company/Company";
import DisplayAllCompany from "../Company/DisplayAllCompany";
import Model from "../Model/Model";
import DisplayAllModel from "../Model/DisplayAllModel";
import Vehicle from "../Vehicle/Vehicle";
import DisplayAllVehicle from "../Vehicle/DisplayAllVehicle";
import FeatureInterface from '../Featured/FeatureInterface';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function Dashboard() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            PaynRent
          </Typography>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
        </Toolbar>
      </AppBar>
      <Grid container spacing={0} >
        <Grid item xs={12} >
          <div style={{ paddingTop: 10, paddingLeft: 20, display: 'flex', width: 200, justifyContent: 'çenter', allignItems: 'center' }}>
            <img src='/assets/defaultcar.png' style={{ width: 150 }} />
          </div>
        </Grid>
        <Grid item xs={2} >
          <SideBar />
        </Grid>
        <Grid xs={10}>
          <Routes>
          <Route element={<Category />} path="/category" />
          <Route element={<DisplayAllCategory />} path="/displayallcategory" />
          <Route element={<SubCategory />} path="/subcategory" />
          <Route element={<DisplayAllSubCategory />} path="/displayallsubcategory" />
          <Route element={<Company />} path="/company" />
          <Route element={<DisplayAllCompany />} path="/displayallcompany" />
          <Route element={<Model />} path="/model" />
          <Route element={<DisplayAllModel />} path="/displayallmodel" />
          <Route element={<Vehicle />} path="/vehicle" />
          <Route element={<DisplayAllVehicle />} path="/displayallvehicle" />
          <Route element={<FeatureInterface />} path="/featureinterface" />
          </Routes>
        </Grid>
      </Grid>
    </Box>
  );
}