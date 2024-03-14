import React from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const MDEediter = ({description, setDescription }) => {

  
    return (
        <SimpleMDE value={description} onChange={(value)=>{setDescription(value)}} />
    )
}

export default MDEediter