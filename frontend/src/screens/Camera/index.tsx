import Toast from 'react-native-root-toast';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import LogoXL from '../../../assets/images/logos/LogoXL';
import React, { useEffect, useRef, useState } from 'react';
import IconButton from '../../components/Buttons/IconButton';
import CheckIcon from '../../../assets/images/icons/CheckIcon';
import CameraIcon from '../../../assets/images/icons/CameraIcon';
import LoadingComponent from '../../components/LoadingComponent';
import HistoryIcon from '../../../assets/images/icons/HistoryIcon';
import LibraryIcon from '../../../assets/images/icons/LibraryIcon';
import DeleteWithBorderIcon from '../../../assets/images/icons/DeleteWithBorderIcon';

import { 
    Text, 
    View, 
    Image, 
    Alert, 
    TouchableOpacity
} from 'react-native';
import { 
    Camera, 
    CameraType,
    CameraPictureOptions, 
    FlashMode,
    
} from 'expo-camera';
import { styles } from './styles';
import { colors } from '../../constants/palette';
import { ImagePickerOptions } from 'expo-image-picker';
import { textDetection } from '../../api/user/userApi';
import { useIsFocused } from '@react-navigation/native';
import { getExtensionFromFilePath } from '../../constants/utilities';


const CameraScreen = ({navigation}) => {
    const [hasCameraPermissions, setHasCameraPermissions] = useState(null);
    const [image, setImage] = useState(null);
    const [base64Image, setBase64Image] = useState(null);
    const [extension, setExtension] = useState(null);
    //type of camera (front or back camera)
    const [type, setType] = useState(CameraType.back);
    const [flash, setFlash] = useState(FlashMode.off);
    const cameraRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const isFocused = useIsFocused();

    useEffect(() => {
        (async () => {
            // request permission to get to library
            MediaLibrary.requestPermissionsAsync();
            // request permission to use camera
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            // if granted then true else it will be false
            setHasCameraPermissions(cameraStatus.status === 'granted');
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
                setBase64Image(result['base64'])
                setExtension(getExtensionFromFilePath(result['uri']))
            }
        } catch (error) {
            Alert.alert("Something Wrong happened");
        }
    }

    const [endOfProgress, setEndOfProgressBar] = useState(false);

    const takePicture = async () => {
        if(cameraRef) {
            try {
                const options: CameraPictureOptions = {
                    quality: 1,// highest quality
                    base64: true,
                    exif: true,
                }
                const data = await cameraRef.current.takePictureAsync(options);
                setImage(data.uri);
                setBase64Image(data.base64);
                setExtension(getExtensionFromFilePath(data.uri))
                
            } catch (error) {
                Alert.alert("Something Wrong happened");
                
            }
        }
    }

    if(!hasCameraPermissions) {
        return (
            <View style={styles.permissionDeniedContainer}>
                <LogoXL />
                <Text style={styles.deniedPermissionText}>Camera Permission Needed</Text>
            </View>
        )
    }

    const moveToCode = async () => {
        try {
            setLoading(true);
            const defaultSnippetName = 'Snippet1';
            const img = `data:image/${extension};base64,${base64Image}`;
            
            const textResponse = await textDetection({
                base64Image: img,
                fullName: defaultSnippetName,
            });
            
            setEndOfProgressBar(true);

            if(textResponse.error) {
                Toast.show(textResponse.message, {
                    duration: Toast.durations.LONG,
                });
                setImage(null);
                return;
            }
            const codeTextContent = textResponse.detection;
            const defaultProgrammingLanguage = 'PYTHON3';
            
            navigation.navigate('RunCode', {
                photoSnippetName: defaultSnippetName, 
                textContent: codeTextContent,
                language: defaultProgrammingLanguage, 
                photoId: '', 
                newPhoto: true,
                base64Photo: img, //specific for new photos
            });
        } catch (error) {
            Toast.show(error.message, {
                duration: Toast.durations.LONG,
            });
        } finally {
            setImage(null);
            setLoading(false);
            setEndOfProgressBar(false);
        }
        
    }
 
    return (
        <View style={styles.container}>
        {/* if image is not taken or rejected show camera */}
            
            {loading?
                    <LoadingComponent
                        endOfProgress={endOfProgress}
                        title='Scanning' 
                    />
            : 
            
            !image && isFocused ?
                <Camera
                    style={styles.camera}
                    type={type}
                    flashMode={flash}
                    ref={cameraRef}
                    
                >
                    <View style={styles.topContainer} >
                        
                        <IconButton 
                            icon='retweet'
                            onPress={() => setType(type === CameraType.back?CameraType.front : CameraType.back)}
                            title="flip"
                        />

                        <IconButton 
                            icon='flash'
                            color={flash === FlashMode.on ? colors.primary: colors.white}
                            onPress={() => setFlash(flash === FlashMode.off? FlashMode.on : FlashMode.off)}
                            title='flash'
                        
                        /> 
                    </View>
                </Camera>
                :
                // else show image with the accept/reject buttons
                <Image 
                    source={{ uri: image }}
                    style={styles.camera}
                    
                />
            }
            <View style={styles.bottomContainer}>
                {loading?
                null
                :
                image?
                    <View style={styles.bottomContainerContentWrapper}>
                        <View style={styles.bottomContainerButtonsWrapper}>
                            {/* reject button */}
                          <TouchableOpacity style={ styles.icon } onPress={() => setImage(null)}>
                              <DeleteWithBorderIcon />
                          </TouchableOpacity>
                            {/* accept button */}
                          <TouchableOpacity onPress={moveToCode}>
                              <CheckIcon />
                          </TouchableOpacity>
                        </View>
                    </View>
                    :
                    loading?
                        null
                    :
                    <View style={styles.bottomContainerButtonsWrapper}>
                        {/* library button */}
                        <TouchableOpacity style={ styles.icon } onPress={pickImage}>
                            <LibraryIcon />
                            <Text style={ styles.iconLabelText }>Library</Text>
                        </TouchableOpacity>

                        {/* camera button */}
                        <TouchableOpacity onPress={takePicture}>
                            <CameraIcon />
                        </TouchableOpacity>

                        {/* history button */}
                        <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('History')}>
                            <HistoryIcon />
                            <Text style={styles.iconLabelText} >History</Text>
                        </TouchableOpacity>

                    </View>
                }
                
            </View>
        </View>
    )
}

export default CameraScreen;
