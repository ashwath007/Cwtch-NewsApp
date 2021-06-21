import React,{useRef} from 'react';
import { StyleSheet,View,SafeAreaView,Text,Dimensions ,TouchableOpacity, ScrollView} from 'react-native';
import FastImage from 'react-native-fast-image'
import {  FONT_SIZE_EXTRA_LARGE,
    FONT_SIZE_NORMAL,
    FONT_SIZE_LARGE,
    FONT_SIZE_SMALL,} from '../constants/Dimens';
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
  import { TabBar } from 'react-native-tab-view';
  import { Container, Header, Tab, Tabs, TabHeading, Icon } from 'native-base';

  const SCREEN_WIDTH = Dimensions.get("window").width;
  const SCREEN_HEIGHT = Dimensions.get("window").height;

const NewsCards = (ARTICLES) => {
  const bottomSheetRef = useRef([]);
    
  const goLive = () => {
    return navigation.navigate("WebViews")
  }
 
  

    return(
      // <Swipeable renderLeftActions={() => {goLive}}>

 <View style={styles.container}>
     {/* {console.log(ARTICLES.news.pic)} */}

        <View style={styles.top}>
          <FastImage
            style={{flex: 1}}
            source={{
              uri: ARTICLES.news.pic,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
            
        <View style={[styles.middle, styles.contentPadding]}>
          <Text style={styles.title}>{ARTICLES.news.newsTitle}</Text>
          <Text style={styles.description}
          numberOfLines={9} 
          
          >{ARTICLES.news.newsDetails}</Text>
          {/* <Text style={styles.byLine} numberOfLines={1} ellipsizeMode="tail"> */}
            {/* {this.getByLineText()} */}
          {/* </Text> */}
            <TouchableOpacity onPress={() => bottomSheetRef.current.open()}>
              <Text style={{color:'#FF6263',fontSize:12}}>
                  Interact
              </Text>
            </TouchableOpacity>
        </View>

        {/* <View style={[styles.footer, styles.contentPadding]}>
          <Text
            style={styles.footerTitle}
            numberOfLines={1}
            ellipsizeMode="tail">
          </Text>
          <Text
            style={styles.footerSubtitle}
            numberOfLines={1}
            ellipsizeMode="tail">
          </Text>
        </View> */}
          <RBSheet
        ref={(el) => (bottomSheetRef.current = el)}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={SCREEN_HEIGHT-300}
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
             <Container>
          <ScrollView>
            <View>
                   
         

        <Tabs
   
        tabBarUnderlineStyle={{borderBottomWidth:2}}
      
        >
          <Tab style={{flex:1}} heading={ <TabHeading style={{backgroundColor: 'white'}}><Icon name="people" style={{color:'#FF6263'}} /><Text> Opinion</Text></TabHeading>}>
            <Text style={{padding:10}}>
            Many of the components require the react-native-vector-icons library to render correctly. If you're using Expo, you don't need to do anything extra, but if it's a vanilla React Native project, you need link the library as described in the getting started guide.

If you opted out of vector icons support using babel-plugin-optional-require, you won't be able to use icon names for the icon prop. Some components may not look correct without vector icons and might need extra configuration.
              </Text> 
          </Tab>
          <Tab heading={ <TabHeading style={{backgroundColor: 'white'}}><Icon name="apps" style={{color:'#FF6263'}}/></TabHeading>}>
          <View style={{padding:10}}>
            
              </View> 
          </Tab>
          <Tab heading={ <TabHeading style={{backgroundColor: 'white'}}><Icon name="share" style={{color:'#FF6263'}} /><Text> Share</Text></TabHeading>}>
          <Text style={{padding:10}}>
            Many of the components require the react-native-vector-icons library to render correctly. If you're using Expo, you don't need to do anything extra, but if it's a vanilla React Native project, you need link the library as described in the getting started guide.

If you opted out of vector icons support using babel-plugin-optional-require, you won't be able to use icon names for the icon prop. Some components may not look correct without vector icons and might need extra configuration.
              </Text> 
          </Tab>
          
        </Tabs>
    
            </View>
          </ScrollView>
          </Container>
        </RBSheet>
        </View> 
        // </Swipeable>
   
    )
}

export default NewsCards;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      height: SCREEN_HEIGHT,
      backgroundColor: WHITE,
    },
    top: {
      backgroundColor: WHITE,
      flex: 2.5,
    },
    middle: {
      backgroundColor: WHITE,
      flex: 5,
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
      fontFamily: FONT_REGULAR,
      fontWeight: '400',
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
  });