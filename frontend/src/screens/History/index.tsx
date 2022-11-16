import { FlatList, SafeAreaView } from 'react-native'
import React from 'react'
import Card from '../../components/Card'
import {styles} from './styles';


const History = ({navigation}) => {
  const DATA = [
    {},
    {},
    {}
  ]
  return (
    <SafeAreaView style={styles.container} >
      <FlatList 
        data={DATA}
        renderItem={() => <Card navigation={navigation} />}
      />
    </SafeAreaView>
    
  )
}

export default History