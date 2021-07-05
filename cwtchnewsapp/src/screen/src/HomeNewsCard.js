import React,{useRef,useEffect,useCallback,useState} from 'react';
import { StyleSheet,View,SafeAreaView,Text,Dimensions ,TouchableOpacity, ScrollView,TouchableHighlight,Image,Linking , BackHandler} from 'react-native';
import FastImage from 'react-native-fast-image'
import {  FONT_SIZE_EXTRA_LARGE,
    FONT_SIZE_NORMAL,
    FONT_SIZE_LARGE,
    FONT_SIZE_SMALL,} from '../constants/Dimens';
    import Video from 'react-native-video';
    import { SectionGrid,FlatGrid } from 'react-native-super-grid';
import {GRAY, WHITE, DARK_GRAY, NEWS_TITLE} from '../constants/Colors';
import Swipeable from 'react-native-gesture-handler/Swipeable'
import RBSheet from "react-native-raw-bottom-sheet";
import {
    FONT_REGULAR,
    FONT_BOLD,
    FONT_MEDIUM,
    FONT_LIGHT,
    momentCalendarConfig,
  } from '../constants/Constants';
  import uuid from 'react-native-uuid';
  import { TabBar } from 'react-native-tab-view';
  import { Container, Header, Tab, Tabs, TabHeading, Icon, Spinner } from 'native-base';
import {TextInput} from 'react-native-paper'
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const SCREEN_HEIGHT = Dimensions.get("window").height;
import propType from 'prop-types'
import { connect } from 'react-redux';
import database, { firebase } from '@react-native-firebase/database'
import FAIcon from "react-native-vector-icons/FontAwesome";
import MDIcon from "react-native-vector-icons/MaterialIcons";
import {  DeckSwiper, Card, CardItem, Fab,Thumbnail, Left, Body, Button } from 'native-base';
import { Viewport } from '@skele/components'
import * as Progress from 'react-native-progress';
import LottieView from 'lottie-react-native';
import YoutubePlayer from "react-native-youtube-iframe";
const ViewportAwareVideo = Viewport.Aware(Video);
import moment from 'moment'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { LinearTextGradient } from "react-native-text-gradient";




