import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

// Styled Components
const CartContainer = styled.div`
  width: 100%;
`;

const CartHeader = styled.section`
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

const CartContent = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.xl} ${props => props.theme.spacing.md};
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: ${props => props.theme.spacing.xl};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const CartItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
`;

const CartItem = styled(motion.div)`
  display: grid;
  grid-template-columns: 120px 1fr auto;
  gap: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.light};
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 80px 1fr;
    grid-template-rows: auto auto;
  }
`;

const ItemImage = styled.div`
  width: 120px;
  height: 120px;
  border-radius: ${props => props.theme.borderRadius.small};
  overflow: hidden;
  background-color: #f5f5f5;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 80px;
    height: 80px;
  }
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ItemName = styled.h3`
  font-size: 1.2rem;
  margin-bottom: ${props => props.theme.spacing.xs};
  color: ${props => props.theme.colors.dark};
`;

const ItemVariants = styled.p`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.darkGray};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const ItemPrice = styled.p`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const ItemActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-column: 1 / -1;
    justify-content: space-between;
  }
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${props => props.theme.colors.lightGray};
  border-radius: ${props => props.theme.borderRadius.small};
`;

const QuantityButton = styled.button`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  font-size: 1rem;
  color: ${props => props.theme.colors.dark};
  cursor: pointer;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const QuantityInput = styled.input`
  width: 30px;
  height: 30px;
  border: none;
  border-left: 1px solid ${props => props.theme.colors.lightGray};
  border-right: 1px solid ${props => props.theme.colors.lightGray};
  text-align: center;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.dark};
  
  &:focus {
    outline: none;
  }
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.darkGray};
  font-size: 0.9rem;
  cursor: pointer;
  
  &:hover {
    color: ${props => props.theme.colors.error};
    text-decoration: underline;
  }
`;

const ItemTotal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-column: 2;
    grid-row: 1;
  }
`;

const ItemTotalPrice = styled.p`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${props => props.theme.colors.dark};
`;

const EmptyCart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing.xl};
  background-color: ${props => props.theme.colors.light};
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  text-align: center;
`;

const EmptyCartIcon = styled.div`
  font-size: 4rem;
  color: ${props => props.theme.colors.lightGray};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const EmptyCartText = styled.h3`
  font-size: 1.5rem;
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.dark};
`;

const EmptyCartSubtext = styled.p`
  font-size: 1rem;
  color: ${props => props.theme.colors.darkGray};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const ShopNowButton = styled(Link)`
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.light};
  border: none;
  border-radius: ${props => props.theme.borderRadius.medium};
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  text-decoration: none;
  transition: all ${props => props.theme.transitions.short};
  
  &:hover {
    background-color: ${props => props.theme.colors.secondary};
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const OrderSummary = styled.div`
  background-color: ${props => props.theme.colors.light};
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: ${props => props.theme.spacing.lg};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 100px;
`;

const SummaryTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.dark};
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

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing.sm};
  font-size: 1rem;
  color: ${props => props.theme.colors.darkGray};
`;

const SummaryTotal = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${props => props.theme.spacing.md};
  padding-top: ${props => props.theme.spacing.md};
  border-top: 1px solid ${props => props.theme.colors.lightGray};
  font-size: 1.2rem;
  font-weight: 600;
  color: ${props => props.theme.colors.dark};
`;

const CheckoutButton = styled(Link)`
  display: block;
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.lg};
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.light};
  border: none;
  border-radius: ${props => props.theme.borderRadius.medium};
  font-weight: 600;
  font-size: 1rem;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  transition: all ${props => props.theme.transitions.short};
  
  &:hover {
    background-color: ${props => props.theme.colors.secondary};
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const PromoCodeSection = styled.div`
  margin-top: ${props => props.theme.spacing.lg};
  padding-top: ${props => props.theme.spacing.md};
  border-top: 1px solid ${props => props.theme.colors.lightGray};
`;

const PromoCodeTitle = styled.h4`
  font-size: 1rem;
  margin-bottom: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.dark};
`;

const PromoCodeForm = styled.form`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
`;

const PromoCodeInput = styled.input`
  flex: 1;
  padding: ${props => props.theme.spacing.sm};
  border: 1px solid ${props => props.theme.colors.lightGray};
  border-radius: ${props => props.theme.borderRadius.small};
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const ApplyButton = styled.button`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.dark};
  color: ${props => props.theme.colors.light};
  border: none;
  border-radius: ${props => props.theme.borderRadius.small};
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color ${props => props.theme.transitions.short};
  
  &:hover {
    background-color: ${props => props.theme.colors.primary};
  }
`;

const RecommendedSection = styled.div`
  margin-top: ${props => props.theme.spacing.xxl};
`;

const RecommendedTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.dark};
  text-align: center;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background-color: ${props => props.theme.colors.primary};
  }
`;

const RecommendedGrid = styled.div`
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

// Sample data for cart items
const sampleCartItems = [
  {
    id: 1,
    name: 'Embroidered Cotton Kurta',
    image: '/images/product1.jpg',
    price: 1299,
    quantity: 1,
    size: 'M',
    color: 'Blue'
  },
  {
    id: 2,
    name: 'Handwoven Silk Saree',
    image: '/images/product2.jpg',
    price: 3499,
    quantity: 1,
    size: 'Free Size',
    color: 'Red'
  },
  {
    id: 3,
    name: 'Block Print Cotton Shirt',
    image: '/images/product3.jpg',
    price: 899,
    quantity: 2,
    size: 'L',
    color: 'White'
  }
];

