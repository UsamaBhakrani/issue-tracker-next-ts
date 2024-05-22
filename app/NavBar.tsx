"use client";
import classnames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";

const NavBar = () => {
  const currentPath = usePathname();
  const links = [
    {
      label: "Dashboard",
      href: "/",
    },
    {
      label: "Issues",
      href: "/issues",
    },
  ];

  return (
    <nav className="flex items-center space-x-6 border-b mb-5 px-5 h-14">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map(({ label, href }) => {
          return (
            <li key={href}>
              <Link
                href={href}
                className={classnames({
                  "text-red-500": href === currentPath,
                  "text-zinc-500": href !== currentPath,
                  "hover:text-zinc-800 transition-colors": true,
                })}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavBar;
