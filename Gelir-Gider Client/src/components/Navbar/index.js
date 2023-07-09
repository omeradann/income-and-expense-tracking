import React from "react";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { useAuth } from "../../context/AuthContext";


function Navbar() {
  const { loggedIn, user } = useAuth();
  console.log(loggedIn);
  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <div className="logo">
          <Link to="/">ADAN.COM</Link>
        </div>

        <ul className={styles.menu}>
          <li>
            <Link to="/income">Incomes</Link>
          </li>
          <li>
            <Link to="/expense">Expenses</Link>
          </li>
          <li>
            <Link to="/deneme">Deneme</Link>
          </li>
        </ul>
      </div>
      <div className={styles.right}>
        {!loggedIn && (
          <>
            <Link to="/signup">
              <Button colorScheme="blue">Sign Up</Button>
            </Link>

            <Link to="/signin">
              <Button colorScheme="blue">Sign In</Button>
            </Link>
          </>
        )}
        {loggedIn && (
          <>

            {
              user?._id === "647b2ade54d21524ae1d9374" && (
                <Link to="/admin">
                  <Button colorScheme="pink" variant="ghost">Admin</Button>
                </Link>
              )
            }

            <Link to="/profile">
              <Button colorScheme="yellow">Profile</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
