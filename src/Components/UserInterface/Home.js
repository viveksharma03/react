import Header from "./MyComponents/Header"
import SearchComponent from "./SearchComponent"
import FeaturedComponent from "./MyComponents/FeaturedComponent"
import SanitizedAndSafeComponent from "./MyComponents/SanitizedAndSafeComponent"
import { getData} from "../Services/FetchNodeServices"
import { useState,useEffect } from "react"

export default function Home(props) {

    const [features,setFeatures]=useState([])
    const getAllFeature=async()=>{
        var result= await getData('user/all_feature')
        setFeatures(result.data)
    }
    useEffect(function(){
        getAllFeature();
    },[])
    return (
        <div style={{display:'flex',flexDirection:'column',background:'#dfe6e9'}}>
            <Header />
            <div >
            <SearchComponent/>
            
            <div style={{display:'flex',justifyContent:'center',alignItems:'center',paddingLeft:'2%',paddingTop:'2%'}}>
            <div style={{width:'87%'}}>
            <FeaturedComponent tittle="Featured" images={features}/>
            </div>
            </div>
            </div>
            
            

        </div>
    )
}