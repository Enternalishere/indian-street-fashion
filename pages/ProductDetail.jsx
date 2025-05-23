import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PresentationControls, Stage } from '@react-three/drei';

// Styled Components
const ProductDetailContainer = styled.div`
  width: 100%;
`;

const BreadcrumbNav = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.md};
  display: flex;
  align-items: center;
`;

const Breadcrumb = styled(Link)`
  color: ${props => props.theme.colors.darkGray};
  text-decoration: none;
  font-size: 0.9rem;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const BreadcrumbSeparator = styled.span`
  margin: 0 ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.darkGray};
`;

const ProductContent = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.lg} ${props => props.theme.spacing.md};
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing.xl};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const ProductImageContainer = styled.div`
  height: 600px;
  border-radius: ${props => props.theme.borderRadius.medium};
  overflow: hidden;
  background-color: #f5f5f5;
  position: relative;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    height: 400px;
  }
`;

const ProductThumbnails = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  margin-top: ${props => props.theme.spacing.md};
`;

const Thumbnail = styled.div`
  width: 80px;
  height: 80px;
  border-radius: ${props => props.theme.borderRadius.small};
  overflow: hidden;
  background-color: #f5f5f5;
  cursor: pointer;
  border: 2px solid ${props => props.active ? props.theme.colors.primary : 'transparent'};
  transition: all ${props => props.theme.transitions.short};
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
  }
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductCategory = styled.p`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.darkGray};
  margin-bottom: ${props => props.theme.spacing.sm};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ProductName = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.dark};
  font-family: ${props => props.theme.fonts.heading};
`;

const ProductPrice = styled.p`
  font-size: 1.8rem;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const ProductRating = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const Stars = styled.div`
  display: flex;
  margin-right: ${props => props.theme.spacing.sm};
`;

const Star = styled.span`
  color: ${props => props.filled ? '#FFD700' : props.theme.colors.lightGray};
  font-size: 1.2rem;
`;

const ReviewCount = styled.span`
  color: ${props => props.theme.colors.darkGray};
  font-size: 0.9rem;
`;

const ProductDescription = styled.p`
  font-size: 1rem;
  line-height: 1.8;
  color: ${props => props.theme.colors.darkGray};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const ProductFeatures = styled.ul`
  margin-bottom: ${props => props.theme.spacing.lg};
  padding-left: ${props => props.theme.spacing.lg};
`;

const ProductFeature = styled.li`
  font-size: 1rem;
  color: ${props => props.theme.colors.darkGray};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const SizeSelector = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const SizeLabel = styled.p`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.dark};
`;

const SizeOptions = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
`;

const SizeButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${props => props.selected ? props.theme.colors.primary : props.theme.colors.lightGray};
  background-color: ${props => props.selected ? props.theme.colors.primary : props.theme.colors.light};
  color: ${props => props.selected ? props.theme.colors.light : props.theme.colors.darkGray};
  border-radius: ${props => props.theme.borderRadius.small};
  font-size: 0.9rem;
  cursor: pointer;
  transition: all ${props => props.theme.transitions.short};
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    border-color: ${props => props.theme.colors.lightGray};
    background-color: #f5f5f5;
  }
`;

const ColorSelector = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const ColorLabel = styled.p`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.dark};
`;

const ColorOptions = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
`;

const ColorButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${props => props.color};
  border: 2px solid ${props => props.selected ? props.theme.colors.dark : 'transparent'};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.short};
  
  &:hover {
    transform: scale(1.1);
  }
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const QuantityLabel = styled.p`
  font-size: 1rem;
  font-weight: 600;
  margin-right: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.dark};
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${props => props.theme.colors.lightGray};
  border-radius: ${props => props.theme.borderRadius.small};
`;

const QuantityButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  font-size: 1.2rem;
  color: ${props => props.theme.colors.dark};
  cursor: pointer;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const QuantityInput = styled.input`
  width: 40px;
  height: 40px;
  border: none;
  border-left: 1px solid ${props => props.theme.colors.lightGray};
  border-right: 1px solid ${props => props.theme.colors.lightGray};
  text-align: center;
  font-size: 1rem;
  color: ${props => props.theme.colors.dark};
  
  &:focus {
    outline: none;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
`;

const AddToCartButton = styled(motion.button)`
  flex: 1;
  padding: ${props => props.theme.spacing.md};
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
  }
`;

const WishlistButton = styled(motion.button)`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.light};
  color: ${props => props.theme.colors.dark};
  border: 1px solid ${props => props.theme.colors.lightGray};
  border-radius: ${props => props.theme.borderRadius.medium};
  font-size: 1.2rem;
  cursor: pointer;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
    border-color: ${props => props.theme.colors.primary};
  }
`;

