



import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
import { TiContacts } from "react-icons/ti";
import { FiMail } from "react-icons/fi";
import { FaMarkdown } from "react-icons/fa";
import Link from "next/link";

const sidebarItems = [
  {
    name: "Dashboard",
    href: "/dasboard",
    icon: AiOutlineHome,
  },
  {
    name: "Markdown",
    href: "/settings",
    icon:FaMarkdown,
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: FiMail,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: TiContacts,
  },
];

const Sidebar = () => {

  
  const router = useRouter();
  
  const [isActive, setIsActive] = useState(router.pathname);


  useEffect(() => {
    // Update the state when the route changes
    setIsActive(router.pathname);
  }, [router.pathname]); // Dependency on router.pathname

  return (
    <div className="sidebar-wrapper">
      <aside className="sidebar">
        <div className="sidebar-top">
          <p className="sidebar-logo-name">The Brave Coders</p>
        </div>
        <ul className="sidebar-list">
          {sidebarItems.map(({ name, href, icon: Icon }) => {
            const isLinkActive = isActive === href;

            return (
              <li className="sidebar-item" key={name}>
                <Link
                  className={`sidebar__link ${
                    isLinkActive ? "sidebar__link--active" : ""
                  }`}
                  href={href}
                >
                  <span className="sidebar-icon">
                    <Icon />
                  </span>
                  <span className="sidebar-name">{name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
