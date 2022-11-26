
import Prompt from '../Prompt';
import React, { FC, useState } from 'react';
import Toast from 'react-native-root-toast';
import DeleteIcon from '../../../assets/images/icons/DeleteIcon';

import { 
    View, 
    Text, 
    Image,
    TouchableOpacity,
} from 'react-native';
import { styles } from './styles';
import { useSelector } from 'react-redux';
import { colors } from '../../constants/palette';
import { store, RootState } from '../../redux/store';
import { StackNavigationProp } from '@react-navigation/stack';
import { deletePhoto, getPhotoById } from '../../api/photo/photoApi';
import { PhotosInterface, updateUserPhotos } from '../../redux/slices/userSlice';
 
interface CardPropsInterface {
    snippetTitle?: string,
    date?: string,
    imageUrl?: string,
    navigation?: StackNavigationProp<any>,
    photoId?: string,
}

const Card: FC<CardPropsInterface> = ({photoId, snippetTitle, date, imageUrl, navigation}) => {
    const { userCodePhotos } = useSelector((state: RootState) => state.user);
    const { theme } = useSelector((state: RootState) => state.ui);

    const [visiblePrompt, setVisiblePrompt] = useState(false);
    const [message, setMessage] = useState('Code Deleted Successfully');

    const handlePressPhoto = async (photoId) => {
        try {
            const response = await getPhotoById(photoId);
            if(response.error) {
                Toast.show(response.message, {
                    duration: Toast.durations.LONG,
                });
                return;
            }
            const photo = response.photo;
            navigation.navigate('RunCode', {
                photoSnippetName: photo.snippetName, 
                textContent: photo.codeText,
                language: photo.programmingLanguage, 
                photoId: photoId, 
                newPhoto: false,
            });
        } catch (error) {
            Toast.show(error.message, {
                duration: Toast.durations.LONG,
            });
        }
        
    }

    const handleDelete = async () => {
        try {
            const response = await deletePhoto(photoId);
            if(response.error) {
                setMessage(response.message);
                return;
            }    
               
            const photos:Array<PhotosInterface> = userCodePhotos.filter(photos => photos._id !== photoId);
            store.dispatch(
                updateUserPhotos(photos)
            );
            setMessage(response.message);
        } catch (error) {
            Toast.show(error.message, {
                duration: Toast.durations.LONG,
            });
        }
       
    }
    
    
  return (
    <View style={[
        styles.cardContainer,
        theme==='dark'?
            styles.cardContainerDark
        :
            styles.cardContainerLight
        ]}
    >
      <Text style={[
        styles.snippetTitle,
        theme==='dark'?
            styles.textDark
        :
            styles.textLight
        ]}>{snippetTitle || "Snippet1"}</Text>
       <View style={styles.infoSection}>
            <Text 
            style={[
                styles.date,
            theme==='dark'?
                styles.textDark
            :
                styles.textLight,
        ]}>{date}</Text>
            <TouchableOpacity onPress={() => setVisiblePrompt(true)}>
                <DeleteIcon color={theme==='dark'?colors.primary:colors.white} />
            </TouchableOpacity>
       </View>
       
       <TouchableOpacity activeOpacity={0.9} onPress={() => handlePressPhoto(photoId)}>
        {!imageUrl? 
            <Image style={styles.image} source={{ 
            uri: 'data:image/jpeg;base64,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'
            }} />
            :
            <Image style={styles.image} source={{ 
                uri: imageUrl,
            }} />
        
            }
        </TouchableOpacity>
        <Prompt 
            setVisiblePrompt={setVisiblePrompt} 
            visiblePrompt={visiblePrompt} 
            bgColor={colors.red} 
            color={colors.red} 
            description={'Are you sure you want to delete code?'} 
            label={'DELETE'}
            onAction={handleDelete} 
            onSuccessMessage={message} 
            title={'Delete Code'}  
        />
    </View>
  )
}

Card.defaultProps = {
    snippetTitle: "Snippet1",
    date: "xx-xx-xxxx",
}

export default Card