import React, { useEffect, useState , useContext } from 'react';
import NavbarContext from '../context/posts/NavbarContext';
import { Spinner } from './Spinner';


export const Home = () => {
  const { showNavbar, setShowNavbar } = useContext(NavbarContext);
  const [data, setData] = useState([]);
  const [spinner, setSpinner] = useState(false)

  const fetchAllPost = async () => {
    setSpinner(true);
    const response = await fetch(`http://localhost:5000/`, {
      method: "GET",
    });
    const result = await response.json();
    setSpinner(false);
    setData(result);
  }

  useEffect(() => {
    fetchAllPost()
    setShowNavbar(true);
  }, [])



  return (
    <>{spinner && <Spinner/>}
      {/* <div className="max-w-1200 mx-1 mt-[87px] pt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 font-arial"> */}
      <div className="max-w-1200 mx-1 mt-[87px] pt-6  font-arial">
        <div className="Container">
          {data.map((post, index) => (
            <div className="box cardColor p-2" key={index}>
              <img src={`/images/uploads/${post.image}`} alt="image" />
              <div className="caption font-bold mt-2">{post.title ? post.title : ""}</div>
              <div className="caption font-bold mt-1">{post.description ? post.description : ""}</div>
              <div className='flex justify-between mt-2'>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
