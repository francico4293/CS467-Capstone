import React from "react";
import { useSelector } from "react-redux";

const LoadingSymbol = () => {
    const theme = useSelector(state => state.theme);
    
    return (
        <div id={theme} className='spinner-container d-flex justify-content-center align-items-center'>
            <div className='spinner-border' role='status'>
                <span className='visually-hidden'>Loading...</span>
            </div>
        </div>
    );
}

export default LoadingSymbol;
