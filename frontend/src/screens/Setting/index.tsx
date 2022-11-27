import * as SMS from 'expo-sms';
import React, {useState} from 'react';
import * as Linking from 'expo-linking';
import Prompt from '../../components/Prompt';
import ExitIcon from '../../../assets/images/icons/ExitIcon';
import ShareIcon from '../../../assets/images/icons/ShareIcon';
import AboutUsIcon from '../../../assets/images/icons/AboutUsIcon';
import EditPenIcon from '../../../assets/images/icons/EditPenIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonIconToLeft from '../../components/Buttons/ButtonIconToLeft';

import { 
  Text, 
  View, 
  Image,  
  Alert,
  ScrollView,
} from 'react-native';
import { styles } from './styles';
import { useSelector } from 'react-redux';
import { Entypo } from '@expo/vector-icons';
import { colors } from '../../constants/palette';
import { RootState, store } from '../../redux/store';
import { deleteUser } from '../../redux/slices/userSlice';
import { toggleTheme } from '../../redux/slices/themeSlice';
import { shareGithubLink, linkedInLink } from '../../constants/utilities';


export const Setting = ({navigation}) => {
  const [visibleShare, setVisibleShare] = useState(false);
  const [visibleAbout, setVisibleAbout] = useState(false);
  const [visibleLogout, setVisibleLogout] = useState(false);

  const {userProfile} = useSelector((state: RootState) => state.user);
  const {theme} = useSelector((state: RootState) => state.ui);

  const handleEdit = () => {
    navigation.navigate('EditProfile');
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

  const changeTheme = () => {

    theme === 'dark'?
      store.dispatch(toggleTheme({
        theme: 'light',
      }))
    :
      store.dispatch(toggleTheme({
        theme: 'dark',
      }))
  }
  
  return (
    <View style={[
      styles.container,
      theme==='dark'?
        styles.containerDarkMode
      :
        styles.containerLightMode
    ]}>
      <ScrollView>
        <View style={styles.themeIcon}>
        {
          theme==='dark'?
            <ButtonIconToLeft
              onPress={changeTheme}
              Icon={() => <Entypo color={colors.yellow} name={'moon'} size={20} />}
            />
          :
            <ButtonIconToLeft
              onPress={changeTheme}
              Icon={() => <Entypo color={colors.primary} name={'light-up'} size={20} />}
            />
        }
        </View>
      {
        <Image 
          source={{ 
            uri: userProfile.profileImage,
            }}
          style={styles.image}
        />
      }

      <Text style={[
        styles.name,
        theme==='dark'?
          styles.textDarkMode
        :
          styles.textLightMode
        ]}>{userProfile.fullName || 'NA'}</Text>
      <View style={[styles.btnGrouping, theme==='dark'? styles.borderTextDarkMode: styles.borderTextLightMode]}>
        <ButtonIconToLeft
          onPress={handleEdit}
          text={'Edit Profile'}
          Icon={EditPenIcon}
          styleContainer={[
          styles.bgIconBtn,
          theme==='dark'?
            styles.borderTextDarkMode
          :
            styles.borderTextLightMode
          ]}
          styleText={[ 
            styles.bgIconText,
            theme==='dark'?
              styles.textDarkMode
            : 
              styles.textLightMode
            ]}
        />
        <ButtonIconToLeft
          onPress={() => setVisibleShare(true)}
          text={'Share the app'}
          Icon={ShareIcon}
          styleContainer={[
          styles.bgIconBtn,
          theme==='dark'?
            styles.borderTextDarkMode
          :
            styles.borderTextLightMode
          ]}
          styleText={[ 
            styles.bgIconText,
            theme==='dark'?
              styles.textDarkMode
            : 
              styles.textLightMode
            ]}
        />

        <ButtonIconToLeft
          onPress={() => setVisibleAbout(true)}
          text={'About us'}
          Icon={AboutUsIcon}
          styleContainer={[
          styles.bgIconBtn,
          theme==='dark'?
            styles.borderTextDarkMode
          :
            styles.borderTextLightMode
          ]}
          styleText={[ 
            styles.bgIconText,
            theme==='dark'?
              styles.textDarkMode
            : 
              styles.textLightMode
            ]}
        />

        <ButtonIconToLeft
          onPress={() => setVisibleLogout(true)}
          text={'Logout'}
          Icon={ExitIcon}
          styleContainer={[
          styles.bgIconBtn,
          theme==='dark'?
            styles.borderTextDarkMode
          :
            styles.borderTextLightMode
          ]}
          styleText={[ 
            styles.bgIconText,
            theme==='dark'?
              styles.textDarkMode
            : 
              styles.textLightMode
            ]}
        />
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


export default Setting;