import React, { useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { Button } from '../Button';
import './style.scss';

//const AvatarEditor = require('react-avatar-editor').default;

export const ImageCrop = (props) => {
   const { imagefile, setEditorRef, onCrop} = props;

    const [ scaleValue, setScaleValue ] = useState(1);

    const onScaleChange = (e) =>{
        const value = parseFloat( e.target.value);
        setScaleValue(value); 
    }

    return (
        <div className='main'>
            <div className='editor'>
                <AvatarEditor 
                    image  ={imagefile}
                    border ={5}
                    scale  ={scaleValue}
                    rotate ={0}
                    ref    ={setEditorRef} />
            </div>
            <div> 
                <input 
                    type      ='range'
                    value     ={scaleValue}
                    min       ='1'
                    max       ='10'
                    className ='actions'
                    onChange  ={ e => onScaleChange(e)} />
            </div>                                                                                     
            <div>
                <Button
                    onClick ={onCrop}
                    title   ='Crop'                
                />
            </div>
        </div>
    );
}