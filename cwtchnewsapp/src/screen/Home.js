import React,{useEffect,useState,useRef} from 'react';
import { connect} from 'react-redux'
import {Linking} from 'react-native'
import { Appbar,Searchbar,Subheading   } from 'react-native-paper';
import database, { firebase } from '@react-native-firebase/database'
import RBSheet from "react-native-raw-bottom-sheet";
import FastImage from 'react-native-fast-image'

import propTypes from 'prop-types'
import Carousel from 'react-native-snap-carousel';
import { getCore } from '../action/core';
import { getTopics } from '../action/topics';
import Icon from 'react-native-vector-icons/FontAwesome';
import Splash from './SplashScreen/Splash';




import { SectionGrid,FlatGrid } from 'react-native-super-grid';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Text,
  Image,
  useColorScheme,
  View,
  Dimensions
} from 'react-native';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-google-signin/google-signin';
  import propType from 'prop-types'

import {googleSignout} from '../action/auth'
import Settings from './Settings';
GoogleSignin.configure({
  webClientId: '350416576934-3qnqa9niinbaikun27jg1vid04kj21c1.apps.googleusercontent.com',
});
import {getAllNews} from '../action/news'
import moment from 'moment'; 
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const Home = ({getCore,getTopics,topicState,newsState,coreState,googleSignout,navigation,getAllNews}) => {
  const bottomSheetRef = useRef([]);

  useEffect(() => {
    getCurrentUser()
    getHeadlinesHere()
  }, [])

  const [headlines, setheadlines] = useState([]);

  const getHeadlinesHere = () => {
    firebase.database().ref(`/impnews`).on('value' , snap => {
      if(snap.val()){
          setheadlines(Object.values(snap.val()));
      }
    })
  }

  const getCurrentUser = async () => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        console.log("*******************************************************************",user);
        setuserID(user.displayName);
      } else {
        // No user is signed in.
      }
    });
  };

  const [userID, setuserID] = useState('');

  const [Date, setDate] = useState(moment().format("MMM Do YY") );
  const [searchQuery, setSearchQuery] = useState('');

  const _goBack = () => console.log('Went back');

  const _handleSearch = () => console.log('Searching');

  const _handleMore = () => navigation.navigate("Settings");

  const [corosel, setcorosel] = useState(0);

      const MainThemeData = [
        {id:1, logo:'',theme:'Insights'},
        {id:2, logo:'',theme:'COVIDCare'},
        {id:3, logo:'',theme:'poll'},
        {id:4, logo:'',theme:'Tech'},

      ];

      const MainCategoryData = [
        {id:1,icon:'feed',topic:'My Feed'},
        {id:2,icon:'globe',topic:'All News'},
        {id:3,icon:'bar-chart',topic:'Top Stories'},
        {id:4,icon:'magic',topic:'Trending'},
        {id:5,icon:'bookmark',topic:'Bookmarks'},
        {id:6,icon:'bars',topic:'Unreal'},


      ];

      // const signOut = async () => {
      //   console.log('Signingout');

      //   try {
      //     await GoogleSignin.revokeAccess();
      //     await GoogleSignin.signOut();
      //     console.log('Signingout');
      //      // Remember to remove the user from your app's state as well
      //   } catch (error) {
      //     console.error(error);
      //   }
      // };



      const [allCore, setallCore] = useState([]);
      const [allTopics, setallTopics] = useState([]);



      useEffect(() => {
          getCore()
          getTopics()
          getAllNews()

      }, [])


      
      const renderItem = ({item, index}) => {
        return (
          <TouchableOpacity 
          style={{
            width:300,
            height:120,
            justifyContent:'center'
          }}
          activeOpacity={1}
          onPress={() => {navigation.navigate("HomeNews"
          , {
            newstopics: item.title,
            placehome: 'core'
          }
          
          )}}>
            {/* {console.log(item.title)} */}
   <View key={index} style={{height:120,width:250,backgroundColor:item.color,borderRadius:12}}>
                  <Image
              source={{uri:item.logo}}
              style={{height:60,width:120,alignSelf:'center',justifyContent:'center',marginTop:22}}
          />  
                {/* <Text style={styles.itemName,{alignSelf:'center'}}>{ item.title }</Text>   */}
            </View>
          </TouchableOpacity>
         
        );
    }

    const renderCategory = ({item, index}) => {
      // console.log("Cate: ",item.topic);
      return(
        <TouchableOpacity 
        activeOpacity={1}
        onPress={() => {navigation.navigate("HomeNews"
        , {
          newstopics: item.topic,
          placehome: 'cate'
        }
        
        )}}>
        <View style={{height:100, width:80, backgroundColor:'white',marginRight:20,borderRadius:8}}>
              <Icon
              style={{alignSelf:'center',fontSize:30,justifyContent:'center',padding:10}}
              
  reverse
  name={item.icon}
  type='ionicon'
  color='#FF8D8D'
/>
              <Text style={{alignSelf:'center'}}>
                {item.topic}
              </Text>
        </View>
      </TouchableOpacity>
      )
    }

    if(coreState.loading){
      // console.log("coreState - ",coreState);
      return <Splash/>
  }

  
  if(topicState.loading){
    // console.log("topicState - ",topicState);

    return <Splash/>
}


  const renderHeadlinesCard = () => {
    if(headlines !== null){
      console.log("dwedwef -----------------------------------------------~~~~~~~~~~~~~~~~~~~~",headlines);
     
    }


  }


  

    return(
      <>
      <Appbar.Header
  
  style={{backgroundColor:'#fff',alignItems: 'center'}}

  >
<Appbar.Action icon="cog-outline" onPress={_handleMore} /> 
<Appbar.Content 
title={<Text style={{color:'#FF6263',textDecorationStyle: "solid",textDecorationColor:'#000'}}> Discover </Text>}
style={{ alignItems: 'center'}}

/>
{/* */}

</Appbar.Header>  
      <ScrollView
        style={{backgroundColor:'#fff'}}
      >
      {/* {console.log(coreState.core)}
      {console.log(topicState.topics)} */}

      <View>
      
<View>

    
<View>

</View>
<View>
<View>

  <View style={{backgroundColor:'#FAE791',width: windowWidth,height:167,justifyContent:'center'}}>
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
      <Image
              source={{uri:'https://firebasestorage.googleapis.com/v0/b/cwtch-news.appspot.com/o/HomeScreen%2Fgirl1.png?alt=media&token=f1d96cc3-affc-4492-940d-5902628b7e4f'}}
              style={{height:65,width:25,alignContent:'flex-end',marginLeft:20}}
          />  

          <View>

          {userID ? (
          <Text style={{alignSelf:'center',fontSize:17}}>Good morning, {userID}</Text>

          ) : (

          <Text style={{alignSelf:'center',fontSize:17}}>Good morning, </Text>

          )}
          <Text style={{alignSelf:'center',fontSize:12}}>
            {Date}
          </Text>
          </View>
      <Image
              source={{uri:'https://firebasestorage.googleapis.com/v0/b/cwtch-news.appspot.com/o/HomeScreen%2Fboy1.png?alt=media&token=766e3d09-eee4-4bfc-8489-dd7e6bd97d1c'}}
              style={{height:65,width:25,alignSelf:'flex-end',marginRight:20}}
          />  
           
        </View>  

        
    </View>
            <View style={{alignSelf:'center',marginTop:23}}>
              <TouchableOpacity
              style={{
                width:135,
                height:30,
                backgroundColor:'#FF6263',
                justifyContent:'center',
                borderBottomRightRadius:20,
                borderTopLeftRadius:20}}
              onPress={() => bottomSheetRef.current.open()}
              >
                <Text style={{fontSize:15,alignSelf:'center',color:'#fff'}}>
                  Filter
                </Text>
              </TouchableOpacity>
              </View>


    <Subheading style={{paddingLeft:20,marginTop:25,marginBottom:3,fontFamily:'Gilroy-Medium'}}>Headlines</Subheading >
     
         <View>

           {/* {newsState ? (console.log(" -->>> newsState +++++++++++++++++++++++",newsState.news )) : (console.log("Hooo"))} */}
           
          {headlines &&  headlines.map((item,index) => {
        if(item.type === 'impnews'){
            return(
              <View 
              key={index}
              style={{alignSelf:'center',marginTop:12}}>
              <TouchableOpacity
              activeOpacity={1}
              onPress={() => Linking.openURL(item.url)}
              >
                <View style={{
                  flexDirection:'row',
                  height:195,
                  width:windowWidth-50,
                  margin:8,
                  backgroundColor:'#ffffff',
                  borderRadius:10,
                  elevation:5,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 6,
                  },
                  shadowOpacity: 0.37,
                  shadowRadius: 7.49,
                  }}>
                    
                    <View>
                          <FastImage
                              style={{height:114,borderTopLeftRadius:8,borderTopRightRadius:8, width:windowWidth-50}}
                              source={{
                                uri: item.pic,
                              }}
                              resizeMode={FastImage.resizeMode.cover}
                            />
                      <Text
                      style={{
                        padding:5,
                        fontSize:15,
                        marginTop:8,
                        marginLeft:8,
                        fontWeight:'bold'
                      }}
                      numberOfLines={2}
                      >
                        {item.newsTitle}
                      </Text>
                      <View
                      style={{
                        flexDirection:'row'
                      }}
                      >
                    <Text
                      style={{
                        marginTop:0.2,
                        marginLeft:12,
                        fontSize:12,
                        color:'#758283',
                        fontWeight:'bold'
                      }}
                      >
                        {item.from}
                      </Text>
                      <Text
                      style={{
                        marginTop:0.2,
                        marginLeft:22,
                        fontSize:12,
                        color:'#758283',
                        fontWeight:'bold'
                      }}
                      >
                        👁️ {item.views}
                      </Text>
                      <Text
                      style={{
                        alignSelf:'flex-end',
                        marginTop:0.2,
                        marginLeft:40,
                        fontSize:12,
                        color:'#FF6263',
                        fontWeight:'bold'
                      }}
                      >
                        {item.location}
                      </Text>
                        </View>
  
                    
              
                      </View>
                </View>
              </TouchableOpacity>
          </View>
            )
        }
        
  })}

           
           
           </View>
           <RBSheet
          ref={(el) => (bottomSheetRef.current = el)}
          closeOnDragDown={true}
          closeOnPressMask={true}
          height={SCREEN_HEIGHT-200}
          customStyles={{
            wrapper: {
              backgroundColor: 'rgba(0.9, 0, 0, 0.4)',
            },
            draggableIcon: {
              backgroundColor: '#FF6263',
            },
            container: {
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
            },
          }}>
            
                     
           
  
          <ScrollView>



          <View>
            <Subheading style={{paddingLeft:20,marginTop:25,marginBottom:12,fontFamily:'Gilroy-Medium'}}>Category</Subheading >
          {/* Flatlist here horizontal scroll */}
          <View style={{flexDirection:'column',justifyContent:'space-between',paddingLeft:20}}>

          <FlatList
           showsHorizontalScrollIndicator={false}
        data={MainCategoryData}
        horizontal={true}
        renderItem={renderCategory}
        keyExtractor={item => item.id}
      />
      </View>


      <View>
      
      <View>
      <Carousel
            ref={(c) => { setcorosel(c) }}
            data={coreState.core}
            renderItem={renderItem}
            
            sliderWidth={windowWidth}
            itemWidth={250}
          />


        </View>

     
      
        <Subheading style={{paddingLeft:20,marginTop:25,marginBottom:8,fontFamily:'Gilroy-Medium'}}>Topics</Subheading >

        <FlatGrid
    itemDimension={130}
    data={topicState.topics}
    style={styles.gridView}
    // staticDimension={300}
    // fixed
    // horizontal={true}
    spacing={10}
    renderItem={({ item }) => (
      <TouchableOpacity 
      activeOpacity={1}
      style={{
        backgroundColor: '#FFF',
        position: 'relative',
      }}
      onPress={() => {navigation.navigate("HomeNews"
      , {
        newstopics: item.title,
        placehome: 'sugg'
      }
      
      )}}>
      <View style={[styles.itemContainer, { backgroundColor: item.color,overflow: 'hidden', }]}>
        <Image
            source={{uri:item.logo}}
            style={{height: 150,width:200,alignSelf:'center',justifyContent:'center',position: 'absolute'}}
        />  
        <Text style={styles.itemName}>{item.title}</Text>
       
      </View>
      </TouchableOpacity>
    )}
  />

    
    </View>

              </View>



          </ScrollView>
  
          </RBSheet>

       
            </View>
      </View>
   
        

      
        </View>
        </View>
        </ScrollView>
        </>
    )
}


const mapDispatchToProps = {
  googleSignout,
  getCore,
  getTopics,
  getAllNews
}


const mapStateToProps = (state) => ({
  coreState: state.core,
  topicState: state.topics,
  newsState: state.news
})


Home.propTypes = ({
  googleSignout: propTypes.func.isRequired,
  getCore: propTypes.func.isRequired,
  getTopics: propTypes.func.isRequired,
  coreState: propTypes.object.isRequired,
  topicState: propTypes.object.isRequired,
  getAllNews: propType.func.isRequired,
})

const styles = StyleSheet.create({
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
});



export default connect(mapStateToProps , mapDispatchToProps)(Home);