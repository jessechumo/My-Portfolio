// File to show full page loading icon when the location is still loading.

import React from 'react';

const Spinner = (props)=>{
    return (
        <div className='ui active dimmer'>
            <div className='ui big text loader'> 
             {props.message}
                </div> 
        </div>
    );
};
Spinner.defaultProps = {
    message : " Image Loading..."
}
export default Spinner;


// to implement spinner