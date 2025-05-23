import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PresentationControls } from '@react-three/drei';

// Styled Components
const AboutContainer = styled.div`
  width: 100%;
`;

const AboutHeader = styled.section`
  position: relative;
  height: 40vh;
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

const HeaderMandala = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  z-index: 1;
  opacity: 0.2;
`;

const AboutContent = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.xl} ${props => props.theme.spacing.md};
`;

const StorySection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing.xl};
  margin-bottom: ${props => props.theme.spacing.xxl};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const StoryContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: ${props => props.theme.spacing.lg};
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

const StoryText = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: ${props => props.theme.colors.darkGray};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const StoryImage = styled.div`
  width: 100%;
  height: 400px;
  border-radius: ${props => props.theme.borderRadius.medium};
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const TeamSection = styled.div`
  margin-bottom: ${props => props.theme.spacing.xxl};
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${props => props.theme.spacing.lg};
  
  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const TeamCard = styled(motion.div)`
  background-color: ${props => props.theme.colors.light};
  border-radius: ${props => props.theme.borderRadius.medium};
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  height: 400px;
`;

const TeamMemberImage = styled.div`
  height: 60%;
  background-color: #f5f5f5;
  position: relative;
`;

const TeamMemberInfo = styled.div`
  padding: ${props => props.theme.spacing.md};
`;

const TeamMemberName = styled.h3`
  font-size: 1.3rem;
  margin-bottom: ${props => props.theme.spacing.xs};
  color: ${props => props.theme.colors.dark};
`;

const TeamMemberRole = styled.p`
  font-size: 1rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.sm};
  font-weight: 500;
`;

const TeamMemberBio = styled.p`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.darkGray};
  line-height: 1.6;
`;

const VisionSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing.xl};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const VisionContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const VisionPoints = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const VisionPoint = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${props => props.theme.spacing.md};
`;

const VisionIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.light};
  font-size: 1.5rem;
  flex-shrink: 0;
`;

const VisionPointContent = styled.div``;

const VisionPointTitle = styled.h4`
  font-size: 1.2rem;
  margin-bottom: ${props => props.theme.spacing.xs};
  color: ${props => props.theme.colors.dark};
`;

const VisionPointText = styled.p`
  font-size: 1rem;
  color: ${props => props.theme.colors.darkGray};
  line-height: 1.6;
`;

const VisionImage = styled.div`
  width: 100%;
  height: 400px;
  border-radius: ${props => props.theme.borderRadius.medium};
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const CTASection = styled.div`
  margin-top: ${props => props.theme.spacing.xxl};
  padding: ${props => props.theme.spacing.xl};
  background-color: ${props => props.theme.colors.lightGray};
  border-radius: ${props => props.theme.borderRadius.medium};
  text-align: center;
`;

const CTATitle = styled.h3`
  font-size: 2rem;
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.dark};
  font-family: ${props => props.theme.fonts.heading};
`;

