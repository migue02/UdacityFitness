import React from 'react';
import History from './components/History'
import AddEntry from './components/AddEntry'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Ionicons } from '@expo/vector-icons'
import { purple, white } from './utils/colors';
import { FontAwesome } from '@expo/vector-icons'
import { StatusBar, View } from 'react-native';
import Constants from 'expo-constants';
import { createStackNavigator } from '@react-navigation/stack';
import EntryDetail from './components/EntryDetail'
import Live from './components/Live'
import { setLocalNotification } from './utils/helpers'

const Stack = createStackNavigator();

const RouteConfigs = {
  History:{
    name: "History",
    component: History,
    options: {tabBarIcon: ({tintColor}) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />, title: 'History'}
  },
  AddEntry:{
    component: AddEntry,
    name: "Add Entry",
    options: {tabBarIcon: ({tintColor}) => <FontAwesome name='plus-square' size={30} color={tintColor} />, title: 'Add Entry'}
  },
  Live:{
    component: Live,
    name: "Live",
    options: {tabBarIcon: ({tintColor}) => <Ionicons name='ios-speedometer' size={30} color={tintColor} />, title: 'Live'}
  }
}

const TabNavigatorConfig = {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === "ios" ? purple : white,
    style: {
      height: Platform.OS === "ios" ? 80 : 56,
      backgroundColor: Platform.OS === "ios" ? white : purple,
      shadowColor: "rgba(0, 0, 0, 0.24)",
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
};

function UdaciStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tab = Platform.OS === 'ios'
        ? createBottomTabNavigator()
        : createMaterialTopTabNavigator()

const Tabs = () => (
    <Tab.Navigator {...TabNavigatorConfig}>
        <Tab.Screen {...RouteConfigs['History']} />
        <Tab.Screen {...RouteConfigs['AddEntry']} />
        <Tab.Screen {...RouteConfigs['Live']} />
    </Tab.Navigator>
)
const MainNav = () => (
    <Stack.Navigator headerMode="screen">
        <Stack.Screen
            name="Home"
            component={Tabs}
            options={{headerShown: false}}/>
        <Stack.Screen
            name="EntryDetail"
            component={EntryDetail}
            options={{
                headerTintColor: white, headerStyle: {
                    backgroundColor: purple,
                }
            }}/>
    </Stack.Navigator>
);

export default class App extends React.Component {

  componentDidMount() {
    setLocalNotification()
  }

  render() {
    return (
        <Provider store={createStore(reducer)}>
            <View style={{flex: 1}}>
                <NavigationContainer>
                    <UdaciStatusBar backgroundColor={purple} barStyle="light-content"/>
                    <MainNav/>
                </NavigationContainer>
            </View>
        </Provider>
    );
  }
}
