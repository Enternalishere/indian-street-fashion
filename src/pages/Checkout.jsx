import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Styled Components
const CheckoutContainer = styled.div`
  width: 100%;
`;

const CheckoutHeader = styled.section`
  position: relative;
  height: 20vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: linear-gradient(135deg, ${props => props.theme.colors.dark} 0%, #1a1a2e 100%);
`;

const HeaderTitle = styled(motion.h1)`
  font-size: 3rem;
  font-weight: 700;
  color: ${props => props.theme.colors.light};
  text-align: center;
  font-family: ${props => props.theme.fonts.heading};
  z-index: 2;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 2.2rem;
  }
`;

const CheckoutContent = styled.section`
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

const CheckoutSteps = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing.xl};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${props => props.theme.spacing.sm};
  }
`;

const Step = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  
  &:not(:last-child):after {
    content: '';
    position: absolute;
    top: 50%;
    right: -50px;
    width: 50px;
    height: 2px;
    background-color: ${props => props.active || props.completed ? props.theme.colors.primary : props.theme.colors.lightGray};
    
    @media (max-width: ${props => props.theme.breakpoints.mobile}) {
      display: none;
    }
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin-bottom: ${props => props.theme.spacing.sm};
  }
`;

const StepNumber = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${props => 
    props.completed ? props.theme.colors.success : 
    props.active ? props.theme.colors.primary : 
    props.theme.colors.lightGray
  };
  color: ${props => props.theme.colors.light};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${props => props.theme.spacing.sm};
  font-weight: 600;
`;

const StepLabel = styled.span`
  font-size: 1rem;
  color: ${props => 
    props.completed ? props.theme.colors.success : 
    props.active ? props.theme.colors.primary : 
    props.theme.colors.darkGray
  };
  font-weight: ${props => props.active || props.completed ? '600' : '400'};
`;

const CheckoutForm = styled.div`
  background-color: ${props => props.theme.colors.light};
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: ${props => props.theme.spacing.lg};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

const FormSection = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
  display: ${props => props.visible ? 'block' : 'none'};
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.dark};
  font-family: ${props => props.theme.fonts.heading};
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.cols || 1}, 1fr);
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.md};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 0.9rem;
  margin-bottom: ${props => props.theme.spacing.xs};
  color: ${props => props.theme.colors.dark};
  font-weight: 500;
`;

const Input = styled.input`
  padding: ${props => props.theme.spacing.sm};
  border: 1px solid ${props => props.error ? props.theme.colors.error : props.theme.colors.lightGray};
  border-radius: ${props => props.theme.borderRadius.small};
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const Select = styled.select`
  padding: ${props => props.theme.spacing.sm};
  border: 1px solid ${props => props.error ? props.theme.colors.error : props.theme.colors.lightGray};
  border-radius: ${props => props.theme.borderRadius.small};
  font-size: 1rem;
  background-color: ${props => props.theme.colors.light};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const ErrorText = styled.span`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.error};
  margin-top: ${props => props.theme.spacing.xs};
`;

const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
`;

const RadioOption = styled.label`
  display: flex;
  align-items: center;
  padding: ${props => props.theme.spacing.sm};
  border: 1px solid ${props => props.selected ? props.theme.colors.primary : props.theme.colors.lightGray};
  border-radius: ${props => props.theme.borderRadius.small};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.short};
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
    background-color: ${props => props.theme.colors.lightBg};
  }
`;

const Radio = styled.input`
  margin-right: ${props => props.theme.spacing.sm};
`;

const RadioLabel = styled.span`
  font-size: 1rem;
  color: ${props => props.theme.colors.dark};
`;

const RadioDescription = styled.span`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.darkGray};
  margin-left: auto;
`;

const CardFields = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.md};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const ExpiryAndCvv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing.md};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${props => props.theme.spacing.lg};
`;

const BackButton = styled.button`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  background-color: ${props => props.theme.colors.light};
  color: ${props => props.theme.colors.dark};
  border: 1px solid ${props => props.theme.colors.lightGray};
  border-radius: ${props => props.theme.borderRadius.medium};
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  transition: all ${props => props.theme.transitions.short};
  
  &:hover {
    background-color: ${props => props.theme.colors.lightBg};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const NextButton = styled(motion.button)`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.light};
  border: none;
  border-radius: ${props => props.theme.borderRadius.medium};
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
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

