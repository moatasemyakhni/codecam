import React from 'react';
import AuthStack from './AuthStack';
import MainStack from './MainStack';

import { useSelector } from 'react-redux'
import { NavigationContainer } from "@react-navigation/native";


const StackSwitcher = () => {
    const user = useSelector((state) => state?.user);

    return user?.userProfile ? <NavigationContainer><MainStack /></NavigationContainer> : <AuthStack /> 
}

export default StackSwitcher