import React from 'react'
import './Box.css'
export default function Box({ title, valueChange, metaValue })
{
    console.log(valueChange)
    return (
        <div className="box">
            <h4>{title}</h4>
            <h1>{valueChange}</h1>
            <h5>{metaValue}</h5>
        </div>
    )
}
