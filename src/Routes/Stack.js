import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import HomeScreen from '../Screens/HomeScreen';
import ChooseNicknameScreen from '../Screens/ChooseNicknameScreen';
import GameScreen from '../Screens/GamesScreen';
import UnityScreen from '../Screens/UnityScreen';
import GoToStationScreen from '../Screens/GoToStationScreen';
import LeaveStationScreen from '../Screens/LeaveStationScreen';

const screens = {
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    ChooseNickname: {
        screen: ChooseNicknameScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    Game: {
        screen: GameScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    Unity: {
        screen: UnityScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    GoToStation: {             //only for testing purpose
        screen: GoToStationScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    LeaveStation: {            //only for testing purpose
        screen: LeaveStationScreen,
        navigationOptions: {
            headerShown: false
        }
    }
}

const stack = createStackNavigator(screens);

export default createAppContainer(stack);