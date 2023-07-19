import {View,Text,StyleSheet,SafeAreaView,
  Button,TouchableOpacity,TextInput,ScrollView} from "react-native";
import * as Speech from 'expo-speech';
import {useState,useEffect} from 'react';
import {MaterialIcons } from "@expo/vector-icons"
import api from "./src/services/api";

export const falar = (text) => {
  const thingToSay = text;
  Speech.speak(thingToSay);
};

export default function App(){
  const OPEN_API_KEY='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';
  const [input,setInput]=useState("");
  const [resposta_iaBela,setResposta_iaBela]=useState("")

  const hendleSend= async (text)=>{
   
    fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + OPEN_API_KEY,
        },
        body: JSON.stringify({
            model: "text-davinci-003",
            prompt: text,
            max_tokens: 2048,
            temperature: 0.5,
        }),
    })
    .then((response) => response.json())
    .then((json) => {
        if (json.error?.message) {
            let resposta=''
            resposta = `Erro: ${json.error.message}`;
        } else if (json.choices?.[0].text) {
          let text =  json.choices[0].text || "Sem resposta";
         setResposta_iaBela(text)
         setInput("");
        }
    })
   }
  
 useEffect(()=>{
      
 },[resposta_iaBela])

  return(
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titleHeader} >iaBela</Text>
      </View>

      <ScrollView style={styles.content_ia_bela} 
      
      showsVerticalScrollIndicator={true}
      >
            <Text style={{color:"#FFF",fontSize:16, textAlign:"justify",fontWeight:"500",marginBottom:15 }}
            
            >
              {resposta_iaBela}
              
            </Text>
      </ScrollView>


      <View  style={styles.contentInput} >
        <TextInput

        style={styles.textInput}
        value={input}
        multiline={true}
        numberOfLines={4}
        onChangeText={(text)=>setInput(text)}
        placeholder="digite aqui a sua questão"
        />

        <View style={{flexDirection:"row",gap:2 }} >

        <TouchableOpacity onPress={()=>hendleSend(input)}  >
          <MaterialIcons name="keyboard-voice" size={30} color="#059669" />
        </TouchableOpacity>

        <TouchableOpacity  onPress={()=>hendleSend(input)}  >
          <MaterialIcons name="send" size={30} color="#1e40af" />
        </TouchableOpacity>
        </View>
      </View>

    </SafeAreaView>
  )
}


const styles=StyleSheet.create({
  container:{
    marginTop:30,
    flex:1,
    backgroundColor:"#111827",
    paddingStart:14,
    paddingEnd:14,
    paddingBottom:50

  },
  header:{
        width:"100%",
        backgroundColor:"#2563eb",
        alignSelf:"flex-start",
        padding:8,
        paddingLeft:16,
        paddingRight:20,
        borderTopRightRadius:8,
        borderBottomLeftRadius:8,
        borderTopLeftRadius:8,
        borderBottomRightRadius:8,
        marginBottom:8,
       
       

  },
  titleHeader:{
    padding: 4,
    color:"#fff",
    fontSize:18,
    fontWeight:"bold"
  },
  contentInput:{
    position:"absolute",
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    backgroundColor:"#fff",
    width:"100%",
    height:50,
    bottom:0,
    left:0,
    right:0,
    marginLeft:14,
    marginBottom:15,
    borderRadius:14,
    padding:8
  },
  TextInput:{
    paddingLeft:14,
    fontSize:18,
    fontWeight:"bold",
    width:"90%"
    
  },
  content_ia_bela:{
    height: 200,
    width:"100%",
    padding:4,
    marginBottom: 20,

  },textInput:{
    flexShrink: 1,
    
  }
})