const OrderItems = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const OrderItem = styled.div`
  display: flex;
  margin-bottom: ${props => props.theme.spacing.sm};
  padding-bottom: ${props => props.theme.spacing.sm};
  border-bottom: 1px solid ${props => props.theme.colors.lightGray};
  
  &:last-child {
    border-bottom: none;
  }
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemName = styled.p`
  font-size: 0.9rem;
  margin-bottom: ${props => props.theme.spacing.xs};
  color: ${props => props.theme.colors.dark};
`;

const ItemMeta = styled.p`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.darkGray};
`;

const ItemPrice = styled.p`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${props => props.theme.colors.dark};
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing.sm};
  font-size: 0.9rem;
  color: ${props => props.theme.colors.darkGray};
`;

const SummaryTotal = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${props => props.theme.spacing.md};
  padding-top: ${props => props.theme.spacing.md};
  border-top: 1px solid ${props => props.theme.colors.lightGray};
  font-size: 1.1rem;
  font-weight: 600;
  color: ${props => props.theme.colors.dark};
`;

const SuccessContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: ${props => props.theme.spacing.xl};
  background-color: ${props => props.theme.colors.light};
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  grid-column: 1 / -1;
`;

const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.success};
  color: ${props => props.theme.colors.light};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const SuccessTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.dark};
  font-family: ${props => props.theme.fonts.heading};
`;

const SuccessText = styled.p`
  font-size: 1.1rem;
  color: ${props => props.theme.colors.darkGray};
  margin-bottom: ${props => props.theme.spacing.lg};
  max-width: 600px;
`;

const OrderNumber = styled.p`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.lg};
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.lightBg};
  border-radius: ${props => props.theme.borderRadius.small};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const PrimaryButton = styled(Link)`
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.light};
  border: none;
  border-radius: ${props => props.theme.borderRadius.medium};
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  text-align: center;
  
  &:hover {
    background-color: ${props => props.theme.colors.secondary};
  }
`;

const SecondaryButton = styled(Link)`
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  background-color: ${props => props.theme.colors.light};
  color: ${props => props.theme.colors.dark};
  border: 1px solid ${props => props.theme.colors.lightGray};
  border-radius: ${props => props.theme.borderRadius.medium};
  font-weight: 500;
  font-size: 1rem;
  text-decoration: none;
  text-align: center;
  
  &:hover {
    background-color: ${props => props.theme.colors.lightBg};
  }
