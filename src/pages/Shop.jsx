import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

// Styled Components
const ShopContainer = styled.div`
  width: 100%;
`;

const ShopHeader = styled.section`
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

const ShopContent = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.xl} ${props => props.theme.spacing.md};
  display: flex;
  gap: ${props => props.theme.spacing.xl};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: column;
  }
`;

const FilterSidebar = styled.div`
  width: 250px;
  flex-shrink: 0;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    width: 100%;
  }
`;

const FilterSection = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
  background-color: ${props => props.theme.colors.light};
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: ${props => props.theme.spacing.md};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

const FilterTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.dark};
  font-weight: 600;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 40px;
    height: 2px;
    background-color: ${props => props.theme.colors.primary};
  }
`;

const FilterOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
`;

const FilterCheckbox = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
`;

const CheckboxLabel = styled.label`
  font-size: 1rem;
  color: ${props => props.theme.colors.darkGray};
  cursor: pointer;
`;

const PriceRange = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
`;

const RangeSlider = styled.input`
  width: 100%;
  -webkit-appearance: none;
  height: 5px;
  border-radius: 5px;
  background: ${props => props.theme.colors.lightGray};
  outline: none;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${props => props.theme.colors.primary};
    cursor: pointer;
  }
  
  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${props => props.theme.colors.primary};
    cursor: pointer;
  }
`;

const PriceLabels = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.darkGray};
`;

const SizeOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
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
`;

const ProductsContainer = styled.div`
  flex: 1;
`;

const ProductsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.lg};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${props => props.theme.spacing.md};
  }
`;

const ResultCount = styled.p`
  font-size: 1rem;
  color: ${props => props.theme.colors.darkGray};
`;

const SortDropdown = styled.select`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.theme.colors.lightGray};
  border-radius: ${props => props.theme.borderRadius.small};
  background-color: ${props => props.theme.colors.light};
  color: ${props => props.theme.colors.dark};
  font-size: 0.9rem;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const ProductsGrid = styled.div`
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

const QuickViewButton = styled.button`
  position: absolute;
  bottom: ${props => props.theme.spacing.md};
  left: 50%;
  transform: translateX(-50%);
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.dark};
  color: ${props => props.theme.colors.light};
  border: none;
  border-radius: ${props => props.theme.borderRadius.small};
  font-size: 0.9rem;
  opacity: 0;
  transition: opacity ${props => props.theme.transitions.short};
  cursor: pointer;
  
  ${ProductImageContainer}:hover & {
    opacity: 1;
  }
  
  &:hover {
    background-color: ${props => props.theme.colors.primary};
  }
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

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${props => props.theme.spacing.xl};
  gap: ${props => props.theme.spacing.sm};
`;

const PageButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${props => props.active ? props.theme.colors.primary : props.theme.colors.lightGray};
  background-color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.light};
  color: ${props => props.active ? props.theme.colors.light : props.theme.colors.darkGray};
  border-radius: ${props => props.theme.borderRadius.small};
  font-size: 0.9rem;
  cursor: pointer;
  transition: all ${props => props.theme.transitions.short};
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
  }
`;

// 3D Model Component for product cards
const ProductModel = () => {
  return (
    <mesh rotation={[0, 0, 0]}>
      <boxGeometry args={[1.5, 2, 0.5]} />
      <meshStandardMaterial color="#FF5722" />
    </mesh>
  );
};

// Sample product data
const products = [
  {
    id: 1,
    name: "Embroidered Kurta",
    price: "$29.99",
    category: "Men",
    image: "/images/kurta.jpg"
  },
  {
    id: 2,
    name: "Streetwear Saree",
    price: "$49.99",
    category: "Women",
    image: "/images/saree.jpg"
  },
  {
    id: 3,
    name: "Denim Sherwani",
    price: "$39.99",
    category: "Men",
    image: "/images/sherwani.jpg"
  },
  {
    id: 4,
    name: "Fusion Jacket",
    price: "$34.99",
    category: "Unisex",
    image: "/images/jacket.jpg"
  },
  {
    id: 5,
    name: "Printed Palazzo",
    price: "$24.99",
    category: "Women",
    image: "/images/palazzo.jpg"
  },
  {
    id: 6,
    name: "Silk Dupatta",
    price: "$19.99",
    category: "Women",
    image: "/images/dupatta.jpg"
  }
];

