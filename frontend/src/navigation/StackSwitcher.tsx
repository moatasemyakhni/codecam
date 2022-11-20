import React, {useEffect} from 'react';
import AuthStack from './AuthStack';
import MainStack from './MainStack';

import { store } from '../redux/store';
import { useSelector } from 'react-redux';
import { useColorScheme } from 'react-native';
import { toggleTheme } from '../redux/slices/themeSlice';
import { NavigationContainer } from "@react-navigation/native";



const StackSwitcher = () => {
    const user = useSelector((state) => state?.user);
    const currentTheme = useColorScheme();

    useEffect(() => {
        store.dispatch(toggleTheme(currentTheme))
    }, [])
    return user?.userProfile ? <NavigationContainer><MainStack /></NavigationContainer> : <AuthStack /> 
}

export default StackSwitcher