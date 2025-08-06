import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { 
  CView, 
  CText, 
  CButton, 
  CInput, 
  CCard, 
  CIcon 
} from './index';
import { ScreenWrapper } from '../ScreenWrapper';

/**
 * Demo screen showcasing the Core Component System
 * This is for development/testing purposes only
 */
export default function CoreComponentDemo() {
  const [inputValue, setInputValue] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <ScreenWrapper>
      <ScrollView showsVerticalScrollIndicator={false}>
        <CView padding={4}>
          {/* Header */}
          <CView center marginBottom={4}>
            <CText variant="h1" color="primary" center>
              Core Component Demo
            </CText>
            <CText variant="body" color="textSecondary" center>
              EchoReads responsive component system
            </CText>
          </CView>

          {/* Typography Demo */}
          <CCard variant="elevated" marginBottom={3}>
            <CText variant="h2" marginBottom={2}>Typography</CText>
            <CText variant="h3" marginBottom={1}>Heading 3</CText>
            <CText variant="body" marginBottom={1}>Body text example</CText>
            <CText variant="bodySmall" marginBottom={1}>Small body text</CText>
            <CText variant="caption" color="textSecondary">Caption text</CText>
          </CCard>

          {/* Button Demo */}
          <CCard variant="elevated" marginBottom={3}>
            <CText variant="h2" marginBottom={2}>Buttons</CText>
            
            <CButton 
              title="Primary Button" 
              variant="primary" 
              marginBottom={1.5}
              fullWidth 
            />
            
            <CButton 
              title="Gradient Button" 
              variant="gradient" 
              marginBottom={1.5}
              fullWidth 
            />
            
            <CView row marginBottom={1.5}>
              <CButton 
                title="Secondary" 
                variant="secondary" 
                size="small"
                marginRight={2}
                flex={1}
              />
              <CButton 
                title="Ghost" 
                variant="ghost" 
                size="small"
                flex={1}
              />
            </CView>

            <CButton
              title="With Icon"
              variant="primary"
              leftIcon={<CIcon name="add" color="black" size={4} />}
              fullWidth
            />
          </CCard>

          {/* Input Demo */}
          <CCard variant="elevated" marginBottom={3}>
            <CText variant="h2" marginBottom={2}>Inputs</CText>
            
            <CInput
              label="Email"
              placeholder="Enter your email"
              value={inputValue}
              onChangeText={setInputValue}
              leftIcon={<CIcon name="mail" size={4} color="textSecondary" />}
              marginBottom={2}
              required
            />

            <CInput
              label="Password"
              placeholder="Enter password"
              isPassword
              showPasswordToggle
              variant="rounded"
              marginBottom={2}
            />

            <CInput
              placeholder="Search..."
              variant="underlined"
              leftIcon={<CIcon name="search" size={4} color="primary" />}
            />
          </CCard>

          {/* Icon Demo */}
          <CCard variant="elevated" marginBottom={3}>
            <CText variant="h2" marginBottom={2}>Icons</CText>
            
            <CView row center marginBottom={2}>
              <CIcon name="heart" sizePreset="small" marginRight={2} />
              <CIcon name="star" sizePreset="medium" marginRight={2} />
              <CIcon name="add" sizePreset="large" marginRight={2} />
              <CIcon name="settings" sizePreset="xlarge" />
            </CView>

            <CView row center marginBottom={2}>
              <CIcon 
                name="heart" 
                color="danger" 
                bg="card" 
                shadow 
                marginRight={2}
              />
              <CIcon 
                name="star" 
                color="warning" 
                bg="primary" 
                shadow 
                marginRight={2}
              />
              <CIcon 
                name="thumbs-up" 
                color="success" 
                bg="surface" 
                shadow 
              />
            </CView>
          </CCard>

          {/* Card Variants Demo */}
          <CCard variant="outlined" marginBottom={2}>
            <CText variant="h3" marginBottom={1}>Outlined Card</CText>
            <CText variant="body">This card has a border outline</CText>
          </CCard>

          <CCard variant="gradient" marginBottom={2}>
            <CText variant="h3" marginBottom={1} color="black">Gradient Card</CText>
            <CText variant="body" color="black">This card has a gradient background</CText>
          </CCard>

          {/* Interactive Elements */}
          <CCard 
            variant="elevated" 
            onPress={() => console.log('Card pressed!')}
            marginBottom={3}
          >
            <CView row center>
              <CIcon name="touch-app" marginRight={2} />
              <CText variant="h3">Pressable Card</CText>
            </CView>
            <CText variant="body" marginTop={1}>
              This card is interactive - tap me!
            </CText>
          </CCard>

          {/* Layout Demo */}
          <CView bg="surface" padding={3} borderRadius={3} marginBottom={3}>
            <CText variant="h2" marginBottom={2}>Layout System</CText>
            
            <CView row marginBottom={2}>
              <CView bg="primary" padding={2} borderRadius={2} flex={1} marginRight={1}>
                <CText color="black" center>Flex 1</CText>
              </CView>
              <CView bg="secondary" padding={2} borderRadius={2} flex={2} marginLeft={1}>
                <CText color="black" center>Flex 2</CText>
              </CView>
            </CView>

            <CView center>
              <CText variant="caption">Centered content</CText>
            </CView>
          </CView>

          {/* Responsive Demo */}
          <CView bg="card" padding={3} borderRadius={3}>
            <CText variant="h2" marginBottom={2}>Responsive Sizing</CText>
            <CText variant="body" marginBottom={2}>
              All components use responsive percentages for consistent scaling
            </CText>
            
            <CView row marginBottom={2}>
              <CView bg="primary" widthPercent={25} height={60} marginRight={1} borderRadius={2} />
              <CView bg="secondary" widthPercent={50} height={60} marginRight={1} borderRadius={2} />
              <CView bg="success" widthPercent={20} height={60} borderRadius={2} />
            </CView>
            
            <CText variant="caption" color="textSecondary">
              25%, 50%, and 20% width respectively
            </CText>
          </CView>
        </CView>
      </ScrollView>
    </ScreenWrapper>
  );
}