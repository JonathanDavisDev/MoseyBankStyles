"use client";

import { createContext, useEffect, useRef, useState } from "react";
import Logo from "./partials/_logo";
import MainMenu from "./partials/_main-menu";
import SecondaryMenu from "./partials/_secondary-menu";
import MobileMenu from "./partials/_mobile-menu";
import { HeaderContextType } from "./types/headerTypes";

export const HeaderContext = createContext<HeaderContextType>({
  menuItems: [],
  currentMenu: "",
  setCurrentMenu: (name: string) => {},
  mobileMenuOpen: false,
});

/**
 * Renders the Header component with a specific locale.
 *
 * @param {any} locale - the locale to render the header with
 * @return {JSX.Element} the rendered Header component
 */
export default function Header({ locale }: any) {
  const logoRef = useRef<HTMLDivElement>(null);
  const secondaryMenuRef = useRef<HTMLUListElement>(null);
  const [currentMenu, setCurrentMenu] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mouseLeaveTimer = useRef<undefined | NodeJS.Timeout>();

  // Grab main menu items from Graph, they'll be looped and dropdowns will be generated below.
  const menuItems = [
    {
      menuName: "Services",
      menuData: {
        menuLists: [
          {
            title: "Accounts",
            items: [
              {
                title: "Savings",
                url: "/savings",
              },
              {
                title: "Checking",
                url: "/checking",
              },
              {
                title: "Credit cards",
                url: "/credit-cards",
              },
              {
                title: "Loans",
                url: "/loans",
              },
              {
                title: "Investing",
                url: "/investing",
              },
            ],
          },
          {
            title: "Resources",
            items: [
              {
                title: "Account Recovery",
                url: "/account-recovery",
              },
              {
                title: "Payments",
                url: "/payments",
              },
              {
                title: "Linked accounts",
                url: "/linked-accounts",
              },
              {
                title: "Transfers",
                url: "/transfers",
              },
            ],
          },
          {
            title: "Life and Points",
            items: [
              {
                title: "Book travel",
                url: "/book-travel",
              },
              {
                title: "Shop",
                url: "/shop",
              },
              {
                title: "Charity and Donations",
                url: "/charity-and-donations",
              },
            ],
          },
        ],
      },
    },
    {
      menuName: "Inspiration",
      menuData: {
        menuLists: [
          {
            title: "Blog",
            items: [
              {
                title: "Investing",
                url: "/investing",
              },
              {
                title: "Entrepreneurship",
                url: "/entrepreneurship",
              },
              {
                title: "Life & Travel",
                url: "/life-and-travel",
              },
              {
                title: "Personal Finance 101",
                url: "/personal-finance-101",
              },
              {
                title: "Retirement",
                url: "/retirement",
              },
            ],
          },
        ],
        promo: {
          title: "We’ve teamed up with Singapore Airlines",
          description: "Transfer your Moseybank Points to Singapore Airlines and get up to 30,000 bonus miles* between now and March 29.",
          link: {
            url: "/",
            title: "Learn more",
          },
          image: {
            src: "https://placekitten.com/207/232",
            alt: "Promo image",
          },
        },
      },
    },
    {
      menuName: "Support",
      menuData: {
        menuLists: [
          {
            title: "Get help",
            items: [
              {
                title: "Customer support",
                url: "/customer-support",
              },
              {
                title: "Community",
                url: "/community",
              },
              {
                title: "About Moseybank",
                url: "/about",
              },
              {
                title: "Report potential fraud",
                url: "/report-fraud",
              },
              {
                title: "Report lost or stolen card",
                url: "/report-lost-or-stolen-card",
              },
            ],
          },
        ],
      },
    },
  ]; // Placeholder for now

  const headerContext = {
    menuItems,
    currentMenu,
    setCurrentMenu,
    mobileMenuOpen,
  };

  // This will close the dropdown after 500ms of the mouse not being over any header element.
  function handleMouseLeave() {
    mouseLeaveTimer.current = setTimeout(() => {
      setCurrentMenu("");
    }, 800);
  }

  // Clears timeout if we detect that the mouse is still over the header
  function handleMouseEnter() {
    clearTimeout(mouseLeaveTimer.current);
  }

  // Checks if the focus leaves the header and closes the dropdown menu if it does.
  function handleFocusLeave(e: React.FocusEvent<HTMLElement>) {
    if ((secondaryMenuRef.current && secondaryMenuRef.current.contains(e.relatedTarget)) || (logoRef.current && logoRef.current.contains(e.relatedTarget))) {
      setCurrentMenu("");
    }
  }

  return (
    <HeaderContext.Provider value={headerContext}>
      <header className="outer-padding bg-ghost-white" onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter} onBlur={handleFocusLeave}>
        <div className="py-8 container mx-auto flex items-center w-full justify-between lg:justify-normal">
          <Logo ref={logoRef} />

          <div className="lg:hidden">
            <button className="btn btn--secondary" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <div className="btn__content">{mobileMenuOpen ? "Close" : "Menu"}</div>
            </button>
            <MobileMenu />
          </div>

          <div className="hidden justify-between grow lg:flex">
            <MainMenu />
            <SecondaryMenu ref={secondaryMenuRef} />
          </div>
        </div>
      </header>
    </HeaderContext.Provider>
  );
}
