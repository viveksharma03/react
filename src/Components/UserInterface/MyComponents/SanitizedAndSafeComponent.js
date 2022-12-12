import { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
export default function SanitizedAndSafeComponent(props) {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
    };

    var images = [{ id: 1, images: 'http://localhost:5000/images/s1.png' },
    { id: 1, images: 'http://localhost:5000/images/s2.png' },
    { id: 2, images: 'http://localhost:5000/images/s3.png' },
    { id: 3, images: 'http://localhost:5000/images/s4.jpg' },
    { id: 4, images: 'http://localhost:5000/images/s5.jpg' },
    { id: 5, images: 'http://localhost:5000/images/s6.jpg' },
    { id: 6, images: 'http://localhost:5000/images/s7.jpg' },
    
    
    ]
    const playSlide = () => {
        return images.map((item) => {
            return (
                <div style={{
                    paddingLeft: 10, paddingRight: 10
                }}>
                    <img src={item.images} style={{
                        borderRadius: 20, width: 300, height: 130
                    }} >
                        </img>
                </div >)
        })
    }
    return (
        <Slider {...settings}  >
            {playSlide()}
            
        </Slider>

    )
}