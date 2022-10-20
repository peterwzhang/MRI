import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { url } from "../api/constants";
import { theme } from "../constants";
import css from "./Navbar.module.scss";

const NavbarFormat = styled.div`
  display: inline-block;
  border-bottom: 0.25rem solid ${() => theme.PRIMARY};
  vertical-align: middle;
  align-items: center;
  color: ${() => theme.TERTIARY};
  min-height: 3rem;
  width: 100%;
  padding: 0 2rem;
`;

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    axios.post(`${url}/logout`);
    router.push("/");
  };

  return (
    <NavbarFormat>
      <header>
        <div className={css.header}>
          <div className={css.button}>
            <span style={{ fontSize: "2rem", fontWeight: "bold" }}>
              <Link href="/">HPC Interface</Link>
            </span>
          </div>
          <div className={css.rightBar}>
            <div className={css.button}>
              <Link href="/dashboard">Dashboard</Link>
            </div>
            <div className={css.button}>
              <Link href="/create-batch">Create batch</Link>
            </div>
            <div className={css.button}>
              <Link href="/script-library">Script library</Link>
            </div>
            {/* <div className={css.button}>
              <Link href="/view-batch">View batch</Link>
            </div>
            <div className={css.button}>
              <Link href="/view-job">View job</Link>
            </div> */}
            <Link href="/account">
              <Image
                className="nav_right"
                src="/account_icon.png"
                alt="View Account Page"
                height={36}
                width={36}
              />
            </Link>
          </div>
        </div>
      </header>
    </NavbarFormat>
  );
}
