import React from 'react';

const Head = (props) => {
    return(
        <div style ={{backgroundColor:'black',color : "powderblue" ,padding:5,fontSize:20}}>
            <p>
                {props.title}
            </p>

        </div>
    )
}

export default Head;


