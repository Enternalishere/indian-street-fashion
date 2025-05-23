import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, PresentationControls, Stage } from '@react-three/drei';

// Styled Components
const HomeContainer = styled.div`
  width: 100%;
`;

// Hero Section
const HeroSection = styled.section`
  position: relative;
  height: 80vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: linear-gradient(135deg, ${props => props.theme.colors.dark} 0%, #1a1a2e 100%);
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    height: 60vh;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.md};
  width: 100%;
  color: ${props => props.theme.colors.light};
`;

const HeroTitle = styled(motion.h1)`
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.light};
  font-family: ${props => props.theme.fonts.heading};
  
  span {
    color: ${props => props.theme.colors.primary};
    font-family: ${props => props.theme.fonts.decorative};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 3rem;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  margin-bottom: ${props => props.theme.spacing.lg};
  max-width: 600px;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1rem;
  }
`;

const HeroButton = styled(motion.button)`
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.light};
  border: none;
  border-radius: ${props => props.theme.borderRadius.medium};
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all ${props => props.theme.transitions.short};
  
  &:hover {
    background-color: ${props => props.theme.colors.secondary};
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const Canvas3DContainer = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 50%;
  height: 100%;
  z-index: 1;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    opacity: 0.5;
    width: 100%;
  }
`;

// Featured Products Section
const FeaturedSection = styled.section`
  padding: ${props => props.theme.spacing.xxl} 0;
  background-color: ${props => props.theme.colors.lightGray};
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: ${props => props.theme.spacing.xl};
  color: ${props => props.theme.colors.dark};
  font-family: ${props => props.theme.fonts.heading};
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background-color: ${props => props.theme.colors.primary};
  }
`;

const ProductsGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.md};
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${props => props.theme.spacing.lg};
  
  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const ProductCard = styled(motion.div)`
  background-color: ${props => props.theme.colors.light};
  border-radius: ${props => props.theme.borderRadius.medium};
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: all ${props => props.theme.transitions.short};
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  }
`;

const ProductImageContainer = styled.div`
  height: 300px;
  position: relative;
  background-color: #f5f5f5;
`;

const ProductDetails = styled.div`
  padding: ${props => props.theme.spacing.md};
`;

const ProductName = styled.h3`
  font-size: 1.2rem;
  margin-bottom: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.dark};
`;

const ProductPrice = styled.p`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const AddToCartButton = styled.button`
  width: 100%;
  padding: ${props => props.theme.spacing.sm};
  background-color: ${props => props.theme.colors.dark};
  color: ${props => props.theme.colors.light};
  border: none;
  border-radius: ${props => props.theme.borderRadius.small};
  font-weight: 500;
  cursor: pointer;
  transition: background-color ${props => props.theme.transitions.short};
  
  &:hover {
    background-color: ${props => props.theme.colors.primary};
  }
`;

// Virtual Store Section
const VirtualStoreSection = styled.section`
  padding: ${props => props.theme.spacing.xxl} 0;
  background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
`;

const VirtualStoreContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.md};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const VirtualStoreDescription = styled.p`
  text-align: center;
  max-width: 800px;
  margin: 0 auto ${props => props.theme.spacing.xl};
  font-size: 1.1rem;
  color: ${props => props.theme.colors.darkGray};
`;

const VirtualStoreCanvas = styled.div`
  width: 100%;
  height: 500px;
  border-radius: ${props => props.theme.borderRadius.large};
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    height: 300px;
  }
`;

// Testimonials Section
const TestimonialsSection = styled.section`
  padding: ${props => props.theme.spacing.xxl} 0;
  background-color: ${props => props.theme.colors.light};
`;

const TestimonialsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.md};
`;

const TestimonialCards = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.lg};
  overflow-x: auto;
  padding: ${props => props.theme.spacing.md} 0;
  
  &::-webkit-scrollbar {
    height: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.primary};
    border-radius: 10px;
  }
`;

const TestimonialCard = styled(motion.div)`
  min-width: 300px;
  background-color: ${props => props.theme.colors.light};
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: ${props => props.theme.spacing.lg};
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid #f0f0f0;
`;

const TestimonialText = styled.p`
  font-style: italic;
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.darkGray};
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
`;

const AuthorAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #ddd;
  margin-right: ${props => props.theme.spacing.md};
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const AuthorInfo = styled.div``;

const AuthorName = styled.h4`
  font-size: 1rem;
  margin-bottom: 5px;
  color: ${props => props.theme.colors.dark};