const CTAText = styled.p`
  font-size: 1.1rem;
  color: ${props => props.theme.colors.darkGray};
  margin-bottom: ${props => props.theme.spacing.lg};
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

const CTAButton = styled(motion.button)`
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.light};
  border: none;
  border-radius: ${props => props.theme.borderRadius.medium};
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all ${props => props.theme.transitions.short};
  
  &:hover {
    background-color: ${props => props.theme.colors.secondary};
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

// 3D Components
const Mandala = () => {
  return (
    <mesh rotation={[0, 0, 0]}>
      <torusKnotGeometry args={[2, 0.5, 128, 32]} />
      <meshStandardMaterial color="#FF5722" wireframe={true} />
    </mesh>
  );
};

const TextileSwatches = () => {
  return (
    <group>
      <mesh position={[-1, 0, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[1.5, 1.5, 0.1]} />
        <meshStandardMaterial color="#FF5722" />
      </mesh>
      <mesh position={[1, 0, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[1.5, 1.5, 0.1]} />
        <meshStandardMaterial color="#4CAF50" />
      </mesh>
      <mesh position={[0, 1.5, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[1.5, 1.5, 0.1]} />
        <meshStandardMaterial color="#2196F3" />
      </mesh>
    </group>
  );
};

const TeamMember3D = () => {
  return (
    <mesh rotation={[0, 0, 0]}>
      <cylinderGeometry args={[1, 1, 2, 32]} />
      <meshStandardMaterial color="#1a1a2e" />
      <mesh position={[0, 1.2, 0]}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial color="#FF5722" />
      </mesh>
    </mesh>
  );
};

const About = () => {
  return (
    <AboutContainer>
      <AboutHeader>
        <HeaderTitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          About IndianStreet
        </HeaderTitle>
        
        <HeaderMandala>
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <PresentationControls
              global
              rotation={[0, 0, 0]}
              polar={[-Math.PI / 4, Math.PI / 4]}
              azimuth={[-Math.PI / 4, Math.PI / 4]}
              config={{ mass: 2, tension: 400 }}
              snap={{ mass: 4, tension: 400 }}
            >
              <Mandala />
            </PresentationControls>
          </Canvas>
        </HeaderMandala>
      </AboutHeader>
      
      <AboutContent>
        <StorySection>
          <StoryContent>
            <SectionTitle>Our Story</SectionTitle>
            <StoryText>
              IndianStreet was born from a passion for the vibrant chaos of India's fashion markets. Our founders, inspired by the rich tapestry of colors, textures, and traditions found in the bustling streets of Mumbai, Delhi, and Jaipur, set out to create a brand that celebrates this cultural heritage while embracing modern design sensibilities.
            </StoryText>
            <StoryText>
              What began as a small collection of handcrafted pieces in 2015 has grown into a global brand that bridges the gap between traditional Indian craftsmanship and contemporary street fashion. We work directly with artisans across India, ensuring fair wages and preserving age-old techniques while infusing them with modern aesthetics.
            </StoryText>
            <StoryText>
              Each piece in our collection tells a story - of ancient traditions, skilled hands, and the beautiful collision of cultures that defines modern India. We're not just selling clothes; we're sharing a piece of India's soul with the world.
            </StoryText>
          </StoryContent>
          
          <StoryImage>
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              <OrbitControls enableZoom={false} enablePan={false} />
              <TextileSwatches />
            </Canvas>
          </StoryImage>
        </StorySection>
        
        <TeamSection>
          <SectionTitle>Our Team</SectionTitle>
          <TeamGrid>
            {[
              { name: "Priya Sharma", role: "Founder & Creative Director", bio: "With a background in fashion design from NIFT Delhi, Priya brings 15 years of experience in blending traditional textiles with contemporary silhouettes." },
              { name: "Arjun Mehta", role: "Head of Operations", bio: "Arjun ensures our supply chain remains ethical and sustainable, working directly with artisan communities across India." },
              { name: "Zara Khan", role: "Lead Designer", bio: "Specializing in embroidery and textile development, Zara's designs have been featured in Vogue India and at Lakme Fashion Week." }
            ].map((member, index) => (
              <TeamCard
                key={index}
                whileHover={{ 
                  y: -10,
                  rotateY: 5,
                  boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)"
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <TeamMemberImage>
                  <Canvas>
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                    <OrbitControls enableZoom={false} enablePan={false} />
                    <TeamMember3D />
                  </Canvas>
                </TeamMemberImage>
                <TeamMemberInfo>
                  <TeamMemberName>{member.name}</TeamMemberName>
                  <TeamMemberRole>{member.role}</TeamMemberRole>
                  <TeamMemberBio>{member.bio}</TeamMemberBio>
                </TeamMemberInfo>
              </TeamCard>
            ))}
          </TeamGrid>
        </TeamSection>
        
        <VisionSection>
          <VisionImage>
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              <OrbitControls enableZoom={false} enablePan={false} />
              <mesh rotation={[0, 0, 0]}>
                <sphereGeometry args={[2, 32, 32]} />
                <meshStandardMaterial color="#1a1a2e" wireframe={true} />
              </mesh>
            </Canvas>
          </VisionImage>
          
          <VisionContent>
            <SectionTitle>Our Vision</SectionTitle>
            <VisionPoints>
              <VisionPoint>
                <VisionIcon>
                  <i className="fas fa-leaf"></i>
                </VisionIcon>
                <VisionPointContent>
                  <VisionPointTitle>Sustainability</VisionPointTitle>
                  <VisionPointText>
                    We're committed to ethical production practices, using natural dyes, organic fabrics, and zero-waste design principles wherever possible.
                  </VisionPointText>
                </VisionPointContent>
              </VisionPoint>
              
              <VisionPoint>
                <VisionIcon>
                  <i className="fas fa-hands-helping"></i>
                </VisionIcon>
                <VisionPointContent>
                  <VisionPointTitle>Artisan Support</VisionPointTitle>
                  <VisionPointText>
                    By working directly with craftspeople, we ensure fair wages and help preserve traditional techniques that might otherwise be lost to mass production.
                  </VisionPointText>
                </VisionPointContent>
              </VisionPoint>
              
              <VisionPoint>
                <VisionIcon>
                  <i className="fas fa-globe-asia"></i>
                </VisionIcon>
                <VisionPointContent>
                  <VisionPointTitle>Cultural Bridge</VisionPointTitle>
                  <VisionPointText>
                    We aim to be a bridge between India's rich textile heritage and global fashion trends, creating pieces that resonate across cultures.
                  </VisionPointText>
                </VisionPointContent>
              </VisionPoint>
            </VisionPoints>
          </VisionContent>
        </VisionSection>
        
        <CTASection>
          <CTATitle>Join Our Journey</CTATitle>
          <CTAText>
            Discover the perfect blend of tradition and innovation in our latest collection. Each piece is a celebration of India's vibrant street fashion scene.
          </CTAText>
          <CTAButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Our Collection
          </CTAButton>
        </CTASection>
      </AboutContent>
    </AboutContainer>
  );
};

export default About;