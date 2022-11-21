
import Input from '../../components/Inputs';
import Toast from 'react-native-root-toast';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import * as MediaLibrary from 'expo-media-library';
import FullWidthButton from '../../components/Buttons/FullWidthButton';

import { 
    Text, 
    View, 
    Image, 
    Platform,
    ScrollView, 
    TouchableOpacity,  
    KeyboardAvoidingView 
} from 'react-native';
import { styles } from './styles';
import { useSelector } from 'react-redux';
import { RootState, store } from '../../redux/store';
import {ImagePickerOptions} from 'expo-image-picker';
import { updateUserProfile } from '../../redux/slices/userSlice';
import { editFullName, editProfile } from '../../api/user/userApi';
import { getExtensionFromFilePath } from '../../constants/utilities';


const EditProfile = ({navigation}) => {
    const {userProfile} = useSelector((state: RootState) => state.user);
    const [enable, setEnable] = useState(false);
    const [fullName, setFullName] = useState(userProfile.fullName);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');

    const {theme} = useSelector((state: RootState) => state.ui);

    const handleUpdateName = async () => {
        setEnable(false);
        try {
            const data = {
                fullName: fullName,
            }
            const response = await editFullName(userProfile.userId, data);
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
                const extension = getExtensionFromFilePath(result['uri']);
                
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
            Toast.show(JSON.stringify(error), {
                duration: Toast.durations.LONG,
            });
        }
    }

  return (
    <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        enabled 
        style={[
            styles.container,
            theme==='dark'?
             styles.containerDarkMode
             :
             styles.containerLightMode
        ]}
        keyboardVerticalOffset={100}
    > 
        <ScrollView>
            <TouchableOpacity 
                activeOpacity={0.95} 
                onPress={pickImage}
                style={styles.imageWrapper}
            >
                <Text style={[
                    styles.imageText,
                    
                    ]}>Edit</Text>
            
                <Image 
                    source={{
                        uri: userProfile.profileImage,
                    }}
                    style={styles.image}
                />
            
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
      </ScrollView>
    </KeyboardAvoidingView>
    
  )
}

export default EditProfile