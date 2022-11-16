import React, { useEffect, useRef, useState } from 'react';
import { Text, View, Image, Alert, TouchableOpacity, Dimensions } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import LibraryIcon from '../../../assets/images/icons/LibraryIcon';

import * as ImagePicker from 'expo-image-picker';
import {ImagePickerOptions} from 'expo-image-picker';

import { getExtensionFromFilePath } from '../../constants/utilities';
import { styles } from './styles';
import FullWidthButton from '../../components/Buttons/FullWidthButton';
import Input from '../../components/Inputs';

   



const EditProfile = (props) => {
    const [image, setImage] = useState(null);
    const [extension, setExtension] = useState(null);
 useEffect(() => {
        (async () => {
            // request permission to get to library
            MediaLibrary.requestPermissionsAsync();
 })();
    }, []);

    const pickImage = async () => {
        try {
            const options: ImagePickerOptions = {
                mediaTypes:  ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                base64: true,
                exif: false,
                quality: 1,
            }
            const result = await ImagePicker.launchImageLibraryAsync(options);
            if(!result.cancelled) {
                setImage(result['uri']);
                setExtension(getExtensionFromFilePath(result['uri']))
            }
        } catch (error) {
            console.log(error);
            
            Alert.alert("Something Wrong happened")
        }
    }

  return (
    <View style={styles.container}>
        <TouchableOpacity activeOpacity={0.95} onPress={pickImage}>
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
        </TouchableOpacity>
      <Input label='FullName' placeholder='FullName...' />
      <View style={styles.btnContainer}>
        <View style={styles.btnWrapper}>
            <FullWidthButton BGGreen enabled title='UPDATE' />
        </View>
      </View>

      
    </View>
  )
}

export default EditProfile