`;

const AuthorLocation = styled.p`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.mediumGray};
`;

// 3D Model Component
const Model = ({ modelPath }) => {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} scale={1.5} />;
};

// Placeholder for when 3D models are not available
const Placeholder3D = () => {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#FF5722" />
    </mesh>
  );
};

// Featured products data
const featuredProducts = [
  {
    id: 1,
    name: "Embroidered Kurta",
    price: "$29.99",
    image: "/images/kurta.jpg"
  },
  {
    id: 2,
    name: "Streetwear Saree",
    price: "$49.99",
    image: "/images/saree.jpg"
  },
  {
    id: 3,
    name: "Denim Sherwani",
    price: "$39.99",
    image: "/images/sherwani.jpg"
  },
  {
    id: 4,
    name: "Fusion Jacket",
    price: "$34.99",
    image: "/images/jacket.jpg"
  }
];

// Testimonials data
const testimonials = [
  {
    id: 1,
    text: "The quality of the clothes is amazing! The embroidery on my kurta is so detailed and beautiful. Will definitely shop here again.",
    name: "Priya Sharma",
    location: "Mumbai",
    avatar: "/images/avatar1.jpg"
  },
  {
    id: 2,
    text: "I love how IndianStreet blends traditional designs with modern styles. The fusion jacket I bought gets me compliments everywhere I go!",
    name: "Rahul Mehta",
    location: "Delhi",
    avatar: "/images/avatar2.jpg"
  },
  {
    id: 3,
    text: "The 3D preview feature helped me visualize exactly how the saree would look. The colors are vibrant and the fabric is high quality.",
    name: "Ananya Patel",
    location: "Bangalore",
    avatar: "/images/avatar3.jpg"
  }
];

const Home = () => {
  // Refs for scroll animations
  const featuredRef = useRef(null);
  const virtualStoreRef = useRef(null);
  const testimonialRef = useRef(null);
  
  return (
    <HomeContainer>
      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <HeroTitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Discover <span>IndianStreet</span> Fashion
          </HeroTitle>
          <HeroSubtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Explore our collection of vibrant, culturally-inspired clothing that blends traditional Indian craftsmanship with contemporary street style.
          </HeroSubtitle>
          <Link to="/shop">
            <HeroButton
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Shop Now
            </HeroButton>
          </Link>
        </HeroContent>
        
        <Canvas3DContainer>
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <PresentationControls
              global
              zoom={0.8}
              rotation={[0, -Math.PI / 4, 0]}
              polar={[-Math.PI / 4, Math.PI / 4]}
              azimuth={[-Math.PI / 4, Math.PI / 4]}
            >
              <Stage environment="city" intensity={0.6}>
                {/* Replace with actual model path when available */}
                <Placeholder3D />
              </Stage>
            </PresentationControls>
          </Canvas>
        </Canvas3DContainer>
      </HeroSection>
      
      {/* Featured Products Section */}
      <FeaturedSection ref={featuredRef}>
        <SectionTitle>Featured Products</SectionTitle>
        <ProductsGrid>
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ProductImageContainer>
                <Canvas>
                  <ambientLight intensity={0.5} />
                  <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                  <OrbitControls enableZoom={false} enablePan={false} />
                  {/* Replace with actual model path when available */}
                  <Placeholder3D />
                </Canvas>
              </ProductImageContainer>
              <ProductDetails>
                <ProductName>{product.name}</ProductName>
                <ProductPrice>{product.price}</ProductPrice>
                <AddToCartButton>Add to Cart</AddToCartButton>
              </ProductDetails>
            </ProductCard>
          ))}
        </ProductsGrid>
      </FeaturedSection>
      
      {/* Virtual Store Section */}
      <VirtualStoreSection ref={virtualStoreRef}>
        <VirtualStoreContainer>
          <SectionTitle>Experience Our Virtual Store</SectionTitle>
          <VirtualStoreDescription>
            Step into our immersive 3D virtual store and explore our collections as if you were walking through an Indian street market. Click and drag to navigate through the space.
          </VirtualStoreDescription>
          <VirtualStoreCanvas>
            <Canvas camera={{ position: [0, 2, 10], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              <OrbitControls enableZoom={true} enablePan={true} />
              {/* Replace with actual store model when available */}
              <Placeholder3D />
            </Canvas>
          </VirtualStoreCanvas>
        </VirtualStoreContainer>
      </VirtualStoreSection>
      
      {/* Testimonials Section */}
      <TestimonialsSection ref={testimonialRef}>
        <TestimonialsContainer>
          <SectionTitle>What Our Customers Say</SectionTitle>
          <TestimonialCards>
            {testimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{
                  scale: 1.03,
                  rotateY: 5,
                  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)"
                }}
              >
                <TestimonialText>"{testimonial.text}"</TestimonialText>
                <TestimonialAuthor>
                  <AuthorAvatar>
                    {/* Replace with actual avatar when available */}
                    <div style={{ width: '100%', height: '100%', backgroundColor: '#FF5722' }}></div>
                  </AuthorAvatar>
                  <AuthorInfo>
                    <AuthorName>{testimonial.name}</AuthorName>
                    <AuthorLocation>{testimonial.location}</AuthorLocation>
                  </AuthorInfo>
                </TestimonialAuthor>
              </TestimonialCard>
            ))}
          </TestimonialCards>
        </TestimonialsContainer>
      </TestimonialsSection>
    </HomeContainer>
  );
};

export default Home;