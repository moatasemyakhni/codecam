import React, { useEffect, useRef, useState } from 'react';
import { Text, View, Image, Alert, TouchableOpacity } from 'react-native';
import { Camera, CameraType, CameraPictureOptions, FlashMode } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { styles } from './styles';
import IconButton from '../../components/Buttons/IconButton';
import { colors } from '../../constants/palette';
import LibraryIcon from '../../../assets/images/icons/LibraryIcon';
import CameraIcon from '../../../assets/images/icons/CameraIcon';
import HistoryIcon from '../../../assets/images/icons/HistoryIcon';
import * as ImagePicker from 'expo-image-picker';
import {ImagePickerOptions} from 'expo-image-picker';
import DeleteWithBorderIcon from '../../../assets/images/icons/DeleteWithBorderIcon';
import CheckIcon from '../../../assets/images/icons/CheckIcon';
import LogoXL from '../../../assets/images/logos/LogoXL';


const CameraScreen = (props) => {
    const [hasCameraPermissions, setHasCameraPermissions] = useState(null);
    const [image, setImage] = useState(null);
    const [extension, setExtension] = useState(null);
    //type of camera (front or back camera)
    const [type, setType] = useState(CameraType.back);
    const [flash, setFlash] = useState(FlashMode.off);
    const cameraRef = useRef(null);

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
                base64: false,
                exif: false,
                quality: 1,
            }
            const result = await ImagePicker.launchImageLibraryAsync(options);
            if(!result.cancelled) {
                // console.log(result);
                setImage(result.uri);
                const imageExtensionArr = result.uri.split('.');
                const imageExtension = imageExtensionArr[imageExtensionArr.length - 1];
                setExtension(imageExtension)
                
                // props.globalState.setBase64(result.base64);
                // props.globalState.setBase64(imageExtension);
                // console.log(props.globalState.getBase64, "CAMERA");
                // console.log(props.globalState.getBase64, "CAMERA EXT");
            }
        } catch (error) {
            console.log("saveImage function: ", error);
        }
    }


    const takePicture = async () => {
        if(cameraRef) {
            try {
                const options: CameraPictureOptions = {
                    quality: 1,// highest quality
                    base64: true,
                    exif: false,
                }
                const data = await cameraRef.current.takePictureAsync(options);
                // console.log(data.uri);
                setImage(data.uri);
            } catch (error) {
                Alert.alert(error)
                
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

    const moveToCode = () => {
        props.navigation.navigate('RunCode')
    }

    return (
        <View style={styles.container}>
            {/* if image is not taken or rejected show camera */}
            {!image ?
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
                {image?
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

                    <View style={styles.bottomContainerButtonsWrapper}>
                        {/* library button */}
                        <TouchableOpacity style={ styles.icon } onPress={pickImage}>
                            <LibraryIcon />
                            <Text style={ styles.iconLabelText }>Library</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={takePicture}>
                            <CameraIcon />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.icon} onPress={() => props.navigation.navigate('History')}>
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
