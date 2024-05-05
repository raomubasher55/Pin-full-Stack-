  <>
            {posts && posts.length > 0 ? ( // Check if posts is defined and not empty
                <div className="cards flex flex-row flex-wrap px-28 gap-16 ">
                    {posts.map((post, index) => (
                        <div className="Card flex  py-10 " key={index}> {/* Add key prop */}
                            <div className="glow-on-hover bg-neutral-800 rounded-lg overflow-hidden shadow-md" style={{ width: "18rem" }}>
                                <img src={`./images/uploads/${post.image}` } className="w-full h-auto" alt="..." />
                                <div className="p-4 porfilecard text-white">
                                    <h5 className="text-lg font-semibold mb-2">
                                        {post.title}
                                    </h5>
                                    <p className="mb-4">
                                        {post.description}  
                                    </p>
                                    <div className="flex gap-6">
                                        <a href="#" className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Go somewhere</a>
                                        {/* Pass the post to handleUpdate */}
                                        <lord-icon
                                            src="https://cdn.lordicon.com/wuvorxbv.json"
                                            onClick={() => handleUpdate(post)}
                                            className="hover:cursor-pointer"
                                            trigger="hover"
                                            stroke="bold"
                                            state="hover-line"
                                            colors="primary:#ffffff,secondary:#ffffff"
                                            style={{ width: "30px", height: "30px" }}
                                        ></lord-icon>
                                        <lord-icon
                                            src="https://cdn.lordicon.com/drxwpfop.json"
                                            onClick={()=>{handleDelete(post._id)}}
                                            trigger="hover"
                                            stroke="bold"
                                            state="hover-line"
                                            colors="primary:#ffffff,secondary:#ffffff"
                                            style={{ width: "30px", height: "30px" }}
                                        ></lord-icon>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))} 
                </div>
            ) : (
                <p>Loading...</p> // Render a loading message while data is being fetched
            )}
            {/* Button to trigger the Bootstrap modal */}
            <button id="toggleBtn" style={{ display: "none" }} data-bs-toggle="modal" data-bs-target="#exampleModal">
                Modal Toggle
            </button>
            {/* Pass selected post to Model component if it exists */}
            {selectedPost && <Model post={selectedPost} />}
        </>