import React from "react";
import { NavLink, LinkProps, useNavigate } from "react-router-dom";

// Sleep function to add delay
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

interface TransitionLinkProps extends LinkProps {
  children: React.ReactNode;
  href: string;
  visible: boolean; // Boolean to indicate visibility
  setIsVisible: (visible: boolean) => void;
}

export const TransitionLink: React.FC<TransitionLinkProps> = ({
  children,
  href,
  setIsVisible,
  ...props
}) => {
  const navigate = useNavigate();

  const handleTransition = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    const body = document.querySelector("body");

    // Add transition class to body
    body?.classList.add("page-transition");
    setIsVisible(true)

    await sleep(500); // Wait for 500ms
    navigate(href);   // Navigate to the new route
    await sleep(500); // Wait for 500ms after navigation

    // Remove the transition class
    body?.classList.remove("page-transition");
    setIsVisible(false)
  };

  return (
    <NavLink {...props} to={href} onClick={handleTransition}>
      {children}
    </NavLink>
  );
};
