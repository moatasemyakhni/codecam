import React, {useEffect} from 'react';
import AuthStack from './AuthStack';
import MainStack from './MainStack';

import { RootState, store } from '../redux/store';
import { useSelector } from 'react-redux';
import { useColorScheme } from 'react-native';
import { toggleTheme } from '../redux/slices/themeSlice';
import { NavigationContainer } from "@react-navigation/native";



const StackSwitcher = () => {
    const user = useSelector((state: RootState) => state?.user);
    const currentTheme = useColorScheme();

    useEffect(() => {
        store.dispatch(
            toggleTheme({
                theme: currentTheme
            })
        );
    }, [])
    return user?.userProfile ? <NavigationContainer><MainStack /></NavigationContainer> : <AuthStack /> 
}

export default StackSwitcher