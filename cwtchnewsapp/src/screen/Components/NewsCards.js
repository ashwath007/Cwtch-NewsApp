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

const NewsCards = (ARTICLES,authState) => {
  const bottomSheetRef = useRef([]);
  const [active, setactive] = useState(false);
  


  const yesPressed = () => {
    console.log("yes");
    let TEMP = 0;
        firebase.database().ref(`/news/${ARTICLES.news.id}`).on('value' , snap => {
            if(snap.val()){
              console.log("Yes Poll ********************  ", snap.val().yespoll);
              TEMP = snap.val().yespoll
              TEMP = TEMP + 1;
              console.log(TEMP);
              console.log('TEMP',TEMP);
              firebase.database().ref(`/news/${ARTICLES.news.id}`).update({
                yespoll:TEMP
              }).then(() => {
                console.log("Yes done");
           
              })
              
            }
            else{
              
              console.log("Error");
            }
        })
          

}

const noPressed = () => {

}


  useEffect(() => {
    const backAction = () => {
      setactive(false)
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  const postThoughts = () => {
    var OPTIONDATa = [];
    // TODO We need to see for Phone Login

    const user_name = ARTICLES.authState.user.displayName;
    const user_pic = ARTICLES.authState.user.photoURL;
    const time = new Date();
    var opinion_DATA = {
      user_name,
      user_pic,
      opinion,
      time: new Date()
    };

    const ID = uuid.v4();
    database().ref(`/news/${ARTICLES.news.id}/opinion/${ID}`).set({
      opinion: opinion_DATA
    }).then(() => {
      setopinion('')
    })







  

  }
  
  const [visible, setvisible] = useState(false);
  // Heart of Video Pause or Play
  const checkVisible = (isVisible) => {
    if(isVisible){
      if(visible){
        setvisible(true)
      }
    }else{
      if(visible){
        setvisible(false)
      }
    }
  }

  //



  const sociailDetails = [
      {
        "label": "Facebook",
        "icon": "facebook",
        "color": "#3b5998",
        
      },
      {
        "label": "Twitter",
        "icon": "twitter",
        "color": "#38A1F3"
      },
      {
        "label": "Google+",
        "icon": "google-plus-official",
        "color": "#DD4B39"
      },
      {
        "label": "Linkedin",
        "icon": "linkedin",
        "color": "#0077B5"
      },
      {
        "label": "Dropbox",
        "icon": "dropbox",
        "color": "#3d9ae8"
      },
      {
        "label": "Reddit",
        "icon": "reddit-alien",
        "color": "#FF4301"
      },
      {
        "label": "Skype",
        "icon": "skype",
        "color": "#00aff0"
      },
      {
        "label": "Pinterest",
        "icon": "pinterest",
        "color": "#c8232c"
      },
      {
        "label": "Flickr",
        "icon": "flickr",
        "color": "#ff0084"
      },
      {
        "label": "VK",
        "icon": "vk",
        "color": "#4c75a3"
      },
      {
        "label": "Dribbble",
        "icon": "dribbble",
        "color": "#ea4c89"
      },
      {
        "label": "Telegram",
        "icon": "send",
        "color": "#0088cc"
      }
    ]
  
  
    const [play, setPlay] = useState('');
  
    // ***************
    const [videoStatus, setvideoStatus] = useState(false);
    const [videoLoading, setvideoLoading] = useState(false);
    //
    const [playing, setPlaying] = useState(false);

    const onStateChange = useCallback((state) => {
      if (state === "ended") {
        setPlaying(false);
        Alert.alert("video has finished playing!");
      }
    }, []);
  
    const togglePlaying = useCallback(() => {
      setPlaying((prev) => !prev);
    }, []);

  const goLive = () => {
    return navigation.navigate("WebViews")
  }
 
    const [opinion, setopinion] = useState('');

    if(ARTICLES.news.type === 'ads'){
      // setvideoStatus(false);

      return(
        <SafeAreaView
        
        >
          <TouchableOpacity activeOpacity={1.0} onPress={() => Linking.openURL(ARTICLES.news.url)}>

          
           <FastImage
              style={styles.adsContainer}
              source={{
                uri: ARTICLES.news.advertisment,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          </TouchableOpacity>

        </SafeAreaView>
      )
    }
    else if(ARTICLES.news.type === 'video'){
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
        videoId={ARTICLES.news.url}
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
    else if(ARTICLES.news.type === 'quotes'){
      // setvideoStatus(false);

      return(
        <View style={[styles.container,{backgroundColor:"white",justifyContent: 'center',alignItems:'center'}]}>
          <View style={{padding:10}}>
            <View>
              <Text style={{fontFamily:'Gilroy-Bold',fontSize:30,marginBottom:20,textDecorationColor:'#FF6263',textDecorationLine:'underline'}}>
              Today's Quotes
              </Text>
            </View>
            <View>
          <Text style={{
          alignSelf: 'flex-start',
          fontSize:30,
          color:'black',
          fontStyle:'normal',
          fontFamily:'Gilroy-Medium',
     
          }}>
            {ARTICLES.news.title} 
          </Text>
          <Text style={{alignSelf: 'flex-start',marginLeft:10,fontSize:30,fontWeight:'bold',marginTop:22,backgroundColor:'#FF6263',padding:2}}>
            - {ARTICLES.news.by}
          </Text>
          </View>
          </View>
         
        </View>
      )
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
              <Text style={{color:'#758283'}}>
              {ARTICLES.news.from}

                </Text>
                <Text style={{color:'#758283'}}>
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
                <TouchableOpacity style={{ flex: 1,
              alignSelf:'flex-end',
                  marginTop:12,
        position: 'absolute',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        backgroundColor: 'transparent'}} 
        onPress={() => bottomSheetRef.current.open()}>
                <Image source={require('./src/press.png')}  style={styles.img}/>
              </TouchableOpacity>
                </View>
                </View>
           
             
          </View>
  

            <RBSheet
          ref={(el) => (bottomSheetRef.current = el)}
          closeOnDragDown={true}
          closeOnPressMask={true}
          height={SCREEN_HEIGHT-400}
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
            
                     
           
  
          <Tabs
          style={{elevation:0}}
          tabBarUnderlineStyle={{borderBottomWidth:2}}
        
          >
            <Tab style={{flex:1}} heading={ <TabHeading style={{backgroundColor: 'white'}}><Icon name="people" style={{color:'#FF6263'}} /><Text> Opinion</Text></TabHeading>}>
              <ScrollView showsVerticalScrollIndicator={true}>
              <TouchableOpacity activeOpacity={1}>
              <View>
              
    {/* {console.log("ARTICLE",ARTICLES.news.opinion)} */}
            {(ARTICLES.news.opinion != undefined) ? (
                <View>
                  {ARTICLES.news.opinion != undefined && Object.values(ARTICLES.news.opinion).map((op,index) => {
                return(
                  <View>
                  <View style={{flexDirection:'row'}}>
  <TouchableHighlight
            style={[styles.profileImgContainers, { borderColor: 'green', borderWidth:1 }]}
          >
      <Image source={{ uri:op.opinion.user_pic }} style={styles.profileImgs} />
  </TouchableHighlight> 
  <View style={{marginLeft:8,justifyContent:'center',marginTop:12}}>
  <Text style={{fontSize:15,fontWeight:'bold',textDecorationLine: 'underline',textDecorationColor:'#383CC1'}}>
                      {op.opinion.user_name}
                      </Text>
                 
    </View>
                  
                  </View>
                  <View style={{backgroundColor:'#758283',padding:5,marginLeft:45,marginTop:10,marginRight:22,borderRadius:8}}>
  
                  <Text style={{color:'white'}}>
                  
                  {op.opinion.opinion}
                  </Text>
                  </View>
                  </View>
                )
                 
              })} 
                  </View>
  
            ) : (
                <View>
                  
                    <LottieView source={require('./src/noopinion.json')} autoPlay loop style={{height:300,alignSelf:'center'}}/>
                    <Text style={{alignSelf:'center',color:'#758283',fontWeight:'bold'}}>
                      No Opinion, be he first to share your thoughts
                    </Text>
                  </View>
            )
  
            }
  
  
  
            
            
              </View>
    </TouchableOpacity>
             
              </ScrollView>
  
            </Tab>
            <Tab heading={ <TabHeading style={{backgroundColor: 'white',elevation:0}}><Icon name="apps" style={{color:'#FF6263'}}/></TabHeading>}>
            <ScrollView showsVerticalScrollIndicator={true} 
            keyboardShouldPersistTaps="always"> 
              <TouchableOpacity activeOpacity={1}>
             <View style={{padding:10}}>
                <Text style={styles.textHeading}>
                  Share your Toughts and feelings
                </Text>
                <TouchableHighlight
            style={[styles.profileImgContainer, { borderColor: 'green', borderWidth:1 }]}
          >
      <Image source={{ uri: ARTICLES.authState.user.photoURL}} style={styles.profileImg} />
  </TouchableHighlight> 
                <Text style={styles.textUserName}>
                  @{ARTICLES.authState.user.displayName} <Icon name="flame" style={{color:'#FF6263',fontSize:30}}/> share you thoughts
                  </Text>
                  
                <View style={styles.inputText}>
                <TextInput
        label="Share now"
        value={opinion}
        type="outlined"
        selectionColor="black"
        multiline={true}
        style={{backgroundColor:'white',color:'#EDBF69'}}
        onChangeText={text => setopinion(text)}
      />
                  </View>
                  <View style={{marginTop:8,flexWrap:'wrap',alignSelf:'flex-end'}}>
                    <TouchableOpacity style={{backgroundColor:'#FF6263',height:40,width:120,justifyContent:'center',borderRadius:8}}
                      onPress={()=>postThoughts()}
                    >
                      <Text style={{color:'white',fontWeight:'bold',fontSize:20,alignSelf:'center'}}>
                        Post
                      </Text>
                    </TouchableOpacity>
                    </View>
             </View>
    </TouchableOpacity>
             
              </ScrollView>
  
            </Tab>
            <Tab heading={ <TabHeading style={{backgroundColor: 'white'}}><Icon name="share" style={{color:'#FF6263'}} /><Text> Share</Text></TabHeading>}>
            <ScrollView showsVerticalScrollIndicator={true}>
              <TouchableOpacity activeOpacity={1}>
            
            <View style={styles.gridContainer}>
                {sociailDetails.map(grid => (
                  <TouchableOpacity
                    key={grid.icon}
                    onPress={() => {}}
                    style={styles.gridButtonContainer}
                  >
                    <View style={[styles.gridButton, { backgroundColor: grid.color }]}>
                      <FAIcon name={grid.icon} style={styles.gridIcon} />
                    </View>
                    <Text style={styles.gridLabel}>{grid.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              </TouchableOpacity>
             
             </ScrollView>
            </Tab>
            
          </Tabs>
             
  
          </RBSheet>
          </View> 
          // </Swipeable>
     
      )
    }
    else if(ARTICLES.news.type === 'heading'){
      return(
        // <Swipeable renderLeftActions={() => {goLive}}>
  
   <View style={styles.container}>
       {/* {console.log("news -> ",ARTICLES.news)}
       {console.log("user -> ",ARTICLES.authState.user)} */}
          <View style={styles.topp}>
            <FastImage
              style={{flex: 1}}
              source={{
                uri: ARTICLES.news.pic,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
              
          <View style={[styles.middle, styles.contentPadding]}>
            <View style={{flexDirection:'row'}}>
            <View style={{marginRight:8,backgroundColor:'#5DA3FA',alignSelf:'flex-start',padding:4,marginTop:12,borderRadius:4,flexDirection:'row',alignContent:'space-between'}}>
            
            <Text style={{color:'white',fontSize:18,fontWeight:'bold'}}>Headlines</Text>


            </View>
            <View style={{ backgroundColor:'#E07C24',alignSelf:'flex-start',padding:4,marginTop:12,borderRadius:4,flexDirection:'row',alignContent:'space-between'}}>
            
            <Text style={{color:'white',fontSize:18,fontWeight:'bold'}}>{ARTICLES.news.core}</Text>

            </View>
            
            </View>
           


            <Text style={styles.titlee}>{ARTICLES.news.newsTitle}</Text>
            <Text style={styles.hfrom}>{ARTICLES.news.from}</Text>

           
        
              
        
          
          </View>
  
         
          </View> 
          // </Swipeable>
     
      )
    }
    

  
}


NewsCards.propType = ({

  authState: propType.object.isRequired
})


const mapStateToProps = (state) => ({

  authState: state.auth
})

export default connect(mapStateToProps,null)(NewsCards);


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