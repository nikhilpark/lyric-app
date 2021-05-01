import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, ScrollView,Text, Button,Image, View, TextInput } from 'react-native';
import Axios from 'axios';

export default function App() {


const [songName, setSongName] = useState('')
const [artistName, setArtistName] = useState('')
const [albumName, setAlbumName] = useState('')
const [lyrics, setLyrics] = useState('')
const [imgURl, setImgURL] = useState('https://cdn.onlinewebfonts.com/svg/img_41510.png')

const getSongName = (song) => {
  setSongName(song)
}

const getArtistName = (artist) => {
  setArtistName(artist)
}

const getAlbumName = (album) => {
  setAlbumName(album)
}

const fetchData = () =>{

  const url1 =  "https://api.lyrics.ovh/v1/" + artistName + "/" + songName
  const url2 = "http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=bc81101654e5165ccb93a58ae48526d1&artist="
  +artistName+ "&album="+albumName+"&format=json"
  Axios.get(url2)
    .then(res=>{
      // setLyrics(res.data.lyrics)
      setImgURL(res.data.album.image[2]["#text"])

    })
    .catch(err=>{
      console.log(err)
    })

    Axios.get(url1)
    .then(res=>{
      setLyrics(res.data.lyrics)
     

    })
    .catch(err=>{
      console.log(err)
    })


}

const clear = () =>{
  setLyrics("")
  setImgURL("https://cdn.onlinewebfonts.com/svg/img_41510.png")
  setSongName("")
  setArtistName("")
  setAlbumName("")
  
}



  return (
    <View style={styles.container}>
      <Image 
      style={styles.img}
      source={{
          uri: imgURl,
        }}/>
      <TextInput value = {songName} onChangeText={getSongName} style={styles.songInput} placeholder="Enter name of the song*"></TextInput>
      <TextInput value = {artistName} onChangeText={getArtistName} style={styles.songInput} placeholder="Enter name of the artist*"></TextInput>
      <TextInput value = {albumName} onChangeText={getAlbumName} style={styles.songInput} placeholder="Enter name of the album"></TextInput>
      <View style={{flexDirection:"row"}}>
        <View style={{margin:10}}>
          <Button title="Go!" onPress={fetchData}/>
        </View>
        <View style={{ margin:10}}>
          <Button title="Clear!" onPress={clear}/>
        </View>
      </View>
      <ScrollView  style={styles.lyricOutput}>
          <Text>
          {lyrics}
          </Text>
      </ScrollView>
      <StatusBar style="auto" />
   
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop:50,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  songInput: {
    borderColor:'black',
    borderRadius:10,
    borderWidth: 1,
    margin:5,
    padding:5,
    width:200,
  },
  lyricOutput: {
    maxHeight:300,
    padding:10,


  
  },
  img: {
    height:150,
    width:150,

  }
});
