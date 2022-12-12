import { useState, useEffect,createRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { ServerURL } from "../../Services/FetchNodeServices";
export default function FeaturedComponent(props) {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows:false
    };
 var mySlider=createRef()

    var images = props.images
    /*
or 
var images = [{ id: 1, images: 'http://localhost:5000/images/f1.png' },
    { id: 1, images: 'http://localhost:5000/images/f2.png' },
    { id: 2, images: 'http://localhost:5000/images/f3.png' },
    { id: 3, images: 'http://localhost:5000/images/f4.jpg' },
    { id: 4, images: 'http://localhost:5000/images/f5.jpg' },
    { id: 5, images: 'http://localhost:5000/images/f6.jpg' },
    { id: 6, images: 'http://localhost:5000/images/f7.jpg' },
    
    
    ]

    */
    const playSlide = () => {
        return images.map((item) => {
            return (
                <div style={{
                    paddingLeft: 10, paddingRight: 10
                }}>
                    <img src={`${ServerURL}/images/${item.image}`} style={{
                        borderRadius: 20, width: 300, height: 130
                    }} >
                        </img>
                </div >)
        })
    }
    const handleClickLeft=()=>{
mySlider.current.slickPrev()
    }
    const handleClickRight=()=>{
        mySlider.current.slickNext()
    }
    return (
        <div>
            <div  style={{display:'flex',justifyContent:'space-between',marginTop:10,marginBottom:25,width:'98%'}}>
                <span style={{colors:'#95a5a6',fontWeight:'bolder',fontSize:28}}>{props.tittle}</span>
                <span style={{cursor:'pointer'}}><KeyboardArrowLeftIcon style={{fontSize:34}} onClick={handleClickLeft} /><KeyboardArrowRightIcon style={{fontSize:34}}  onClick={handleClickRight} /></span>
            </div>
        <Slider ref={mySlider} {...settings}  >
            {playSlide()}
            
        </Slider>
        </div>

    )
}