import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator, useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { data, windowWidth, windowHeight } from './assets/data/constant'
import VideoItem from './VideoItem'

// console.log(data)
const BottomTab = createBottomTabNavigator();

const HomeScreen = () => {
  const [activeVideoIndex, setActiveVideoIndex] =  useState(0);
  const bottomTabHeight = useBottomTabBarHeight();
  
  return <FlatList 
    data={data}
    pagingEnabled
    renderItem={({ item, index }) => (
      <VideoItem data={item} isActive={activeVideoIndex === index} />
      )}
      onScroll={e => {
        const index= Math.round(e.nativeEvent.contentOffset.y / (windowHeight - bottomTabHeight))
        setActiveVideoIndex(index);
      }}
      
    />;
};

export default function App() {
  return (
    <NavigationContainer>
      <BottomTab.Navigator 
      screenOptions={{
        tabBarStyle: {backgroundColor: 'black'},
        headerShown: false,
        tabBarActiveTintColor: 'white',
      }}>
        <BottomTab.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <Image 
                source= {require('./assets/images/tiktok/home.png')}
                style={[
                  styles.bottomTabIcon,
                  focused && styles.bottomTabIconFocused,
                ]}
              />
            ),
          }}
        />
        <BottomTab.Screen 
          name="Discovery" 
          component={HomeScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <Image 
                source= {require('./assets/images/tiktok/search.png')}
                style={[
                  styles.bottomTabIcon,
                  focused && styles.bottomTabIconFocused,
                ]}
              />
            ),
          }}
        />
        <BottomTab.Screen 
          name="NewVideo" 
          component={HomeScreen}
          options={{
            tabBarLabel: () => null,
            tabBarIcon: ({focused}) => (
              <Image 
                source= {require('./assets/images/tiktok/new-video.png')}
                style={[
                  styles.newVideoButton,
                  focused && styles.bottomTabIconFocused,
                ]}
              />
            ),
          }}
        />
        <BottomTab.Screen 
          name="Profile" 
          component={HomeScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <Image 
                source= {require('./assets/images/tiktok/user.png')}
                style={[
                  styles.bottomTabIcon,
                  focused && styles.bottomTabIconFocused,
                ]}
              />
            ),
          }}
        />
        
        <BottomTab.Screen 
          name="Inbox" 
          component={HomeScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <Image 
                source= {require('./assets/images/tiktok/message.png')}
                style={[
                  styles.bottomTabIcon,
                  focused && styles.bottomTabIconFocused,
                ]}
              />
            ),
          }}
        />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  bottomTabIcon: {
    width: 20,
    height: 20,
    tintColor: 'grey',
  },
  bottomTabIconFocused: {
    tintColor: 'white',
  },
  newVideoButton: {
    width: 48,
    height: 24,
  },
})