const ProductMeta = styled.div`
  margin-top: ${props => props.theme.spacing.lg};
  padding-top: ${props => props.theme.spacing.lg};
  border-top: 1px solid ${props => props.theme.colors.lightGray};
`;

const MetaItem = styled.p`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.darkGray};
  margin-bottom: ${props => props.theme.spacing.xs};
  
  span {
    font-weight: 600;
    color: ${props => props.theme.colors.dark};
  }
`;

const RelatedProductsSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.xl} ${props => props.theme.spacing.md};
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
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

const RelatedProductsGrid = styled.div`
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

const RelatedProductCard = styled(motion.div)`
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

const RelatedProductImage = styled.div`
  height: 200px;
  background-color: #f5f5f5;
`;

const RelatedProductInfo = styled.div`
  padding: ${props => props.theme.spacing.md};
`;

const RelatedProductName = styled.h3`
  font-size: 1.1rem;
  margin-bottom: ${props => props.theme.spacing.xs};
  color: ${props => props.theme.colors.dark};
`;

const RelatedProductPrice = styled.p`
  font-size: 1rem;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
`;

// 3D Model Component - Replace the existing ProductModel with this improved version
const ProductModel = ({ color = "#FF5722" }) => {
  const meshRef = React.useRef();
  
  // Use useFrame to add subtle animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <group>
      {/* Main cloth body */}
      <mesh ref={meshRef} castShadow receiveShadow>
        {/* Use cloth-like geometry instead of box */}
        <cylinderGeometry args={[0.8, 1.2, 2, 16, 6, true]} />
        <meshPhysicalMaterial 
          color={color}
          roughness={0.7}
          metalness={0.1}
          side={2} // Double-sided material
          flatShading={false}
        />
      </mesh>
      
      {/* Collar */}
      <mesh position={[0, 0.9, 0]} castShadow>
        <torusGeometry args={[0.4, 0.1, 16, 32, Math.PI * 0.6]} />
        <meshStandardMaterial 
          color={color} 
          roughness={0.6}
        />
      </mesh>
      
      {/* Buttons */}
      {[-0.5, -0.2, 0.1, 0.4].map((y, i) => (
        <mesh key={i} position={[0, y, 0.6]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 0.02, 12]} />
          <meshStandardMaterial color="#f0f0f0" />
        </mesh>
      ))}
      
      {/* Fabric folds/details */}
      <mesh position={[0, -0.5, 0.4]} rotation={[0.2, 0, 0]} castShadow>
        <boxGeometry args={[1.5, 0.05, 0.1]} />
        <meshStandardMaterial 
          color={color} 
          roughness={0.8}
        />
      </mesh>
    </group>
  );
};

// Sample product data
const product = {
  id: 1,
  name: "Embroidered Fusion Kurta",
  price: "$49.99",
  category: "Men",
  rating: 4.5,
  reviewCount: 28,
  description: "This contemporary fusion kurta blends traditional Indian embroidery with modern streetwear aesthetics. Crafted from premium cotton with hand-embroidered details, it's perfect for both casual outings and semi-formal occasions.",
  features: [
    "100% organic cotton fabric",
    "Hand-embroidered chest panel",
    "Side slits for comfort and style",
    "Machine washable",
    "Ethically made in India"
  ],
  sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  colors: ["#FF5722", "#2196F3", "#4CAF50", "#9C27B0"],
  sku: "IND-FK-001",
  availability: "In Stock",
  tags: ["Kurta", "Fusion", "Embroidered", "Men"]
};

