import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

// Styled Components
const ContactContainer = styled.div`
  width: 100%;
`;

const ContactHeader = styled.section`
  position: relative;
  height: 30vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: linear-gradient(135deg, ${props => props.theme.colors.dark} 0%, #1a1a2e 100%);
`;

const HeaderTitle = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.light};
  text-align: center;
  font-family: ${props => props.theme.fonts.heading};
  z-index: 2;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 2.5rem;
  }
`;

const ContactContent = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.xl} ${props => props.theme.spacing.md};
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing.xl};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const ContactFormContainer = styled.div`
  background-color: ${props => props.theme.colors.light};
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: ${props => props.theme.spacing.lg};
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const FormTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.dark};
  font-family: ${props => props.theme.fonts.heading};
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 60px;
    height: 3px;
    background-color: ${props => props.theme.colors.primary};
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
`;

const FormLabel = styled.label`
  font-size: 1rem;
  color: ${props => props.theme.colors.darkGray};
  font-weight: 500;
`;

const FormInput = styled.input`
  padding: ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.theme.colors.lightGray};
  border-radius: ${props => props.theme.borderRadius.small};
  font-size: 1rem;
  transition: border-color ${props => props.theme.transitions.short};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const FormTextarea = styled.textarea`
  padding: ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.theme.colors.lightGray};
  border-radius: ${props => props.theme.borderRadius.small};
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  transition: border-color ${props => props.theme.transitions.short};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const SubmitButton = styled(motion.button)`
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.light};
  border: none;
  border-radius: ${props => props.theme.borderRadius.medium};
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all ${props => props.theme.transitions.short};
  margin-top: ${props => props.theme.spacing.sm};
  
  &:hover {
    background-color: ${props => props.theme.colors.secondary};
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const ContactInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
`;

const ContactInfoTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.dark};
  font-family: ${props => props.theme.fonts.heading};
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 60px;
    height: 3px;
    background-color: ${props => props.theme.colors.primary};
  }
`;

const ContactInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
`;

const ContactInfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const ContactIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.light};
  font-size: 1.2rem;
`;

const ContactText = styled.p`
  font-size: 1rem;
  color: ${props => props.theme.colors.darkGray};
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.md};
`;

const SocialLink = styled(motion.a)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.dark};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.light};
  font-size: 1.2rem;
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.theme.colors.primary};
  }
`;

const MapContainer = styled.div`
  width: 100%;
  height: 300px;
  border-radius: ${props => props.theme.borderRadius.medium};
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  margin-top: ${props => props.theme.spacing.lg};
`;

// 3D Map Component
const Map3D = () => {
  return (
    <mesh rotation={[0, 0, 0]}>
      <boxGeometry args={[5, 0.2, 5]} />
      <meshStandardMaterial color="#e0e0e0" />
      
      {/* Building 1 */}
      <mesh position={[-1.5, 0.5, -1.5]} scale={[0.5, 1, 0.5]}>
        <boxGeometry />
        <meshStandardMaterial color="#FF5722" />
      </mesh>
      
      {/* Building 2 */}
      <mesh position={[1.5, 0.3, 1.5]} scale={[0.8, 0.6, 0.4]}>
        <boxGeometry />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>
      
      {/* Store Location */}
      <mesh position={[0, 0.3, 0]} scale={[0.7, 0.6, 0.7]}>
        <boxGeometry />
        <meshStandardMaterial color="#4CAF50" />
      </mesh>
      
      {/* Roads */}
      <mesh position={[0, 0.11, 0]} rotation={[0, Math.PI / 4, 0]} scale={[5, 0.01, 0.3]}>
        <boxGeometry />
        <meshStandardMaterial color="#333" />
      </mesh>
      
      <mesh position={[0, 0.11, 0]} rotation={[0, -Math.PI / 4, 0]} scale={[5, 0.01, 0.3]}>
        <boxGeometry />
        <meshStandardMaterial color="#333" />
      </mesh>
    </mesh>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (would connect to backend in production)
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };
  
  return (
    <ContactContainer>
      <ContactHeader>
        <HeaderTitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Contact Us
        </HeaderTitle>
      </ContactHeader>
      
      <ContactContent>
        <ContactFormContainer>
          <FormTitle>Send Us a Message</FormTitle>
          <ContactForm onSubmit={handleSubmit}>
            <FormGroup>
              <FormLabel htmlFor="name">Your Name</FormLabel>
              <FormInput 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name}
                onChange={handleChange}
                required 
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel htmlFor="email">Your Email</FormLabel>
              <FormInput 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange}
                required 
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel htmlFor="subject">Subject</FormLabel>
              <FormInput 
                type="text" 
                id="subject" 
                name="subject" 
                value={formData.subject}
                onChange={handleChange}
                required 
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel htmlFor="message">Your Message</FormLabel>
              <FormTextarea 
                id="message" 
                name="message" 
                value={formData.message}
                onChange={handleChange}
                required 
              />
            </FormGroup>
            
            <SubmitButton 
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Message
            </SubmitButton>
          </ContactForm>
        </ContactFormContainer>
        
        <ContactInfoContainer>
          <ContactInfoTitle>Get in Touch</ContactInfoTitle>
          
          <ContactInfoSection>
            <ContactInfoItem>
              <ContactIcon>
                <i className="fas fa-map-marker-alt"></i>
              </ContactIcon>
              <ContactText>123 Fashion Street, Mumbai, India</ContactText>
            </ContactInfoItem>
            
            <ContactInfoItem>
              <ContactIcon>
                <i className="fas fa-phone-alt"></i>
              </ContactIcon>
              <ContactText>+91 98765 43210</ContactText>
            </ContactInfoItem>
            
            <ContactInfoItem>
              <ContactIcon>
                <i className="fas fa-envelope"></i>
              </ContactIcon>
              <ContactText>info@indianstreet.com</ContactText>
            </ContactInfoItem>
            
            <ContactInfoItem>
              <ContactIcon>
                <i className="fas fa-clock"></i>
              </ContactIcon>
              <ContactText>Mon - Sat: 10:00 AM - 8:00 PM</ContactText>
            </ContactInfoItem>
          </ContactInfoSection>
          
          <ContactInfoSection>
            <h3>Follow Us</h3>
            <SocialLinks>
              <SocialLink 
                href="#" 
                whileHover={{ y: -5 }}
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </SocialLink>
              <SocialLink 
                href="#" 
                whileHover={{ y: -5 }}
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </SocialLink>
              <SocialLink 
                href="#" 
                whileHover={{ y: -5 }}
                aria-label="Twitter"
              >
                <i className="fab fa-twitter"></i>
              </SocialLink>
              <SocialLink 
                href="#" 
                whileHover={{ y: -5 }}
                aria-label="Pinterest"
              >
                <i className="fab fa-pinterest"></i>
              </SocialLink>
            </SocialLinks>
          </ContactInfoSection>
          
          <MapContainer>
            <Canvas camera={{ position: [0, 5, 5], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              <OrbitControls enableZoom={true} enablePan={true} />
              <Map3D />
            </Canvas>
          </MapContainer>
        </ContactInfoContainer>
      </ContactContent>
    </ContactContainer>
  );
};

export default Contact;