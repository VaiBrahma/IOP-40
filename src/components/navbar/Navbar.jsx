import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import { FaBars, FaTimes } from "react-icons/fa";
import SideBar from "../sideBar/SideBar";

const Navbar = ({ title1, title2 }) => {
    const [vis, setVis] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false); // Controls DOM mounting
    const [title, setTitle] = useState(title1);
    const [navHeight, setNavHeight] = useState(120);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 650) {
                setTitle(title2);
            } else {
                setTitle(title1);
            }
        };

        const handleScroll = () => {
            setNavHeight(120 - Math.min(window.scrollY, 70));
        };

        handleResize();
        handleScroll();
        window.addEventListener("resize", handleResize);
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const toggleSidebar = () => {
        if (!vis) {
            setShowSidebar(true);
            setVis(true);
        } else {
            setVis(false);
            setTimeout(() => setShowSidebar(false), 400); // Wait for animation before removing
        }
    };

    return (
        <div className={styles.superContainer}>
            <div className={styles.container} style={{ height: `${navHeight}px` }}>
                <div className={styles.iitrLogo}>
                    <a href="https://www.iitr.ac.in">
                        <img src="/images/iitrlogo.png" style={{ height: "100%" }} alt="O" />
                    </a>
                </div>
                <div className={styles.title}>{title}</div>
                {!vis ? (
                    <FaBars size={30} className={styles.hamburger} onClick={toggleSidebar} />
                ) : (
                    <FaTimes size={30} className={styles.hamburger} onClick={toggleSidebar} />
                )}
                {showSidebar && <SideBar isVisible={vis} />}
            </div>
        </div>
    );
};

export default Navbar;