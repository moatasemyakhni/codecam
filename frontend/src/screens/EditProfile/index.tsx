
import Input from '../../components/Inputs';
import Toast from 'react-native-root-toast';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import * as MediaLibrary from 'expo-media-library';
import FullWidthButton from '../../components/Buttons/FullWidthButton';

import { styles } from './styles';
import { useSelector } from 'react-redux';
import { store } from '../../redux/store';
import {ImagePickerOptions} from 'expo-image-picker';
import { View, Image, TouchableOpacity } from 'react-native';
import { updateUserProfile } from '../../redux/slices/userSlice';
import { editFullName, editProfile } from '../../api/user/userApi';
import { getExtensionFromFilePath } from '../../constants/utilities';


const EditProfile = ({navigation}) => {
    const {userProfile} = useSelector(state => state.user);
    const [enable, setEnable] = useState(false);
    const [fullName, setFullName] = useState(userProfile.fullName);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');

    const handleUpdateName = async () => {
        setEnable(false);
        try {
            const data = {
                fullName: fullName,
            }
            const response = await editFullName(userProfile.userId, data);
            console.log(response);
            if(response.error) {
                setError(true);
                setMessage(response.message);
                return;
            }
            Toast.show(response.message, {
                duration: Toast.durations.LONG,
            })

            store.dispatch(
                updateUserProfile({
                    userProfile: {
                        ...userProfile,
                        fullName: response.newName
                    }
                })
            );

            navigation.pop();
        } catch (error) {
            setError(true);
            setMessage(error.message);
        }
    }

 useEffect(() => {
        (async () => {
            // request permission to get to library
            MediaLibrary.requestPermissionsAsync();
        })();
        setEnable([fullName].every(Boolean));
    }, [fullName]);

    const pickImage = async () => {
        try {
            setEnable(false);
            const options: ImagePickerOptions = {
                mediaTypes:  ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                base64: true,
                exif: false,
                quality: 1,
                aspect: [4, 3],
            }
            const result = await ImagePicker.launchImageLibraryAsync(options);
            if(!result.cancelled) {
                const extension = getExtensionFromFilePath(result['uri'])
                console.log(extension);
                
                const data = {
                    base64Photo: `data:image/${extension};base64,${result['base64']}`
                }
                const response = await editProfile(userProfile.userId, data)
                if(response.error) {
                    Toast.show(response.message, {
                        duration: Toast.durations.LONG,
                    });
                    return;
                }
                store.dispatch(updateUserProfile({
                    userProfile: {
                        ...userProfile,
                        profileImage: response.profilePhoto
                    },
                }))
                Toast.show(response.message, {
                    duration: Toast.durations.LONG,
                });
                navigation.pop();
            }
        } catch (error) {
            console.log(error);
            Toast.show(JSON.stringify(error), {
                duration: Toast.durations.LONG,
            });
        }
    }

  return (
    <View style={styles.container}>
        <TouchableOpacity activeOpacity={0.95} onPress={pickImage}>
        {
            <Image 
                source={{
                    uri: userProfile.profileImage,
                }}
                style={styles.image}
            />
        }
        </TouchableOpacity>
      <Input 
        label='FullName' 
        placeholder='FullName...' 
        setVal={setFullName}
        val={fullName}
        error={error}
        errorMessage={message}
        setMessage={setMessage}
        setError={setError}
        />
      <View style={styles.btnContainer}>
        <View style={styles.btnWrapper}>
            <FullWidthButton 
                BGGreen 
                enabled={enable? true: false}
                title='UPDATE'
                onPress={handleUpdateName}
                />
        </View>
      </View>
    </View>
  )
}

export default EditProfile