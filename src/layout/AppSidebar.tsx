"use client";
import React, { useEffect, useRef, useState,useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";
import {
  BoxCubeIcon,
  ChevronDownIcon,
  GridIcon,
  PageIcon,
  PieChartIcon,
  PlugInIcon,
  TableIcon,
  UserCircleIcon,
  DollarLineIcon,
  BoxIcon,
} from "../icons/index";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

const navItems: NavItem[] = [
  {
    icon: <GridIcon />, // dashboard / home grid
    name: "الصفحة الرئيسية",
    path: "/",
  },
  {
    icon: <PlugInIcon />, // integrations / channels
    name: "إدارة القنوات",
    path: "/channels",
  },
  {
    icon: <PieChartIcon />, // analytics / KPIs
    name: "لوحة المؤشرات",
    subItems: [
      {
        name: "العملاء",
        path: "/analytics/customers",
      },
      {
        name: "مؤشرات المحادثات",
        path: "/analytics/conversations",
      },
      {
        name: "مؤشرات سرعة الأداء",
        path: "/analytics/performance-speed",
      },
      {
        name: "مؤشرات الإنجاز",
        path: "/analytics/achievements",
      },
      {
        name: "لوحة أداء الموظفين",
        path: "/analytics/employees-performance",
      },
      {
        name: "الحالة",
        path: "/analytics/status",
      },
      {
        name: "الاشتراك",
        path: "/analytics/subscription",
      },
      {
        name: "تقرير تسليم الرسائل القصيرة",
        path: "/analytics/sms-delivery-report",
        pro: true,
      },
      {
        name: "استخدام الذكاء الاصطناعي",
        path: "/analytics/ai-usage",
        new: true,
      },
    ],
  },
  
  {
    icon: <PageIcon />, // tickets / records
    name: "نظام التذاكر",
    path: "/ticketing-system",
  },
  {
    icon: <UserCircleIcon />, // profile / account
    name: "إدارة بياناتي",
    path: "/my-data",
  },
  {
    icon: <TableIcon />, // settings / configurations
    name: "إعدادات المنشأة",
    path: "/organization-settings",
  },
  {
    icon: <BoxIcon />, // store / products
    name: "منصة المتجر",
    path: "/store-platform",
  },
  {
    icon: <PageIcon />, // notifications / announcements
    name: "التنبيهات والدعاية",
    path: "/notifications-ads",
  },
  {
    icon: <DollarLineIcon />, // campaigns / money / ads
    name: "الحملات التسويقية",
    path: "/marketing-campaigns",
  },
  {
    icon: <PlugInIcon />, // bots / automation
    name: "الخدمات التفاعلية والبوت",
    path: "/interactive-services",
  },
  {
    icon: <BoxCubeIcon />, // abandoned carts / packages
    name: "السلات المتروكة",
    path: "/abandoned-carts",
  },
  {
    icon: <PageIcon />, // templates / documents
    name: "نماذج واتساب",
    path: "/whatsapp-templates",
  },
  {
    icon: <GridIcon />, // master dashboard
    name: "لوحة التحكم العامة",
    path: "/admin-dashboard",
  },
];



const othersItems: NavItem[] = [
  {
    icon: <PieChartIcon />,
    name: "المخططات",
    subItems: [
      { name: "مخطط خطي", path: "/line-chart", pro: false },
      { name: "مخطط شريطي", path: "/bar-chart", pro: false },
    ],
  },
  {
    icon: <BoxCubeIcon />,
    name: "عناصر الواجهة",
    subItems: [
      { name: "التنبيهات", path: "/alerts", pro: false },
      { name: "الصورة الرمزية", path: "/avatars", pro: false },
      { name: "شارة", path: "/badge", pro: false },
      { name: "أزرار", path: "/buttons", pro: false },
      { name: "الصور", path: "/images", pro: false },
    ],
  },
  {
    icon: <PlugInIcon />,
    name: "المصادقة",
    subItems: [
      { name: "تسجيل الدخول", path: "/signin", pro: false },
      { name: "تسجيل جديد", path: "/signup", pro: false },
    ],
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();

  const renderMenuItems = (
    navItems: NavItem[],
    menuType: "main" | "others"
  ) => (
    <ul className="flex flex-col gap-4">
      {navItems.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group  ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "menu-item-active"
                  : "menu-item-inactive"
              } cursor-pointer ${
                !isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start"
              }`}
            >
              <span
                className={` ${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className={`menu-item-text`}>{nav.name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDownIcon
                  className={`ml-auto w-5 h-5 transition-transform duration-200  ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? "rotate-180 text-brand-500"
                      : ""
                  }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                href={nav.path}
                className={`menu-item group ${
                  isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                }`}
              >
                <span
                  className={`${
                    isActive(nav.path)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className={`menu-item-text`}>{nav.name}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      href={subItem.path}
                      className={`menu-dropdown-item ${
                        isActive(subItem.path)
                          ? "menu-dropdown-item-active"
                          : "menu-dropdown-item-inactive"
                      }`}
                    >
                      {subItem.name}
                      <span className="flex items-center gap-1 ml-auto">
                        {subItem.new && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge `}
                          >
                            new
                          </span>
                        )}
                        {subItem.pro && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge `}
                          >
                            pro
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // const isActive = (path: string) => path === pathname;
   const isActive = useCallback((path: string) => path === pathname, [pathname]);

  useEffect(() => {
    // Check if the current path matches any submenu item
    let submenuMatched = false;
    ["main", "others"].forEach((menuType) => {
      const items = menuType === "main" ? navItems : othersItems;
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({
                type: menuType as "main" | "others",
                index,
              });
              submenuMatched = true;
            }
          });
        }
      });
    });

    // If no submenu item matches, close the open submenu
    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [pathname,isActive]);

  useEffect(() => {
    // Set the height of the submenu items when the submenu is opened
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  return (
    <aside dir="rtl"
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 right-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-l border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-6 flex  ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-center"
        }`}
      >
        <Link href="/">
          {isExpanded || isHovered || isMobileOpen ? (
            // Use the logo icon as the main logo for the sidebar (expanded)
            <div className="sidebar-logo">
              <Image
                className="dark:hidden"
                src="/images/logo-full.jpg"
                alt="logo Logo"
                width={120}
                height={40}
              />
            </div>
          ) : (
            // Collapsed view: keep icon small inside white circle
            <div className="sidebar-logo">
              <Image src="/images/logo-full.jpg" alt="logo" width={36} height={36} />
            </div>
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              {/* <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "القائمة "
                ) : (
                  <HorizontaLDots />
                )}
              </h2> */}
              {renderMenuItems(navItems, "main")}
            </div>


          </div>
        </nav>

      </div>
    </aside>
  );
};

export default AppSidebar;
