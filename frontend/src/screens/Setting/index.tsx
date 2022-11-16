import { Text, View, Image, ScrollView, Alert } from 'react-native'
import React, {useState} from 'react'
import { styles } from './styles'
import BigIconButton from '../../components/Buttons/BigIconButton'
import EditPenIcon from '../../../assets/images/icons/EditPenIcon'
import ShareIcon from '../../../assets/images/icons/ShareIcon'
import AboutUsIcon from '../../../assets/images/icons/AboutUsIcon'
import ExitIcon from '../../../assets/images/icons/ExitIcon'
import * as SMS from 'expo-sms';
import { shareGithubLink, linkedInLink } from '../../constants/utilities';
import * as Linking from 'expo-linking';
import Prompt from '../../components/Prompt'
import { colors } from '../../constants/palette'


export const Setting = (props) => {
  const [visibleShare, setVisibleShare] = useState(false);
  const [visibleAbout, setVisibleAbout] = useState(false);
  const [visibleLogout, setVisibleLogout] = useState(false);

  const handleEdit = () => {
    props.navigation.navigate('EditProfile')
    console.log("edit")
  }

  const handleShare = async () => {
    // setVisibleShare(true);
    
    
    console.log("Share");
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      console.log("HEY");
      
      await SMS.sendSMSAsync(
        [],
        `Discover CodeCam where dead written code is turned alive and executable!:\n${shareGithubLink}`,
      );
    } else {
      Alert.alert("Something wrong happened");
    }
    
  }

  const handleAboutUs = () => {
    // setVisibleAbout(true);
    console.log(visibleLogout);
    Linking.openURL(`${linkedInLink}`);
  }

  const handleLogout = () => {
    // setVisibleLogout(true);
    console.log("Logout");
    
  }
  
  return (
    <View style={styles.container}>
      <ScrollView>
      {
        !props.imgSource?
          <Image 
          source={ 
            require('../../../assets/images/icons/default-profile.png')
          }
          style={styles.image}
          />
        :
        <Image 
          source={{ 
            uri: props.imgSource,
            }}
        />
      }

      <Text style={styles.name}>{props.name || 'John Smith'}</Text>
      <View style={styles.btnGrouping}>
        <BigIconButton onPress={handleEdit} title={'Edit Profile'} Icon={EditPenIcon} />
        <BigIconButton onPress={() => setVisibleShare(true)} title={'Share the app'} Icon={ShareIcon} />
        <BigIconButton onPress={() => setVisibleAbout(true)} title={'About us'} Icon={AboutUsIcon} />
        <BigIconButton onPress={() => setVisibleLogout(true)} title={'Logout'} Icon={ExitIcon} />
      </View>
      </ScrollView>

      <Prompt bgColor={colors.green} color={colors.green} title='Share App' description={'Do you want to move to messages?'} label='Share' onSuccessMessage={'move to messages'} setVisiblePrompt={setVisibleShare} visiblePrompt={visibleShare} onAction={handleShare} />

      <Prompt bgColor={colors.blue} color={colors.blue} title='About Us' description={'Do you want to move to LinkedIn?'} label='Linkedin' onSuccessMessage={'move to LinkedIn'} setVisiblePrompt={setVisibleAbout} visiblePrompt={visibleAbout} onAction={handleAboutUs}/>

      <Prompt bgColor={colors.red} color={colors.red} title='Logout' description={'Do you want to Logout?'} label='Logout' onSuccessMessage={'Logout Successfully'} setVisiblePrompt={setVisibleLogout} visiblePrompt={visibleLogout} onAction={handleLogout} />
    </View>
  )
}


export default Setting