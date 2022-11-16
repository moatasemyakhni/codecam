import { Text, View, Image, ScrollView } from 'react-native'
import React from 'react'
import { styles } from './styles'
import BigIconButton from '../../components/Buttons/BigIconButton'
import EditPenIcon from '../../../assets/images/icons/EditPenIcon'
import ShareIcon from '../../../assets/images/icons/ShareIcon'
import AboutUsIcon from '../../../assets/images/icons/AboutUsIcon'
import ExitIcon from '../../../assets/images/icons/ExitIcon'


export const Setting = (props) => {

  const handleEdit = () => {
    props.navigation.navigate('EditProfile')
    console.log("edit")
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
        <BigIconButton onPress={() => console.log("Share")} title={'Share the app'} Icon={ShareIcon} />
        <BigIconButton onPress={() => console.log("about")} title={'About us'} Icon={AboutUsIcon} />
        <BigIconButton onPress={() => console.log("logout")} title={'Logout'} Icon={ExitIcon} />
      </View>
      </ScrollView>

      
    </View>
  )
}


export default Setting