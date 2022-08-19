import React from "react"
import preloader from "../../Users/Spinner-1s-200px.svg";

export const Preloader = () => {
    return (
        <div>
            <img src={preloader} alt="preloader" style={{width: '70px', height: '70px'}}/>
        </div>
    )
}