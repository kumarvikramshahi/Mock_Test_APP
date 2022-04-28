/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { MaterialCommunityIcons, MaterialIcons, Ionicons, FontAwesome, Feather, Entypo } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable, StyleSheet,View } from 'react-native';
import { HStack } from 'native-base';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import Home from '../screens/User/Home';
import Practise from '../screens/User/Practise';
import Contest from '../screens/User/Contest';
import Profile from '../screens/User/Profile';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      {/* <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Search" component={Search} />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Wishlist" component={Wishlist} />
      </Stack.Group> */}
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  const bottomTabItem = [
    {
      name: "Home",
      title: "BPL",
      icon1: <MaterialCommunityIcons size={28} style={styles.icon} name="home-outline" color={Colors[colorScheme].text} />,
      icon2: <MaterialCommunityIcons size={34} style={styles.icon} name="home-outline" color={Colors[colorScheme].text} />,
      comp: Home
    },
    {
      name: "Practise",
      title: "Practise",
      icon1: <Entypo name="book" size={28} style={styles.icon} color={Colors[colorScheme].text} />,
      icon2: <Entypo name="book" size={34} style={styles.icon} color={Colors[colorScheme].text} />,
      comp: Practise
    },
    {
      name: "Contest",
      title: "Contest",
      icon1: <MaterialCommunityIcons size={28} style={styles.icon} name="run-fast" color={Colors[colorScheme].text} />,
      icon2: <MaterialCommunityIcons size={34} style={styles.icon} name="run-fast" color={Colors[colorScheme].text} />,
      comp: Contest
    },
    {
      name: "Profile",
      title: "Profile",
      icon1: <MaterialCommunityIcons name="face-profile" size={28} style={styles.icon} color={Colors[colorScheme].text} />,
      icon2: <MaterialCommunityIcons name="face-profile" size={34} style={styles.icon} color={Colors[colorScheme].text} />,
      comp: Profile
    }
  ]

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      {
        bottomTabItem.map((item, idx) =>
          <BottomTab.Screen
            key={idx}
            name={item.name}
            component={item.comp}
            height={30}
            options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
              tabBarStyle: { height: 58 },
              headerTitle: item.title,
              tabBarLabel: item.name,
              tabBarLabelStyle: { fontSize: 13, marginBottom: 6 },
              tabBarIcon: ({ focused }) => focused ? item.icon2 : item.icon1,
            })}
          />
        )}
    </BottomTab.Navigator>
  );
}

// headerRight: () => (
//   <HStack>
//     <Pressable
//       onPress={() => navigation.navigate('Search')}
//       style={({ pressed }) => ({
//         opacity: pressed ? 0.5 : 1,
//       })}>
//       <Ionicons
//         name="ios-search-outline"
//         size={25}
//         color={Colors[colorScheme].text}
//         style={{ marginRight: 15 }}
//       />
//     </Pressable>
//     <Pressable
//       onPress={() => navigation.navigate('Wishlist')}
//       style={({ pressed }) => ({
//         opacity: pressed ? 0.5 : 1,
//       })}>
//       <Feather name="bookmark" size={25} style={{ marginRight: 15 }} color={Colors[colorScheme].text} />
//     </Pressable>
//   </HStack>
// ),

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
// function TabBarIcon(props: {
//   name: React.ComponentProps<typeof FontAwesome>['name'];
//   color: string;
// }) {
//   return <FontAwesome size={30} style={styles.icon} {...props} />;
// }


const styles = StyleSheet.create({
  icon: {
    marginBottom: -8
  },
});