import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Styled Components
const FooterContainer = styled.footer`
  background-color: ${props => props.theme.colors.dark};
  color: ${props => props.theme.colors.light};
  padding: ${props => props.theme.spacing.xl} 0;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.md};
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${props => props.theme.spacing.xl};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const FooterColumn = styled.div``;

const FooterTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.light};
  position: relative;
  padding-bottom: ${props => props.theme.spacing.sm};
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 2px;
    background-color: ${props => props.theme.colors.primary};
  }
`;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FooterLink = styled.li`
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const StyledLink = styled(Link)`
  color: ${props => props.theme.colors.lightGray};
  text-decoration: none;
  transition: color ${props => props.theme.transitions.short};
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const FooterText = styled.p`
  color: ${props => props.theme.colors.lightGray};
  margin-bottom: ${props => props.theme.spacing.sm};
  line-height: 1.6;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.md};
`;

const SocialIcon = styled.a`
  color: ${props => props.theme.colors.light};
  font-size: 1.2rem;
  transition: color ${props => props.theme.transitions.short};
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const NewsletterForm = styled.form`
  display: flex;
  margin-top: ${props => props.theme.spacing.md};
`;

const NewsletterInput = styled.input`
  padding: ${props => props.theme.spacing.sm};
  border: none;
  border-radius: ${props => props.theme.borderRadius.small} 0 0 ${props => props.theme.borderRadius.small};
  flex-grow: 1;
`;

const NewsletterButton = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.light};
  border: none;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: 0 ${props => props.theme.borderRadius.small} ${props => props.theme.borderRadius.small} 0;
  cursor: pointer;
  transition: background-color ${props => props.theme.transitions.short};
  
  &:hover {
    background-color: ${props => props.theme.colors.secondary};
  }
`;

const BottomFooter = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.lg} ${props => props.theme.spacing.md} 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: ${props => props.theme.spacing.xl};
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${props => props.theme.spacing.md};
    text-align: center;
  }
`;

const Copyright = styled.p`
  color: ${props => props.theme.colors.lightGray};
  font-size: 0.9rem;
`;

const PaymentIcons = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
`;

const PaymentIcon = styled.span`
  font-size: 1.5rem;
  color: ${props => props.theme.colors.lightGray};
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterColumn>
          <FooterTitle>About Us</FooterTitle>
          <FooterText>
            IndianStreet celebrates the vibrant chaos of India's fashion markets, blending tradition with modern flair. Our mission is to bring authentic Indian street fashion to the global stage.
          </FooterText>
          <SocialIcons>
            <SocialIcon href="#" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </SocialIcon>
            <SocialIcon href="#" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </SocialIcon>
            <SocialIcon href="#" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </SocialIcon>
            <SocialIcon href="#" aria-label="Pinterest">
              <i className="fab fa-pinterest-p"></i>
            </SocialIcon>
          </SocialIcons>
        </FooterColumn>
        
        <FooterColumn>
          <FooterTitle>Quick Links</FooterTitle>
          <FooterLinks>
            <FooterLink>
              <StyledLink to="/">Home</StyledLink>
            </FooterLink>
            <FooterLink>
              <StyledLink to="/shop">Shop</StyledLink>
            </FooterLink>
            <FooterLink>
              <StyledLink to="/about">About Us</StyledLink>
            </FooterLink>
            <FooterLink>
              <StyledLink to="/contact">Contact</StyledLink>
            </FooterLink>
            <FooterLink>
              <StyledLink to="/blog">Blog</StyledLink>
            </FooterLink>
          </FooterLinks>
        </FooterColumn>
        
        <FooterColumn>
          <FooterTitle>Customer Service</FooterTitle>
          <FooterLinks>
            <FooterLink>
              <StyledLink to="/faq">FAQ</StyledLink>
            </FooterLink>
            <FooterLink>
              <StyledLink to="/shipping">Shipping & Returns</StyledLink>
            </FooterLink>
            <FooterLink>
              <StyledLink to="/terms">Terms & Conditions</StyledLink>
            </FooterLink>
            <FooterLink>
              <StyledLink to="/privacy">Privacy Policy</StyledLink>
            </FooterLink>
            <FooterLink>
              <StyledLink to="/size-guide">Size Guide</StyledLink>
            </FooterLink>
          </FooterLinks>
        </FooterColumn>
        
        <FooterColumn>
          <FooterTitle>Newsletter</FooterTitle>
          <FooterText>
            Subscribe to our newsletter to receive updates on new arrivals, special offers and other discount information.
          </FooterText>
          <NewsletterForm>
            <NewsletterInput type="email" placeholder="Your email address" aria-label="Email" />
            <NewsletterButton type="submit">
              <i className="fas fa-paper-plane"></i>
            </NewsletterButton>
          </NewsletterForm>
        </FooterColumn>
      </FooterContent>
      
      <BottomFooter>
        <Copyright>
          &copy; {new Date().getFullYear()} IndianStreet. All Rights Reserved.
        </Copyright>
        <PaymentIcons>
          <PaymentIcon>
            <i className="fab fa-cc-visa"></i>
          </PaymentIcon>
          <PaymentIcon>
            <i className="fab fa-cc-mastercard"></i>
          </PaymentIcon>
          <PaymentIcon>
            <i className="fab fa-cc-paypal"></i>
          </PaymentIcon>
          <PaymentIcon>
            <i className="fab fa-cc-apple-pay"></i>
          </PaymentIcon>
        </PaymentIcons>
      </BottomFooter>
    </FooterContainer>
  );
};

export default Footer;