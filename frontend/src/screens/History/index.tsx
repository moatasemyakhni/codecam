import Card from '../../components/Card';
import React, {useState, useEffect} from 'react';
import EmptyState from '../../components/EmptyState';
import NoCodeIcon from '../../../assets/images/icons/NoCodeIcon';

import {styles} from './styles';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { FlatList, SafeAreaView, Alert } from 'react-native';
import { getAllPhotosForUser } from '../../api/photo/photoApi';


const History = ({navigation}) => {
  const {userProfile, userCodePhotos} = useSelector((state: RootState) => state.user);
  const { theme } = useSelector((state: RootState) => state.ui);
  const userId = userProfile.userId;
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    if(photos.length === 0) {
      (async () => {
        const response = await getAllPhotosForUser(userId);
        if(!response.error) {
          setPhotos(response.photos);
        }else {
          Alert.alert('Error', response.message);
        }
        
      })();
    }
  }, []);
  
  return (
    userCodePhotos?.length == 0?
      <EmptyState Icon={ NoCodeIcon } text='Photos are saved here' />
    :
    <SafeAreaView 
      style={[
        styles.container,
        theme==='dark'?
          styles.containerBgColorDark
        :
          styles.containerBgColorLight
      ]} 
    >
      <FlatList 
        data={userCodePhotos}
        keyExtractor={photo => photo._id}
        renderItem={
          ({item}) => <Card 
            navigation={navigation}
            date={
              item.updatedAt.split('.')[0] != item.createdAt.split('.')[0]?
                `${item.updatedAt.split('T')[0]} (edited)`
              :
                item.updatedAt.split('T')[0]
            }
            snippetTitle={item.snippetName}
            key={item._id}
            photoId={item._id}
            imageUrl={item.photoUrl}

          />
        }
      />
    </SafeAreaView>
  )
}

export default History