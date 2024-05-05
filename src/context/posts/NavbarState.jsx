import React, { useState , useContext } from 'react';
import NavbarContext from './NavbarContext';

const NavbarState = (props) => {
    const [showNavbar, setShowNavbar] = useState(false);

    return (
        <NavbarContext.Provider value={{ showNavbar, setShowNavbar }}>
            {props.children}
        </NavbarContext.Provider>
    );
}

export default NavbarState;
