import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import styles from "./navbar.module.css";
import Image from "next/image";

const NavBar = ({ username }) => {
  const router = useRouter();
  const [showdropdown, setShowdropdown] = useState(false);

  const handleClickHome = (e) => {
    e.preventDefault();
    router.push("/");
  };

  const handleClickList = (e) => {
    e.preventDefault();
    router.push("/browse/my-list");
  };

  const handleDropdown = (e) => {
    e.preventDefault();
    setShowdropdown(!showdropdown);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <a className={styles.logoLink} href="/">
          <div className={styles.logoWrapper}>
            <Image
              src="/static/netflix.svg"
              alt="Netflix logo"
              width="128px"
              height="34px"
            />
          </div>
        </a>
        <ul className={styles.navItems}>
          <li className={styles.navItem} onClick={handleClickHome}>
            Home
          </li>
          <li className={styles.navItem2} onClick={handleClickList}>
            My List
          </li>
        </ul>
        <nav className={styles.navContainer}>
          <div>
            <button className={styles.usernameBtn} onClick={handleDropdown}>
              <p className={styles.username}>{username}</p>
              <Image src="/static/dropdown.svg" width={24} height={24} alt="" />
              {/* Icon */}
            </button>
            {showdropdown && (
              <div className={styles.navDropdown}>
                <div>
                  <Link href="/login">
                    <a className={styles.linkName}>Sign Out</a>
                  </Link>
                  <div className={styles.lineWrapper}></div>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