const Shop = () => {
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [priceRange, setPriceRange] = useState(100);
  const [activePage, setActivePage] = useState(1);
  const [sortBy, setSortBy] = useState('featured');
  
  const toggleSize = (size) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter(s => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };
  
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };
  
  return (
    <ShopContainer>
      <ShopHeader>
        <HeaderTitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Shop Collection
        </HeaderTitle>
      </ShopHeader>
      
      <ShopContent>
        <FilterSidebar>
          <FilterSection>
            <FilterTitle>Categories</FilterTitle>
            <FilterOptions>
              <FilterCheckbox>
                <input type="checkbox" id="men" />
                <CheckboxLabel htmlFor="men">Men</CheckboxLabel>
              </FilterCheckbox>
              <FilterCheckbox>
                <input type="checkbox" id="women" />
                <CheckboxLabel htmlFor="women">Women</CheckboxLabel>
              </FilterCheckbox>
              <FilterCheckbox>
                <input type="checkbox" id="kids" />
                <CheckboxLabel htmlFor="kids">Kids</CheckboxLabel>
              </FilterCheckbox>
              <FilterCheckbox>
                <input type="checkbox" id="unisex" />
                <CheckboxLabel htmlFor="unisex">Unisex</CheckboxLabel>
              </FilterCheckbox>
            </FilterOptions>
          </FilterSection>
          
          <FilterSection>
            <FilterTitle>Price Range</FilterTitle>
            <PriceRange>
              <RangeSlider 
                type="range" 
                min="0" 
                max="200" 
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
              />
              <PriceLabels>
                <span>$0</span>
                <span>${priceRange}</span>
              </PriceLabels>
            </PriceRange>
          </FilterSection>
          
          <FilterSection>
            <FilterTitle>Size</FilterTitle>
            <SizeOptions>
              {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
                <SizeButton 
                  key={size}
                  selected={selectedSizes.includes(size)}
                  onClick={() => toggleSize(size)}
                >
                  {size}
                </SizeButton>
              ))}
            </SizeOptions>
          </FilterSection>
          
          <FilterSection>
            <FilterTitle>Style</FilterTitle>
            <FilterOptions>
              <FilterCheckbox>
                <input type="checkbox" id="traditional" />
                <CheckboxLabel htmlFor="traditional">Traditional</CheckboxLabel>
              </FilterCheckbox>
              <FilterCheckbox>
                <input type="checkbox" id="fusion" />
                <CheckboxLabel htmlFor="fusion">Fusion</CheckboxLabel>
              </FilterCheckbox>
              <FilterCheckbox>
                <input type="checkbox" id="contemporary" />
                <CheckboxLabel htmlFor="contemporary">Contemporary</CheckboxLabel>
              </FilterCheckbox>
              <FilterCheckbox>
                <input type="checkbox" id="streetwear" />
                <CheckboxLabel htmlFor="streetwear">Streetwear</CheckboxLabel>
              </FilterCheckbox>
            </FilterOptions>
          </FilterSection>
        </FilterSidebar>
        
        <ProductsContainer>
          <ProductsHeader>
            <ResultCount>Showing 1-6 of 24 products</ResultCount>
            <SortDropdown value={sortBy} onChange={handleSortChange}>
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest</option>
              <option value="bestselling">Best Selling</option>
            </SortDropdown>
          </ProductsHeader>
          
          <ProductsGrid>
            {products.map((product) => (
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
                    <ProductModel />
                  </Canvas>
                  <QuickViewButton>Quick View</QuickViewButton>
                </ProductImageContainer>
                <ProductDetails>
                  <ProductName>{product.name}</ProductName>
                  <ProductPrice>{product.price}</ProductPrice>
                  <AddToCartButton>Add to Cart</AddToCartButton>
                </ProductDetails>
              </ProductCard>
            ))}
          </ProductsGrid>
          
          <Pagination>
            {[1, 2, 3, 4].map((page) => (
              <PageButton
                key={page}
                active={activePage === page}
                onClick={() => setActivePage(page)}
              >
                {page}
              </PageButton>
            ))}
          </Pagination>
        </ProductsContainer>
      </ShopContent>
    </ShopContainer>
  );
};

export default Shop;