// Sample data for recommended products
const recommendedProducts = [
  {
    id: 4,
    name: 'Handcrafted Leather Sandals',
    image: '/images/product4.jpg',
    price: 1499
  },
  {
    id: 5,
    name: 'Bandhani Dupatta',
    image: '/images/product5.jpg',
    price: 699
  },
  {
    id: 6,
    name: 'Kalamkari Print Dress',
    image: '/images/product6.jpg',
    price: 1899
  },
  {
    id: 7,
    name: 'Handloom Cotton Pants',
    image: '/images/product7.jpg',
    price: 1299
  }
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(sampleCartItems);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  
  // Calculate subtotal
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Calculate shipping (free over 2000)
  const shipping = subtotal > 2000 ? 0 : 150;
  
  // Calculate tax (5%)
  const tax = subtotal * 0.05;
  
  // Calculate total
  const total = subtotal + shipping + tax - discount;
  
  // Handle quantity change
  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  
  // Handle remove item
  const handleRemoveItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };
  
  // Handle promo code
  const handleApplyPromoCode = (e) => {
    e.preventDefault();
    
    // Example promo code logic
    if (promoCode.toUpperCase() === 'WELCOME10') {
      setDiscount(subtotal * 0.1);
    } else if (promoCode.toUpperCase() === 'FREESHIP') {
      setDiscount(shipping);
    } else {
      setDiscount(0);
      alert('Invalid promo code');
    }
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  return (
    <CartContainer>
      <CartHeader>
        <HeaderTitle
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Your Shopping Cart
        </HeaderTitle>
      </CartHeader>
      
      <CartContent>
        {cartItems.length > 0 ? (
          <>
            <CartItemsContainer
              as={motion.div}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {cartItems.map(item => (
                <CartItem key={item.id} variants={itemVariants}>
                  <ItemImage>
                    {/* Replace with actual image */}
                    <div style={{ width: '100%', height: '100%', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {item.name.charAt(0)}
                    </div>
                  </ItemImage>
                  
                  <ItemDetails>
                    <ItemName>{item.name}</ItemName>
                    <ItemVariants>Size: {item.size} | Color: {item.color}</ItemVariants>
                    <ItemPrice>₹{item.price.toLocaleString()}</ItemPrice>
                    
                    <ItemActions>
                      <QuantityControls>
                        <QuantityButton onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</QuantityButton>
                        <QuantityInput 
                          type="text" 
                          value={item.quantity} 
                          onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                        />
                        <QuantityButton onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</QuantityButton>
                      </QuantityControls>
                      
                      <RemoveButton onClick={() => handleRemoveItem(item.id)}>Remove</RemoveButton>
                    </ItemActions>
                  </ItemDetails>
                  
                  <ItemTotal>
                    <ItemTotalPrice>₹{(item.price * item.quantity).toLocaleString()}</ItemTotalPrice>
                  </ItemTotal>
                </CartItem>
              ))}
            </CartItemsContainer>
            
            <OrderSummary>
              <SummaryTitle>Order Summary</SummaryTitle>
              
              <SummaryRow>
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </SummaryRow>
              
              <SummaryRow>
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `₹${shipping.toLocaleString()}`}</span>
              </SummaryRow>
              
              <SummaryRow>
                <span>Tax (5%)</span>
                <span>₹{tax.toLocaleString()}</span>
              </SummaryRow>
              
              {discount > 0 && (
                <SummaryRow>
                  <span>Discount</span>
                  <span>-₹{discount.toLocaleString()}</span>
                </SummaryRow>
              )}
              
              <SummaryTotal>
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </SummaryTotal>
              
              <PromoCodeSection>
                <PromoCodeTitle>Have a promo code?</PromoCodeTitle>
                <PromoCodeForm onSubmit={handleApplyPromoCode}>
                  <PromoCodeInput 
                    type="text" 
                    placeholder="Enter code" 
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <ApplyButton type="submit">Apply</ApplyButton>
                </PromoCodeForm>
              </PromoCodeSection>
              
              <CheckoutButton to="/checkout">Proceed to Checkout</CheckoutButton>
            </OrderSummary>
          </>
        ) : (
          <EmptyCart>
            <EmptyCartIcon>🛒</EmptyCartIcon>
            <EmptyCartText>Your cart is empty</EmptyCartText>
            <EmptyCartSubtext>Looks like you haven't added anything to your cart yet.</EmptyCartSubtext>
            <ShopNowButton to="/shop">Continue Shopping</ShopNowButton>
          </EmptyCart>
        )}
      </CartContent>
      
      {cartItems.length > 0 && (
        <RecommendedSection>
          <RecommendedTitle>You May Also Like</RecommendedTitle>
          <RecommendedGrid>
            {recommendedProducts.map(product => (
              <motion.div
                key={product.id}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                  <div style={{ 
                    backgroundColor: '#f0f0f0', 
                    height: '200px', 
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '10px'
                  }}>
                    {product.name.charAt(0)}
                  </div>
                  <h3 style={{ fontSize: '1rem', marginBottom: '5px', color: '#333' }}>{product.name}</h3>
                  <p style={{ fontSize: '1.1rem', fontWeight: '600', color: '#e63946' }}>₹{product.price.toLocaleString()}</p>
                </Link>
              </motion.div>
            ))}
          </RecommendedGrid>
        </RecommendedSection>
      )}
    </CartContainer>
  );
};

export default Cart;