// Sample related products
const relatedProducts = [
  {
    id: 2,
    name: "Streetwear Dhoti Pants",
    price: "$39.99"
  },
  {
    id: 3,
    name: "Graphic Print Nehru Jacket",
    price: "$59.99"
  },
  {
    id: 4,
    name: "Urban Mojari Shoes",
    price: "$45.99"
  },
  {
    id: 5,
    name: "Block Print Shirt",
    price: "$34.99"
  }
];

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // In a real app, you would fetch the product data based on the ID
    console.log(`Fetching product with ID: ${id}`);
  }, [id]);
  
  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };
  
  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };
  
  const addToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    
    // In a real app, you would dispatch an action to add the item to the cart
    console.log("Adding to cart:", {
      ...product,
      selectedSize,
      selectedColor,
      quantity
    });
    
    alert(`${quantity} ${product.name} added to cart!`);
  };
  
  const addToWishlist = () => {
    // In a real app, you would dispatch an action to add the item to the wishlist
    console.log("Adding to wishlist:", product);
    alert(`${product.name} added to wishlist!`);
  };
  
  return (
    <ProductDetailContainer>
      <BreadcrumbNav>
        <Breadcrumb to="/">Home</Breadcrumb>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <Breadcrumb to="/shop">Shop</Breadcrumb>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <Breadcrumb to={`/shop/${product.category.toLowerCase()}`}>{product.category}</Breadcrumb>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <span>{product.name}</span>
      </BreadcrumbNav>
      
      <ProductContent>
        <div>
          <ProductImageContainer>
            <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
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
                <ProductModel color={selectedColor} />
              </PresentationControls>
            </Canvas>
          </ProductImageContainer>
          
          <ProductThumbnails>
            {[0, 1, 2, 3].map((index) => (
              <Thumbnail 
                key={index}
                active={activeImage === index}
                onClick={() => setActiveImage(index)}
              >
                <Canvas>
                  <ambientLight intensity={0.5} />
                  <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                  <ProductModel />
                </Canvas>
              </Thumbnail>
            ))}
          </ProductThumbnails>
        </div>
        
        <ProductInfo>
          <ProductCategory>{product.category}</ProductCategory>
          <ProductName>{product.name}</ProductName>
          <ProductPrice>{product.price}</ProductPrice>
          
          <ProductRating>
            <Stars>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star}
                  filled={star <= Math.floor(product.rating)}
                >
                  ★
                </Star>
              ))}
            </Stars>
            <ReviewCount>({product.reviewCount} reviews)</ReviewCount>
          </ProductRating>
          
          <ProductDescription>{product.description}</ProductDescription>
          
          <ProductFeatures>
            {product.features.map((feature, index) => (
              <ProductFeature key={index}>{feature}</ProductFeature>
            ))}
          </ProductFeatures>
          
          <SizeSelector>
            <SizeLabel>Size</SizeLabel>
            <SizeOptions>
              {product.sizes.map((size) => (
                <SizeButton
                  key={size}
                  selected={selectedSize === size}
                  onClick={() => handleSizeSelect(size)}
                >
                  {size}
                </SizeButton>
              ))}
            </SizeOptions>
          </SizeSelector>
          
          <ColorSelector>
            <ColorLabel>Color</ColorLabel>
            <ColorOptions>
              {product.colors.map((color) => (
                <ColorButton
                  key={color}
                  color={color}
                  selected={selectedColor === color}
                  onClick={() => handleColorSelect(color)}
                />
              ))}
            </ColorOptions>
          </ColorSelector>
          
          <QuantitySelector>
            <QuantityLabel>Quantity</QuantityLabel>
            <QuantityControls>
              <QuantityButton onClick={decreaseQuantity}>-</QuantityButton>
              <QuantityInput 
                type="text" 
                value={quantity}
                onChange={handleQuantityChange}
              />
              <QuantityButton onClick={increaseQuantity}>+</QuantityButton>
            </QuantityControls>
          </QuantitySelector>
          
          <ActionButtons>
            <AddToCartButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={addToCart}
            >
              Add to Cart
            </AddToCartButton>
            <WishlistButton
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={addToWishlist}
            >
              ♥
            </WishlistButton>
          </ActionButtons>
          
          <ProductMeta>
            <MetaItem><span>SKU:</span> {product.sku}</MetaItem>
            <MetaItem><span>Availability:</span> {product.availability}</MetaItem>
            <MetaItem>
              <span>Tags:</span> {product.tags.join(', ')}
            </MetaItem>
          </ProductMeta>
        </ProductInfo>
      </ProductContent>
      
      <RelatedProductsSection>
        <SectionTitle>You May Also Like</SectionTitle>
        <RelatedProductsGrid>
          {relatedProducts.map((product, index) => (
            <RelatedProductCard
              key={product.id}
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <RelatedProductImage>
                <Canvas>
                  <ambientLight intensity={0.5} />
                  <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                  <OrbitControls enableZoom={false} enablePan={false} />
                  <ProductModel color={product.colors ? product.colors[0] : "#FF5722"} />
                </Canvas>
              </RelatedProductImage>
              <RelatedProductInfo>
                <RelatedProductName>{product.name}</RelatedProductName>
                <RelatedProductPrice>{product.price}</RelatedProductPrice>
              </RelatedProductInfo>
            </RelatedProductCard>
          ))}
        </RelatedProductsGrid>
      </RelatedProductsSection>
    </ProductDetailContainer>
  );
};

export default ProductDetail;