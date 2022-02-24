import React, { useRef, useEffect, useState } from 'react';
import logo from './assets/full.png'
import './LogoHeader.css'


const LogoHeader = () => {


    
    return(

        <div className = "logoDiv"> 
        
            <img id = "imgLogo" src={logo} alt="Logo Le Voyageur. An image which shows a compass followed by the text Le Voyageur"/>
      
        </div>



    );



}

export default LogoHeader;