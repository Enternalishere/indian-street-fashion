import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

// Styled Components
const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background-color: ${props => props.scrolled ? props.theme.colors.dark : 'rgba(33, 33, 33, 0.9)'};
  transition: background-color 0.3s ease;
  box-shadow: ${props => props.scrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : '0 2px 10px rgba(0, 0, 0, 0.05)'};
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.md};
  height: 80px;
`;

const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${props => props.theme.colors.light};
  text-decoration: none;
  font-family: ${props => props.theme.fonts.decorative};
  
  span {
    color: ${props => props.theme.colors.primary};
  }
`;

const DesktopNav = styled.nav`
  display: flex;
  align-items: center;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  margin: 0 ${props => props.theme.spacing.md};
`;

const NavLink = styled(Link)`
  color: ${props => props.theme.colors.light};
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  position: relative;
  padding: ${props => props.theme.spacing.xs} 0;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: ${props => props.theme.colors.primary};
    transition: width 0.3s ease;
  }
  
  &:hover:after, &.active:after {
    width: 100%;
  }
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const NavIcons = styled.div`
  display: flex;
  align-items: center;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.light};
  font-size: 1.2rem;
  margin-left: ${props => props.theme.spacing.md};
  cursor: pointer;
  position: relative;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
  
  /* Add a subtle background to make icons more visible */
  padding: 8px;
  border-radius: 50%;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const CartCount = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.light};
  font-size: 0.7rem;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${props => props.theme.colors.light};
  font-size: 1.5rem;
  cursor: pointer;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 70%;
  max-width: 300px;
  height: 100vh;
  background-color: ${props => props.theme.colors.dark};
  z-index: 1001;
  padding: ${props => props.theme.spacing.xl};
  display: flex;
  flex-direction: column;
`;

const MobileNavLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: ${props => props.theme.spacing.xl} 0;
`;

const MobileNavItem = styled.li`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const MobileNavLink = styled(Link)`
  color: ${props => props.theme.colors.light};
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 500;
  display: block;
  padding: ${props => props.theme.spacing.sm} 0;
  
  &:hover, &.active {
    color: ${props => props.theme.colors.primary};
  }
`;

const CloseButton = styled.button`
  align-self: flex-end;
  background: none;
  border: none;
  color: ${props => props.theme.colors.light};
  font-size: 1.5rem;
  cursor: pointer;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  return (
    <HeaderContainer scrolled={scrolled}>
      <HeaderContent>
        <Logo to="/">
          Indian<span>Street</span>
        </Logo>
        
        <DesktopNav>
          <NavLinks>
            <NavItem>
              <NavLink to="/" className={isActive('/') ? 'active' : ''}>
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/shop" className={isActive('/shop') ? 'active' : ''}>
                Shop
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/about" className={isActive('/about') ? 'active' : ''}>
                About
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/contact" className={isActive('/contact') ? 'active' : ''}>
                Contact
              </NavLink>
            </NavItem>
          </NavLinks>
        </DesktopNav>
        
        <NavIcons>
          <IconButton aria-label="Search">
            <i className="fas fa-search"></i>
          </IconButton>
          <IconButton aria-label="Cart">
            <i className="fas fa-shopping-cart"></i>
            <CartCount>3</CartCount>
          </IconButton>
          <IconButton aria-label="User Account">
            <i className="fas fa-user"></i>
          </IconButton>
          <MobileMenuButton onClick={toggleMobileMenu} aria-label="Menu">
            <i className="fas fa-bars"></i>
          </MobileMenuButton>
        </NavIcons>
      </HeaderContent>
      
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <Overlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
            />
            <MobileMenu
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              <CloseButton onClick={closeMobileMenu} aria-label="Close Menu">
                <i className="fas fa-times"></i>
              </CloseButton>
              <MobileNavLinks>
                <MobileNavItem>
                  <MobileNavLink to="/" className={isActive('/') ? 'active' : ''} onClick={closeMobileMenu}>
                    Home
                  </MobileNavLink>
                </MobileNavItem>
                <MobileNavItem>
                  <MobileNavLink to="/shop" className={isActive('/shop') ? 'active' : ''} onClick={closeMobileMenu}>
                    Shop
                  </MobileNavLink>
                </MobileNavItem>
                <MobileNavItem>
                  <MobileNavLink to="/about" className={isActive('/about') ? 'active' : ''} onClick={closeMobileMenu}>
                    About
                  </MobileNavLink>
                </MobileNavItem>
                <MobileNavItem>
                  <MobileNavLink to="/contact" className={isActive('/contact') ? 'active' : ''} onClick={closeMobileMenu}>
                    Contact
                  </MobileNavLink>
                </MobileNavItem>
              </MobileNavLinks>
            </MobileMenu>
          </>
        )}
      </AnimatePresence>
    </HeaderContainer>
  );
};

export default Header;