`;

// Sample cart items
const sampleCartItems = [
  {
    id: 1,
    name: 'Embroidered Cotton Kurta',
    price: 1299,
    quantity: 1,
    size: 'M',
    color: 'Blue'
  },
  {
    id: 2,
    name: 'Handwoven Silk Saree',
    price: 3499,
    quantity: 1,
    size: 'Free Size',
    color: 'Red'
  },
  {
    id: 3,
    name: 'Block Print Cotton Shirt',
    price: 899,
    quantity: 2,
    size: 'L',
    color: 'White'
  }
];

const Checkout = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  
  // Form state
  const [formData, setFormData] = useState({
    // Shipping information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    
    // Payment information
    paymentMethod: 'card',
    cardName: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    upiId: ''
  });
  
  // Form errors
  const [errors, setErrors] = useState({});
  
  // Cart items
  const [cartItems, setCartItems] = useState(sampleCartItems);
  
  // Calculate order summary
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 2000 ? 0 : 150;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;
  
  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  // Validate shipping form
  const validateShippingForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.pincode.trim()) {
      newErrors.pincode = 'PIN code is required';
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'PIN code must be 6 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Validate payment form
  const validatePaymentForm = () => {
    const newErrors = {};
    
    if (formData.paymentMethod === 'card') {
      if (!formData.cardName.trim()) newErrors.cardName = 'Name on card is required';
      if (!formData.cardNumber.trim()) {
        newErrors.cardNumber = 'Card number is required';
      } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
        newErrors.cardNumber = 'Card number must be 16 digits';
      }
      if (!formData.expiryMonth) newErrors.expiryMonth = 'Month is required';
      if (!formData.expiryYear) newErrors.expiryYear = 'Year is required';
      if (!formData.cvv.trim()) {
        newErrors.cvv = 'CVV is required';
      } else if (!/^\d{3,4}$/.test(formData.cvv)) {
        newErrors.cvv = 'CVV must be 3 or 4 digits';
      }
    } else if (formData.paymentMethod === 'upi') {
      if (!formData.upiId.trim()) {
        newErrors.upiId = 'UPI ID is required';
      } else if (!/^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z][a-zA-Z]{2,64}$/.test(formData.upiId)) {
        newErrors.upiId = 'Invalid UPI ID format';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle next step
  const handleNextStep = () => {
    if (currentStep === 1) {
      if (validateShippingForm()) {
        setCurrentStep(2);
        window.scrollTo(0, 0);
      }
    } else if (currentStep === 2) {
      if (validatePaymentForm()) {
        // Process payment and complete order
        processOrder();
      }
    }
  };
  
  // Handle back step
  const handleBackStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };
  
  // Process order
  const processOrder = () => {
    // In a real app, you would send the order data to your backend
    console.log('Processing order with data:', { formData, cartItems, total });
    
    // Simulate order processing
    setTimeout(() => {
      // Generate random order number
      const randomOrderNumber = 'IND' + Math.floor(100000 + Math.random() * 900000);
      setOrderNumber(randomOrderNumber);
      setOrderComplete(true);
      window.scrollTo(0, 0);
    }, 1500);
  };
  
  // Generate years for expiry dropdown
  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = 0; i < 10; i++) {
      years.push(currentYear + i);
    }
    return years;
  };
  
  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <HeaderTitle
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Checkout
        </HeaderTitle>
      </CheckoutHeader>
      
      <CheckoutContent>
        {!orderComplete ? (
          <>
            <div>
              <CheckoutSteps>
                <Step active={currentStep === 1} completed={currentStep > 1}>
                  <StepNumber active={currentStep === 1} completed={currentStep > 1}>
                    {currentStep > 1 ? '✓' : '1'}
                  </StepNumber>
                  <StepLabel active={currentStep === 1} completed={currentStep > 1}>Shipping</StepLabel>
                </Step>
                
                <Step active={currentStep === 2} completed={currentStep > 2}>
                  <StepNumber active={currentStep === 2} completed={currentStep > 2}>
                    {currentStep > 2 ? '✓' : '2'}
                  </StepNumber>
                  <StepLabel active={currentStep === 2} completed={currentStep > 2}>Payment</StepLabel>
                </Step>
                
                <Step active={currentStep === 3} completed={currentStep > 3}>
                  <StepNumber active={currentStep === 3} completed={currentStep > 3}>
                    {currentStep > 3 ? '✓' : '3'}
                  </StepNumber>
                  <StepLabel active={currentStep === 3} completed={currentStep > 3}>Confirmation</StepLabel>
                </Step>
              </CheckoutSteps>
              
              <CheckoutForm>
                {/* Shipping Information */}
                <FormSection visible={currentStep === 1}>
                  <SectionTitle>Shipping Information</SectionTitle>
                  
                  <FormRow cols={2}>
                    <FormGroup>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input 
                        type="text" 
                        id="firstName" 
                        name="firstName" 
                        value={formData.firstName}
                        onChange={handleInputChange}
                        error={errors.firstName}
                      />
                      {errors.firstName && <ErrorText>{errors.firstName}</ErrorText>}
                    </FormGroup>
                    
                    <FormGroup>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input 
                        type="text" 
                        id="lastName" 
                        name="lastName" 
                        value={formData.lastName}
                        onChange={handleInputChange}
                        error={errors.lastName}
                      />
                      {errors.lastName && <ErrorText>{errors.lastName}</ErrorText>}
                    </FormGroup>
                  </FormRow>
                  
                  <FormRow cols={2}>
                    <FormGroup>
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email}
                        onChange={handleInputChange}
                        error={errors.email}
                      />
                      {errors.email && <ErrorText>{errors.email}</ErrorText>}
                    </FormGroup>
                    
                    <FormGroup>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        type="tel" 
                        id="phone" 
                        name="phone" 
                        value={formData.phone}
                        onChange={handleInputChange}
                        error={errors.phone}
                      />
                      {errors.phone && <ErrorText>{errors.phone}</ErrorText>}
                    </FormGroup>
                  </FormRow>
                  
                  <FormRow>
                    <FormGroup>
                      <Label htmlFor="address">Address</Label>
                      <Input 
                        type="text" 
                        id="address" 
                        name="address" 
                        value={formData.address}
                        onChange={handleInputChange}
                        error={errors.address}
                      />
                      {errors.address && <ErrorText>{errors.address}</ErrorText>}
                    </FormGroup>
                  </FormRow>
                  
                  <FormRow cols={3}>
                    <FormGroup>
                      <Label htmlFor="city">City</Label>
                      <Input 
                        type="text" 
                        id="city" 
                        name="city" 
                        value={formData.city}
                        onChange={handleInputChange}
                        error={errors.city}
                      />
                      {errors.city && <ErrorText>{errors.city}</ErrorText>}
                    </FormGroup>
                    
                    <FormGroup>
                      <Label htmlFor="state">State</Label>
                      <Select 
                        id="state" 
                        name="state" 
                        value={formData.state}
                        onChange={handleInputChange}
                        error={errors.state}
                      >
                        <option value="">Select State</option>
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                        <option value="Assam">Assam</option>
                        <option value="Bihar">Bihar</option>
                        <option value="Chhattisgarh">Chhattisgarh</option>
                        <option value="Goa">Goa</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Himachal Pradesh">Himachal Pradesh</option>
                        <option value="Jharkhand">Jharkhand</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Kerala">Kerala</option>
                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Manipur">Manipur</option>
                        <option value="Meghalaya">Meghalaya</option>
                        <option value="Mizoram">Mizoram</option>
                        <option value="Nagaland">Nagaland</option>
                        <option value="Odisha">Odisha</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Sikkim">Sikkim</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Tripura">Tripura</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Uttarakhand">Uttarakhand</option>
                        <option value="West Bengal">West Bengal</option>
                        <option value="Delhi">Delhi</option>
                      </Select>
                      {errors.state && <ErrorText>{errors.state}</ErrorText>}
                    </FormGroup>
                    
                    <FormGroup>
                      <Label htmlFor="pincode">PIN Code</Label>
                      <Input 
                        type="text" 
                        id="pincode" 
                        name="pincode" 
                        value={formData.pincode}
                        onChange={handleInputChange}
                        error={errors.pincode}
                      />
                      {errors.pincode && <ErrorText>{errors.pincode}</ErrorText>}
                    </FormGroup>
                  </FormRow>
                </FormSection>
                
                {/* Payment Information */}
                <FormSection visible={currentStep === 2}>
                  <SectionTitle>Payment Method</SectionTitle>
                  
                  <RadioGroup>
                    <RadioOption selected={formData.paymentMethod === 'card'}>
                      <Radio 
                        type="radio" 
                        id="card" 
                        name="paymentMethod" 
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={handleInputChange}
                      />
                      <RadioLabel>Credit / Debit Card</RadioLabel>
                      <RadioDescription>Visa, Mastercard, RuPay</RadioDescription>
                    </RadioOption>
                    
                    <RadioOption selected={formData.paymentMethod === 'upi'}>
                      <Radio 
                        type="radio" 
                        id="upi" 
                        name="paymentMethod" 
                        value="upi"
                        checked={formData.paymentMethod === 'upi'}
                        onChange={handleInputChange}
                      />
                      <RadioLabel>UPI Payment</RadioLabel>
                      <RadioDescription>Google Pay, PhonePe, Paytm</RadioDescription>
                    </RadioOption>
                    
                    <RadioOption selected={formData.paymentMethod === 'cod'}>
                      <Radio 
                        type="radio" 
                        id="cod" 
                        name="paymentMethod" 
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={handleInputChange}
                      />
                      <RadioLabel>Cash on Delivery</RadioLabel>
                      <RadioDescription>Pay when you receive</RadioDescription>
                    </RadioOption>
                  </RadioGroup>
                  
                  {formData.paymentMethod === 'card' && (
                    <div style={{ marginTop: '20px' }}>
                      <FormGroup>
                        <Label htmlFor="cardName">Name on Card</Label>
                        <Input 
                          type="text" 
                          id="cardName" 
                          name="cardName" 
                          value={formData.cardName}
                          onChange={handleInputChange}
                          error={errors.cardName}
                        />
                        {errors.cardName && <ErrorText>{errors.cardName}</ErrorText>}
                      </FormGroup>
                      
                      <FormGroup style={{ marginTop: '15px' }}>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input 
                          type="text" 
                          id="cardNumber" 
                          name="cardNumber" 
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          error={errors.cardNumber}
                          placeholder="XXXX XXXX XXXX XXXX"
                        />
                        {errors.cardNumber && <ErrorText>{errors.cardNumber}</ErrorText>}
                      </FormGroup>
                      
                      <CardFields>
                        <ExpiryAndCvv>
                          <FormGroup>
                            <Label htmlFor="expiryMonth">Expiry Month</Label>
                            <Select 
                              id="expiryMonth" 
                              name="expiryMonth" 
                              value={formData.expiryMonth}
                              onChange={handleInputChange}
                              error={errors.expiryMonth}
                            >
                              <option value="">MM</option>
                              {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                                <option key={month} value={month.toString().padStart(2, '0')}>
                                  {month.toString().padStart(2, '0')}
                                </option>
                              ))}
                            </Select>
                            {errors.expiryMonth && <ErrorText>{errors.expiryMonth}</ErrorText>}
                          </FormGroup>
                          
                          <FormGroup>
                            <Label htmlFor="expiryYear">Expiry Year</Label>
                            <Select 
                              id="expiryYear" 
                              name="expiryYear" 
                              value={formData.expiryYear}
                              onChange={handleInputChange}
                              error={errors.expiryYear}
                            >
                              <option value="">YYYY</option>
                              {generateYears().map(year => (
                                <option key={year} value={year}>
                                  {year}
                                </option>
                              ))}
                            </Select>
                            {errors.expiryYear && <ErrorText>{errors.expiryYear}</ErrorText>}
                          </FormGroup>
                        </ExpiryAndCvv>
                        
                        <FormGroup>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input 
                            type="password" 
                            id="cvv" 
                            name="cvv" 
                            value={formData.cvv}
                            onChange={handleInputChange}
                            error={errors.cvv}
                            maxLength={4}
                            placeholder="XXX"
                          />
                          {errors.cvv && <ErrorText>{errors.cvv}</ErrorText>}
                        </FormGroup>
                      </CardFields>
                    </div>
                  )}
                  
                  {formData.paymentMethod === 'upi' && (
                    <FormGroup style={{ marginTop: '20px' }}>
                      <Label htmlFor="upiId">UPI ID</Label>
                      <Input 
                        type="text" 
                        id="upiId" 
                        name="upiId" 
                        value={formData.upiId}
                        onChange={handleInputChange}
                        error={errors.upiId}
                        placeholder="username@upi"
                      />
                      {errors.upiId && <ErrorText>{errors.upiId}</ErrorText>}
                    </FormGroup>
                  )}
                </FormSection>
                
                <ButtonContainer>
                  <BackButton 
                    onClick={handleBackStep}
                    disabled={currentStep === 1}
                  >
                    Back
                  </BackButton>
                  
                  <NextButton
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextStep}
                  >
                    {currentStep === 2 ? 'Place Order' : 'Continue'}
                  </NextButton>
                </ButtonContainer>
              </CheckoutForm>
            </div>
            
            <OrderSummary>
              <SummaryTitle>Order Summary</SummaryTitle>
              
              <OrderItems>
                {cartItems.map(item => (
                  <OrderItem key={item.id}>
                    <ItemInfo>
                      <ItemName>{item.name} × {item.quantity}</ItemName>
                      <ItemMeta>Size: {item.size} | Color: {item.color}</ItemMeta>
                    </ItemInfo>
                    <ItemPrice>₹{(item.price * item.quantity).toLocaleString()}</ItemPrice>
                  </OrderItem>
                ))}
              </OrderItems>
              
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
              
              <SummaryTotal>
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </SummaryTotal>
            </OrderSummary>
          </>
        ) : (
          <SuccessContainer
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <SuccessIcon>✓</SuccessIcon>
            <SuccessTitle>Order Placed Successfully!</SuccessTitle>
            <SuccessText>
              Thank you for your order. We've received your payment and will process your order shortly.
              You will receive an email confirmation with your order details.
            </SuccessText>
            <OrderNumber>Order Number: {orderNumber}</OrderNumber>
            
            <ButtonGroup>
              <PrimaryButton to="/shop">Continue Shopping</PrimaryButton>
              <SecondaryButton to="/account/orders">View Orders</SecondaryButton>
            </ButtonGroup>
          </SuccessContainer>
        )}
      </CheckoutContent>
    </CheckoutContainer>
  );
};

export default Checkout;