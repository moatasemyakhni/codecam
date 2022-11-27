import Card from '../../components/Card';
import React, { useEffect } from 'react';
import EmptyState from '../../components/EmptyState';
import NoCodeIcon from '../../../assets/images/icons/NoCodeIcon';

import {styles} from './styles';
import { useSelector } from 'react-redux';
import { RootState, store } from '../../redux/store';
import { FlatList, SafeAreaView, Alert } from 'react-native';
import { getAllPhotosForUser } from '../../api/photo/photoApi';
import { updateUserPhotos } from '../../redux/slices/userSlice';
import { getDate, getDateTime } from '../../constants/converts';

const History = ({navigation}) => {
  const {userProfile, userCodePhotos} = useSelector((state: RootState) => state.user);
  const { theme } = useSelector((state: RootState) => state.ui);
  const userId = userProfile.userId;

  useEffect(() => {
    if(userCodePhotos?.length === 0 || !userCodePhotos) {
      (async () => {
        const response = await getAllPhotosForUser(userId);
        if(!response.error) {
          store.dispatch(
            updateUserPhotos(response.photos),
          );
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
              getDateTime(item.updatedAt) != getDateTime(item.createdAt)?
                `${getDate(item.updatedAt)} (edited)`
              :
                getDate(item.updatedAt)
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

export default History;