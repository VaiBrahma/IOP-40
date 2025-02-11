import { useEffect, useState } from 'react';
import styles from './Navbar.module.css';
import {FaBars, FaTimes } from "react-icons/fa";


const Navbar = () => {
    const [vis, setVis] = useState(false);
    const [title, setTitle] = useState("IOP-40: Transient Stability Analysis");
    const [navHeight, setNavHeight] = useState(120);


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 650) {
        setTitle("IOP-40: FDLF");
      }else {
        setTitle("IOP-40: Fast Decoupled Load Flow");
      }
    };

    const handleScroll = () => {
        if (window.scrollY > 50) {
          setNavHeight(50);
        } else {
          setNavHeight(120);
        }
    };

    handleResize();
    handleScroll();
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (

    <div className={styles.container} style={{height: `${navHeight}px`}}>
        <div className={styles.iitrLogo}>
            <a href="https://www.iitr.ac.in"><img src="/images/iitrlogo.png" style={{height:"100%"}} alt="O" /></a>
        </div>
        <div className={styles.title}>{title}</div>
        {!vis ? <FaBars size={30} className={styles.hamburger} onClick={()=>{setVis(e=>!e)}}/> : <FaTimes size={30} className={styles.hamburger} onClick={()=>{setVis(e=>!e)}}/> }
    </div>
    
  );
};

export default Navbar;