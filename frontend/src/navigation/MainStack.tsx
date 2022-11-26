import React from 'react';
import Header from '../screens/Header';
import History from '../screens/History';
import RunCode from '../screens/RunCode';
import Setting from '../screens/Setting';
import CameraScreen from '../screens/Camera';
import EditProfile from '../screens/EditProfile';
import LogoHorizontalSm from '../../assets/images/logos/LogoHorizontalSm';

import { colors } from '../constants/palette';
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';


const MainStack = () => {
    const StackMain = createStackNavigator();
    const navigation = useNavigation<any>();

    return (
    
        <StackMain.Navigator initialRouteName='Camera'>
            {/* Main environment */}
            <StackMain.Group>
                <StackMain.Screen 
                    name="Camera" 
                    options={{     
                        headerStyle: { backgroundColor: 'black', height: 96},
                        headerTitle: () => (<LogoHorizontalSm />),
                        headerLeft: null,
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            textTransform: 'capitalize',
                            fontSize: 24,
                        },
                        headerTintColor: colors.primary,
                    }}
                >
                    {props => <CameraScreen {...props} />}

                </StackMain.Screen>

                <StackMain.Screen 
                    name='History' 
                    component={History} 
                    options={{ 
                        headerStyle: {backgroundColor: colors.primary, height: 96},
                        headerBackTitleVisible: false,
                        headerTitle: (props) => (
                            <Header {...props} navigation={navigation} title={'History'} />
                        ),
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            textTransform: 'capitalize',
                            fontSize: 24
                        },
                        headerTintColor: colors.white,
                    }} 
                />
                
                <StackMain.Screen  
                    name="RunCode" 
                    component={RunCode} 
                    options={{ 
                        headerStyle: {backgroundColor: colors.primary, height: 96},
                        headerBackTitleVisible: false,
                        headerTitle: (props) => (
                            <Header {...props} navigation={navigation} title={'Code Snippet'} />
                        ),
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            textTransform: 'capitalize',
                            fontSize: 24
                        },
                        headerTintColor: colors.white,
                    }} 
                />
            </StackMain.Group>

            {/* Personal info */}
            <StackMain.Group>
                <StackMain.Screen 
                    name='Setting' 
                    component={ Setting } 
                    options={{ 
                        headerStyle: {backgroundColor: colors.primary, height: 96},
                        headerBackTitleVisible: false,
                        headerTitle: (props) => (
                            <Header {...props} navigation={navigation} title={'Setting'} includeIcon={false} />
                        ),
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            textTransform: 'capitalize',
                            fontSize: 24
                        },
                        headerTintColor: colors.white,
                    }}
                />

                <StackMain.Screen 
                    name='EditProfile' 
                    component={ EditProfile } 
                    options={{ 
                        headerStyle: {backgroundColor: colors.primary, height: 96},
                        headerBackTitleVisible: false,
                        headerTitle: (props) => (
                            <Header {...props} navigation={navigation} title={'Edit Profile'} includeIcon={false} />
                        ),
                        headerTitleStyle: {
                        fontWeight: 'bold',
                        textTransform: 'capitalize',
                        fontSize: 24
                        },
                        headerTintColor: colors.white,
                    }}
                />
            </StackMain.Group>
        </StackMain.Navigator>
    )
}

export default MainStack;