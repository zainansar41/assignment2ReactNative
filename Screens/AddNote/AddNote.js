import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, ToastAndroid } from 'react-native'
import React, { useState } from 'react'

import { getDatabase, ref, set } from "firebase/database";
import { uuidv4 } from '@firebase/util';


export default function AddNote({ navigation }) {
  const [title, setTitle] = useState('')
  const [desc, setdesc] = useState('')

  const addnoteBTN = () => {
    try {
      try {
        function addNote() {
          if (title !== "" || desc !== "") {

            const myId = uuidv4();

            const db = getDatabase();
            set(ref(db, 'Notes/' + myId), {
              noteID:myId,
              title: title,
              desc: desc,
              user: global.userID
            });
            ToastAndroid.show("Note Uploaded", ToastAndroid.LONG)
            setTitle("")
            setdesc("")
          }
          else{
            ToastAndroid.show("Please Fill All Fields", ToastAndroid.LONG)
          }
        }
        addNote()
      } catch (error) {
        console.log(error);
        ToastAndroid.show("Error in Uploading Note", ToastAndroid.LONG)

      }
    }
    catch (error) {
      ToastAndroid.show("Error in Uploading Note", ToastAndroid.LONG)
    }
  }

  const seeNotesBTN = () => {
    navigation.navigate('viewNotes')
  }

  const cancelBTN = () => {
    setTitle('')
    setdesc('')
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ flex: .3, display: 'flex', justifyContent: 'center', alignItems: 'center', height: 350, flexDirection: 'column' }}>
        <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#000' }}>Add a New Note</Text>

        <View>
          <TouchableOpacity style={{ marginTop: 30, marginLeft: 200, height: 50, width: 100, backgroundColor: 'orange', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }} onPress={seeNotesBTN}>
            <Text style={{ color: '#fff', fontWeight: '900', fontSize: 18 }}>See Notes</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: .7, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>


        <View style={{ width: '80%', height: 50, backgroundColor: 'white', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
          <TextInput placeholder="Title" style={{ width: "100%", paddingLeft: 30 }} value={title} onChangeText={newText => setTitle(newText)} />
        </View>
        <View style={{ width: '80%', height: 100, backgroundColor: 'white', borderRadius: 10, marginTop: 20 }}>
          <TextInput value={desc} placeholder="Desciption" style={{ height: 100, width: "100%", paddingLeft: 30 }}
            multiline={true} onChangeText={newText => setdesc(newText)} />
        </View>
        <TouchableOpacity style={{ width: '80%', height: 50, backgroundColor: 'white', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginTop: 20 }} onPress={addnoteBTN}  >
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: "orange" }}>Add Note</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ width: '80%', height: 50, backgroundColor: 'orange', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginTop: 20 }} onPress={cancelBTN} >
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: "#fff" }}>Cancel</Text>
        </TouchableOpacity>


      </View>
    </ScrollView>
  )
}