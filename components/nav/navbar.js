import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

import styles from "./navbar.module.css";

import { magic } from "../../lib/magic-client";

const NavBar = () => {
  const [showdropdown, setShowdropdown] = useState(false);
  const [username, setUsername] = useState("");
  const router = useRouter();

  useEffect(() => {
    getEmailFromMagic();

    return () => {
      getEmailFromMagic();
    };
  }, []);

  const getEmailFromMagic = async () => {
    try {
      const { email } = await magic.user.getMetadata();
      const didToken = await magic.user.getIdToken();
      console.log({ didToken });
      if (email) {
        setUsername(email);
      }
    } catch (error) {
      console.error("Error retrieving email", error);
    }
  };

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

  const handleSignOut = async (e) => {
    e.preventDefault();

    try {
      await magic.user.logout();
      router.push("/login");
    } catch (error) {
      console.error("Error logging out", error);
      router.push("/login");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link href="/">
          <a className={styles.logoLink}>
            <div className={styles.logoWrapper}>
              <Image
                src="/static/netflix.svg"
                alt="Netflix logo"
                width="128px"
                height="34px"
              />
            </div>
          </a>
        </Link>
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
                  <a className={styles.linkName} onClick={handleSignOut}>
                    Sign Out
                  </a>
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
