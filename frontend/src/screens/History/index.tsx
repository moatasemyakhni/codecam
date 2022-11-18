import Card from '../../components/Card';
import React, {useState, useEffect} from 'react';

import {styles} from './styles';
import { useSelector } from 'react-redux';
import { store } from '../../redux/store';
import { FlatList, SafeAreaView, Alert } from 'react-native';
import { getAllPhotosForUser } from '../../api/photo/photoApi';
import { updateUserPhotos } from '../../redux/slices/userSlice';


const History = ({navigation}) => {
  const {userProfile, userCodePhotos} = useSelector((state) => state.user);
  const userId = userProfile.userId;
  const [photos, setPhotos] = useState([]);


  useEffect(() => {
    (async () => {
      const response = await getAllPhotosForUser(userId);
      // console.log(response);
      if(!response.error) {
        setPhotos(response.photos);
      }else {
        Alert.alert('Error', response.message);
      }
      
    })();
  }, []);

  useEffect(() => {
    store.dispatch(
      updateUserPhotos({
        userCodePhotos: photos
      })
    );
  }, [photos])
  
  return (
    <SafeAreaView style={styles.container} >
      <FlatList 
        data={userCodePhotos}
        keyExtractor={photo => photo._id}
        renderItem={
          ({item}) => <Card 
            navigation={navigation} 
            date={
              item.updatedAt != item.createdAt?
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