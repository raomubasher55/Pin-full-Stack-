import React, { useState, useEffect ,useContext ,useRef } from 'react';
import postContext from '../context/posts/postContext';

export const Model = ({ post }) => {
    const { posts, updatePost , getAllPost } = useContext(postContext);
    const [editedPost, setEditedPost] = useState({ title: '', description: '' }); // Initialize with empty object

    const closeRef = useRef(null);
    const onChange = (e) => {
        setEditedPost({ ...editedPost, [e.target.name]: e.target.value });
    };

    const handleSaveChanges = () => {
        updatePost(editedPost._id , editedPost.title , editedPost.description);
        closeRef.current.click();
    };

    // Set editedPost to post when post changes
    useEffect(() => {
        setEditedPost(post);
    }, [post]);

    return (
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title text-black" id="exampleModalLabel">Edit Post</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {editedPost && (
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label text-black">Title:</label>
                                    <input type="text" className="form-control" id="title" name='title' value={editedPost.title} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description:</label>
                                    <textarea className="form-control" id="description" name='description' value={editedPost.description} onChange={onChange}></textarea>
                                </div>
                            </form>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={closeRef}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={handleSaveChanges}>Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