const HomeNewsCards = (ARTICLES) => {

    
  const goLive = () => {
    return navigation.navigate("WebViews")
  }
  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

 if(ARTICLES.news.type === 'video'){
    // setvideoStatus(true);
    // console.log("videoStatus", videoStatus);
    // if(videoStatus){
      return(
        // <Swipeable renderLeftActions={() => {goLive}}>
  
   <View style={[styles.container,{backgroundColor:'#E2E2E2'}]}>
       {/* {console.log("news -> ",ARTICLES.news)}
       {console.log("user -> ",ARTICLES.authState.user)} */}
  
  
          <View style={styles.vtop}>
          <YoutubePlayer
      height={400}
      play={true}
      mute={true}
      videoId={ARTICLES.news.vurl}
      onChangeState={onStateChange}
    />
          </View>
              
          <View style={[styles.vmiddle, styles.contentPadding,{margin:10}]}>
                <View style={{flexDirection:'column'}}>
                  <View>
                  <View style={{flexDirection:'row'}}>
              <View style={{height:50,width:6,borderRadius:15,backgroundColor:'#FF8D8D',marginTop:20,marginRight:5}}/>
            <Text style={styles.title}>{ARTICLES.news.newsTitle}</Text>

            </View>
            <View style={{marginTop:3,flexDirection:'row'}}>
            <Text style={{color:'#758283',fontSize:10}}>
            {ARTICLES.news.from}

              </Text>
              <Text style={{color:'#758283',marginLeft:5,fontSize:10}}>
            {moment(ARTICLES.news.time).format("MMM Do YY")}  
            
              </Text>
          </View>
            <Text style={styles.description}
            numberOfLines={9} 
            
            >{ARTICLES.news.newsDetails}</Text>
            {/* <Text style={styles.byLine} numberOfLines={1} ellipsizeMode="tail"> */}
              {/* {this.getByLineText()} */}
            {/* </Text> */}
                  </View>
                <View>
               
                </View>
            

                </View>




          
          </View>
  
          
          </View> 
          // </Swipeable>
     
      )
       
      
  //   }
  //   else{
  //     <View style={[styles.container]}>
  //     <View>
        
  //     <Video source={{uri: ARTICLES.news.pic}}   
  //  ref={(ref) => {
  //   setPlay(ref)
  //  }}          
  //  playInBackground={false}    
  //  paused={true}                 
  //  onBuffer={() => {console.log("Buffering....")}}                
  //  onError={() => {console.log("Error....")}}               
  //  style={styles.backgroundVideo} />
  //     </View>
  //   </View>
  //   }
    
  }
  else if(ARTICLES.news.type === 'news'){
    // setvideoStatus(false);





    return(
      

 <View style={[styles.container,{backgroundColor:'#E2E2E2'}]}>



        <View style={styles.top}>
          <FastImage
            style={{flex: 1}}
            source={{
              uri: ARTICLES.news.pic,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
            
        <View style={[styles.middle, styles.contentPadding,{margin:10}]}>
              <View style={{flexDirection:'column'}}>
                <View>
                <View style={{flexDirection:'row'}}>
            <View style={{height:50,width:6,borderRadius:15,backgroundColor:'#FF8D8D',marginTop:20,marginRight:5}}/>
          <Text style={styles.title}>{ARTICLES.news.newsTitle}</Text>

          </View>
          <View style={{marginTop:3,flexDirection:'row'}}>
            <Text style={{color:'#758283',fontSize:10}}>
            {ARTICLES.news.from}

              </Text>
              <Text style={{color:'#758283',marginLeft:5,fontSize:10}}>
            {moment(ARTICLES.news.time).format("MMM Do YY")}  
            
              </Text>
          </View>
          <Text style={styles.description}
          numberOfLines={9} 
          
          >{ARTICLES.news.newsDetails}</Text>
          {/* <Text style={styles.byLine} numberOfLines={1} ellipsizeMode="tail"> */}
            {/* {this.getByLineText()} */}
          {/* </Text> */}
                </View>
          
              </View>
         
           
        </View>


       
       
        </View> 
        // </Swipeable>
   
    )
  }
}

export default HomeNewsCards;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: WHITE,
  },
  top: {
    backgroundColor: WHITE,
    flex: 2.5,
  },
  vtop: {
    flex: 3,
  },
  topp: {
    backgroundColor: WHITE,
    flex: 8,
  },
  titlee: {
    fontFamily: FONT_REGULAR,
    fontWeight: 'bold',
    fontSize: FONT_SIZE_EXTRA_LARGE+2,
    marginTop: 15,
  },
  hfrom:{
    fontFamily: FONT_REGULAR,
    color:'#3944F7',
    fontWeight:'800',
    fontSize:15,
    marginTop:8
  },
  middle: {
    backgroundColor: WHITE,
    flex: 5,
  },
  vmiddle: {
    backgroundColor: WHITE,
    flex: 6,
  },
  footer: {
    flex: 0.9,
    backgroundColor: '#e5e5e5',
    justifyContent: 'center',
    backgroundColor: DARK_GRAY,
  },
  contentPadding: {
    paddingHorizontal: 12,
  },
  title: {
    fontFamily: 'Gilroy-Bold',
    fontSize: FONT_SIZE_EXTRA_LARGE,
    marginTop: 12,
  },
  description: {
    fontFamily: FONT_REGULAR,
    fontWeight: '400',
    fontSize: FONT_SIZE_LARGE,
    marginTop: 7,
    lineHeight: 25,
    color: GRAY,
  },
  byLine: {
    fontFamily: FONT_LIGHT,
    fontWeight: '300',
    fontSize: FONT_SIZE_NORMAL,
    marginTop: 5,
    color: GRAY,
    opacity: 0.7,
  },
  footerTitle: {
    fontFamily: FONT_REGULAR,
    fontWeight: '400',
    color: WHITE,
    fontSize: FONT_SIZE_NORMAL,
    fontWeight: '600',
  },
  footerSubtitle: {
    color: WHITE,
    fontWeight: '300',
    fontFamily: FONT_LIGHT,
    fontSize: FONT_SIZE_SMALL,
    fontWeight: '400',
    marginTop: 2,
  },

  // Text and View Style inside RBSheet
  inputText:{
    marginLeft:15,
    marginTop:20,
    backgroundColor:'white'
  },
  textHeading: {
    marginLeft:15,
    marginTop:20,
    fontFamily:'poppins',
    fontStyle:'normal',
    fontWeight:'bold',
    color:'#758283',
    // backgroundColor:'#EDBF69',

  },
  textUserName: {
    marginLeft:15,
    marginTop:2,
    fontFamily:'poppins',
    fontStyle:'normal',
    fontWeight:'bold',
    color:'black',
    // backgroundColor:'#EDBF69',

  },
  profileImgContainer: {
    marginLeft: 20,
    marginTop:12,
    height: 40,
    width: 40,
    borderRadius: 40,
    overflow: 'hidden',
    
  },
  profileImgContainers: {
    marginLeft: 20,
    marginTop:12,
    height: 30,
    width: 30,
    borderRadius: 40,
    overflow: 'hidden',
    
  },
  profileImgs: {
    height: 30,
    width: 30,
    borderRadius: 40,
  },
  profileImg: {
    height: 40,
    width: 40,
    borderRadius: 40,
  },
  horosImg: {
    height: 60,
    width: 60,
    borderRadius: 40,
  },
  thedayImg:{
    height: 200,
    width: 200,
    borderRadius: 100,
  },
  gridContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
    marginBottom: 20
  },
  gridButtonContainer: {
    flexBasis: "25%",
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  gridButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center"
  },
  gridIcon: {
    fontSize: 30,
    color: "white"
  },
  gridLabel: {
    fontSize: 14,
    paddingTop: 10,
    color: "#333"
  },



  backgroundVideo:{
    position: 'absolute',
    height:SCREEN_HEIGHT,
    width:SCREEN_WIDTH,
    top: 0,
  left: 0,
  bottom: 0,
  right: 0,


  },
  adsContainer: {
    height:SCREEN_HEIGHT,
    width:SCREEN_WIDTH,
  }
  });