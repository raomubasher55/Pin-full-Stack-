import React from 'react'

export const ClientPostCard = ({ postData, index }) => {
    return (
        <>
                <div className="box cardColor p-2">
                        <img src={`/images/uploads/${postData.image}`} alt="image" />
                    <div className="caption">{postData.title? postData.title : ""}</div>
                    <div className="caption">{postData.description? postData.description : ""}</div>
                </div>
          
        </>
    )
}
