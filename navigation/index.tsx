import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import Home from '../screens/Home/Home';
import Practise from '../screens/Practice';
// import Contest from '../screens/Contest/Contest';
import Profile from '../screens/Profile/Profile';
import Instructions from '../screens/Practice/Instructions';
import ExamScreen from '../screens/Practice/ExamScreen';
import Evaluation from '../screens/Home/Evaluation';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// Root stack navigator -> for displaying modals on top of all other content.
// refer https://reactnavigation.org/docs/modal

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Instructions" component={Instructions} options={{ headerShown: false }} />
        <Stack.Screen name="ExamScreen" component={ExamScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Evaluation" component={Evaluation} options={{ title: 'Its Result Time 😰' }} />
      </Stack.Group>
      {/* <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Wishlist" component={Wishlist} />
      </Stack.Group> */}
    </Stack.Navigator>
  );
}

// Bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
// refer https://reactnavigation.org/docs/bottom-tab-navigator
 
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  const bottomTabItem = [
    {
      name: "Home",
      title: "Baba Group",
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
    // {
    //   name: "Contest",
    //   title: "Contest",
    //   icon1: <MaterialCommunityIcons size={28} style={styles.icon} name="run-fast" color={Colors[colorScheme].text} />,
    //   icon2: <MaterialCommunityIcons size={34} style={styles.icon} name="run-fast" color={Colors[colorScheme].text} />,
    //   comp: Contest
    // },
    {
      name: "Profile",
      title: "Profile",
      icon1: <MaterialCommunityIcons name="face-man-profile" size={28} style={styles.icon} color={Colors[colorScheme].text} />,
      icon2: <MaterialCommunityIcons name="face-man-profile" size={34} style={styles.icon} color={Colors[colorScheme].text} />,
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