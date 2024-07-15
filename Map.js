import React, { useEffect, useState } from 'react';
import {Text, View, StyleSheet} from 'react-native';
import axios from 'axios';
import Config from 'react-native-config';

const Map = () => {

    const [mapData, setMapData] = useState(null)
    const apiKey = Config.TMAP_API_KEY

    useEffect(() => {
        const fetchMapData = async () => {
            try{
                const url = `https://apis.openapi.sk.com/tmap/jsv2?version=1&appKey=${apiKey}`

                const response = await axios.get(url)

                console.log("data는?", response.data)
                setMapData(response.data)
            } catch (error) {
                console.log("에러", error)
            }
        }

        fetchMapData()
    }, [])

  return (
    <View>
      {mapData ? (
        <View>
            <Text>{mapData.data}</Text>
        </View>
      ) : (
        <Text>Loading Map Data</Text>
      )}
    </View>
  );
};

// const styles = StyleSheet.create({
//     map: {
//         flex:
//     }
// })

export default Map;
