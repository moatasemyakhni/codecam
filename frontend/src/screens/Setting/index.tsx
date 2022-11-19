import * as SMS from 'expo-sms';
import React, {useState} from 'react';
import * as Linking from 'expo-linking';
import Prompt from '../../components/Prompt';
import ExitIcon from '../../../assets/images/icons/ExitIcon';
import ShareIcon from '../../../assets/images/icons/ShareIcon';
import AboutUsIcon from '../../../assets/images/icons/AboutUsIcon';
import EditPenIcon from '../../../assets/images/icons/EditPenIcon';
import BigIconButton from '../../components/Buttons/BigIconButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Text, View, Image, ScrollView, Alert } from 'react-native';
import { styles } from './styles';
import { colors } from '../../constants/palette';
import { store } from '../../redux/store';
import { useSelector } from 'react-redux';
import { deleteUser } from '../../redux/slices/userSlice';
import { shareGithubLink, linkedInLink } from '../../constants/utilities';


export const Setting = (props) => {
  const [visibleShare, setVisibleShare] = useState(false);
  const [visibleAbout, setVisibleAbout] = useState(false);
  const [visibleLogout, setVisibleLogout] = useState(false);

  const {userProfile} = useSelector(state => state.user);

  const handleEdit = () => {
    props.navigation.navigate('EditProfile');
  }

  const handleShare = async () => {
    try {
      const isAvailable = await SMS.isAvailableAsync();
      if (isAvailable) {
        
        await SMS.sendSMSAsync(
          [],
          `Discover CodeCam where dead written code is turned alive and executable!:\n${shareGithubLink}`,
        );
      }else {
        Alert.alert("Something wrong happened");
      }
    } catch (error) {
        Alert.alert("Something wrong happened");
    }
  }

  const handleAboutUs = () => {
    Linking.openURL(`${linkedInLink}`);
  }

  const handleLogout = async () => {
    try {
      store.dispatch(deleteUser());
      await AsyncStorage.removeItem('token');
    } catch (error) {
      Alert.alert("Something went wrong");
    }
  }
  
  return (
    <View style={styles.container}>
      <ScrollView>
      {
        <Image 
          source={{ 
            uri: userProfile.profileImage,
            }}
          style={styles.image}
        />
      }

      <Text style={styles.name}>{userProfile.fullName || 'NA'}</Text>
      <View style={styles.btnGrouping}>
        <BigIconButton onPress={handleEdit} title={'Edit Profile'} Icon={EditPenIcon} />
        <BigIconButton onPress={() => setVisibleShare(true)} title={'Share the app'} Icon={ShareIcon} />
        <BigIconButton onPress={() => setVisibleAbout(true)} title={'About us'} Icon={AboutUsIcon} />
        <BigIconButton onPress={() => setVisibleLogout(true)} title={'Logout'} Icon={ExitIcon} />
      </View>
      </ScrollView>

      <Prompt 
        bgColor={colors.green} 
        color={colors.green} 
        title='Share App' 
        description={'Do you want to move to messages?'} 
        label='Share' 
        onSuccessMessage={'move to messages'} 
        setVisiblePrompt={setVisibleShare} 
        visiblePrompt={visibleShare} 
        onAction={handleShare} 
      />

      <Prompt 
        bgColor={colors.blue} 
        color={colors.blue} 
        title='About Us' 
        description={'Do you want to move to LinkedIn?'} 
        label='Linkedin' 
        onSuccessMessage={'move to LinkedIn'} 
        setVisiblePrompt={setVisibleAbout}
        visiblePrompt={visibleAbout} 
        onAction={handleAboutUs}
      />

      <Prompt 
        bgColor={colors.red} 
        color={colors.red} 
        title='Logout' 
        description={'Do you want to Logout?'} 
        label='Logout'
        onSuccessMessage={'Logout Successfully'} 
        setVisiblePrompt={setVisibleLogout}
        visiblePrompt={visibleLogout} 
        onAction={handleLogout} 
      />
    </View>
  )
}


export default Setting