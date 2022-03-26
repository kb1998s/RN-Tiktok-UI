import { StyleSheet, Text, View, Image, Animated, Easing, FlatList, StatusBar } from 'react-native'
import React, { useRef,  useEffect, useCallback } from 'react'
import { Video } from 'expo-av';
import { getMusicNoteAnim } from './utils'
import { windowWidth, windowHeight } from './assets/data/constant'
import { useBottomTabBarHeight  } from '@react-navigation/bottom-tabs';

export default function VideoItem({ data, isActive }) {
    const {uri, caption, channelName, musicName, likes, comments, avatarUri} = data;
    // console.log(uri +"\n" + caption +"\n" + channelName +"\n" + musicName +"\n" + likes +"\n" + comments +"\n" + avatarUri)

    const discAnimatedValue = useRef(new Animated.Value(0)).current;
    const musicNoteAnimatedValue1 = useRef(new Animated.Value(0)).current;
    const musicNoteAnimatedValue2 = useRef(new Animated.Value(0)).current;
    const discAnimation = {
        transform: [
            {
                rotate: discAnimatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '360deg'],
                }),
            },
        ],
    };

    const musicNoteAnimation1 = getMusicNoteAnim(musicNoteAnimatedValue1, false)
    const musicNoteAnimation2 = getMusicNoteAnim(musicNoteAnimatedValue2, true)
    const discAnimLoopRef = useRef();
    const musicAnimLoopRef = useRef();

    const triggerAnimation = useCallback(
        () => {
            discAnimLoopRef.current = Animated.loop(
                Animated.timing(discAnimatedValue, {
                    toValue: 1,
                    duration: 3000,
                    easing: Easing.linear,
                    useNativeDriver: false,
                }),
            )
            discAnimLoopRef.current.start();
            musicAnimLoopRef.current = Animated.loop(
                Animated.sequence([
                    Animated.timing(musicNoteAnimatedValue1, {
                        toValue: 1,
                        duration: 2000,
                        easing: Easing.linear,
                        useNativeDriver: false,
                    }),
                    Animated.timing(musicNoteAnimatedValue2, {
                        toValue: 1,
                        duration: 2000,
                        easing: Easing.linear,
                        useNativeDriver: false,
                    }),
                ])
            )
            musicAnimLoopRef.current.start();
        },
      [discAnimatedValue, musicNoteAnimatedValue1, musicNoteAnimatedValue2]);
    
    useEffect(() => {
        if (isActive) {
            triggerAnimation();
        } else  {
            discAnimLoopRef.current?.stop();
            musicAnimLoopRef.current?.stop();
            discAnimatedValue.setValue(0);
            musicNoteAnimatedValue1.setValue(0);
            musicNoteAnimatedValue2.setValue(0);
        }
    }, [isActive, triggerAnimation, discAnimatedValue, musicNoteAnimatedValue1, musicNoteAnimatedValue2]);

    const bottomTabHeight = useBottomTabBarHeight();

    return (
    <View style={styles.container, {height: windowHeight - bottomTabHeight}}>
        {/* <StatusBar barStyle={'light-content'}/> */}
        <Video
            // ref={video}
            style={styles.video}
            source={{
            uri
            }}
            shouldPlay = {isActive}
            resizeMode="cover"
            isLooping
            
            // onPlaybackStatusUpdate={status => setStatus(() => status)}
        />
        <View style={styles.bottomSection}>
            <View style={styles.bottomLeftSection}>
                <Text style={styles.channelName}>{channelName}</Text>
                <Text style={styles.caption}>{caption}</Text>
                <View style={styles.musicNameContainer}>
                    <Image 
                        source={require('./assets/images/tiktok/music-note.png')}
                        style={styles.musicNameIcon} />
                    <Text style={styles.musicName}>{musicName}</Text>
                </View>
            </View>
            <View style={styles.bottomRightSection}>
                <Animated.Image
                    source={require('./assets/images/tiktok/floating-music-note.png')}
                    style={[styles.floatingMusicNote, musicNoteAnimation1]}
                />
                <Animated.Image
                    source={require('./assets/images/tiktok/floating-music-note.png')}
                    style={[styles.floatingMusicNote, musicNoteAnimation2]}
                />
                <Animated.Image
                    source={require('./assets/images/tiktok/disc.png')}
                    style={[styles.musicDisc, discAnimation]}
                />
            </View>
        </View>

        <View style={styles.verticalBar}>
            <View style={styles.verticalBarItem, styles.avatarContainer}>
                <Image 
                    style={styles.avatar}
                    source={{uri: avatarUri}}    
                />
                <View style={styles.followButton}>
                    <Image
                        source={require('./assets/images/tiktok/plus-button.png')}
                        style={styles.followIcon}
                    />
                </View>
            </View>
            <View style={styles.verticalBarItem}>
                <Image 
                    style={styles.verticalBarIcon}
                    source={require('./assets/images/tiktok/heart.png')}    
                />
                <Text style={styles.verticalBarText}>{likes}</Text>
            </View>
            <View style={styles.verticalBarItem}>
                <Image 
                    style={styles.verticalBarIcon}
                    source={require('./assets/images/tiktok/message-circle.png')}    
                />
                <Text style={styles.verticalBarText}>{comments}</Text>
            </View>
            <View style={styles.verticalBarItem}>
                <Image 
                    style={styles.verticalBarIcon}
                    source={require('./assets/images/tiktok/reply.png')}    
                />
                <Text style={styles.verticalBarText}>Share</Text>
            </View>
        </View>
    </View> 
    );
}

const styles = StyleSheet.create({
    container: {
        width: windowWidth,
    },
    video: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    bottomSection: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        width: '100%',
        paddingBottom: 16,
    },
    bottomLeftSection: {
        flex: 4,
        marginLeft: 8
    },
    bottomRightSection: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginRight: 8,
    },
    channelName: {
        color: 'white',
        fontWeight: 'bold',
    },
    caption: {
        color: 'white',
        marginVertical: 8,
    },
    musicNameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    musicName: {
        color: 'white',
    },
    musicNameIcon: {
        width: 12,
        height: 12,
        marginRight: 8,
    },
    musicDisc: {
        width: 40,
        height: 40,
    },
    verticalBar: {
        position: 'absolute',
        right: 8,
        bottom: 72,
        // backgroundColor: 'red',
    },
    verticalBarItem: {
        marginBottom: 24,
        alignItems: 'center',
    },
    verticalBarIcon: {
        width: 32,
        height: 32,
    },
    verticalBarText: {
        color: 'white',
        marginTop: 4,
    },
    avatarContainer: {
        marginBottom: 48,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
    },
    followButton: {
        position: 'absolute',
        bottom: -8,
        width: 16,
        height: 16,
    },
    followIcon: {
        width: 20,
        height: 20,
    },
    floatingMusicNote: {
        position: 'absolute',
        right: 40,
        bottom: 16,
        width: 16,
        height: 16,
        tintColor: 'white',
    }
    
});