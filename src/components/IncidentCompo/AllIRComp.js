import React, { FC, useEffect, useRef, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Pressable,
    ScrollView,
    Dimensions,
    Button,
    TouchableOpacity,
    Platform,
    Linking
} from 'react-native';
import { GlobalStyle } from '../../Constants/GlobalStyle';
import Header from '../Header/Header';
import { IncidentData } from '../../Constants/Data';
import CustomButton from '../CustomButton';
import { scale } from 'react-native-size-matters';
import { verticalScale } from 'react-native-size-matters';
import { Color } from '../../utils/Color';
import { Font } from '../../utils/font';
import { moderateScale } from 'react-native-size-matters';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import { moderateVerticalScale } from 'react-native-size-matters';
import KeyValue from '../Cards/KeyValue';
import { format } from 'date-fns';
import RNFS from 'react-native-fs';
import * as Progress from 'react-native-progress';
import { DOC_BASE_URL } from '../../Constants/Urls';


import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Toast from 'react-native-simple-toast';


const windowWidth = Dimensions.get('window').width;
const AllIRComp = ({ item, date }) => {

    const [sound, setSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [uri, setUri] = useState(null);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [isDownloaded, setIsDownloaded] = useState(false);
    const [downloadProgress, setDownloadProgress] = useState(0);
    const [isPlaybackComplete, setIsPlaybackComplete] = useState(false);
    const [btnShow, setBtnShow] = useState(true);


    const requestStoragePermission = async () => {
        try {
            const storagePermissionStatus = await check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);

            if (storagePermissionStatus === RESULTS.GRANTED) {
                console.log('Storage permission granted');
                return true;
            } else if (storagePermissionStatus === RESULTS.DENIED) {
                const result = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
                if (result === RESULTS.GRANTED) {
                    console.log('Storage permission granted');
                    return true;
                } else {
                    // console.log('Storage permission denied');
                    Toast.show('Storage permission denied');
                    return false;
                }
            } else {
                console.log('Unexpected storage permission status:', storagePermissionStatus);
                return false;
            }
        } catch (err) {
            console.log(err);
            return false;
        }
    };

    useEffect(() => {
        const checkAndSetDownloaded = async () => {
            const audioFileName = `IncidentReportFile_${item?.id}_.pdf`;
            const localAudioURI = `${RNFS.ExternalStorageDirectoryPath}/Download/${audioFileName}`;
            console.log('localAudioURI', localAudioURI)
            const exists = await RNFS.exists(localAudioURI);
            setIsDownloaded(exists);

            // console.log('exists  c', exists)
    
            if (exists) {
                setUri(`file://${localAudioURI}`);
            }
        };
    
        checkAndSetDownloaded();
    }, [item?.id,isDownloaded]);
    
    const downloadAudio = async elmnt => {
        const isPermissionGranted = await requestStoragePermission();

        if (!isPermissionGranted) {
            Toast.show('Permission denied. Cannot download file.');
            return;
        }

        Toast.show('Downloading file');
        if (!isDownloaded) {
            const remoteAudioURL = `${DOC_BASE_URL}${elmnt?.ExternalReport}`;
            const pdfFileName = `IncidentReportFile_${elmnt?.id}_.pdf`;
            // const pdfFileName = `${elmnt?.id}_${elmnt?.Date_Submitted}.pdf`;
            const pdfDirectory = `${RNFS.ExternalStorageDirectoryPath}/Download`;
            const pdfURI = `${pdfDirectory}/${pdfFileName}`;
    
            try {
                // Check if the directories exist, create if not
                const checkDirectories = async () => {
                    const filesDirExists = await RNFS.exists(pdfDirectory);
                    if (!filesDirExists) await RNFS.mkdir(pdfDirectory);
                };
    
                await checkDirectories();
    
                const options = {
                    fromUrl: remoteAudioURL,
                    toFile: pdfURI,
                    progress: res => {
                        const percentage = (res.bytesWritten / res.contentLength) * 100;
                        setDownloadProgress(percentage);
                        console.log('percentage', percentage);
                    },
                };
    
                const downloadResult = await RNFS.downloadFile(options).promise;
                setBtnShow(false);
                Toast.show('File downloaded successfully!');
                console.log('downloadResult', downloadResult);
    
                if (downloadResult.statusCode === 200) {
                    setDownloadProgress(100);
                    setUri(`file://${pdfURI}`);
                    setIsDownloaded(true);
                } else {
                    console.log('Download failed:', downloadResult.statusCode);
                }
            } catch (error) {
                console.log('Error creating folders or downloading:', error.message);
            }
        }
    };
    
    
    
    
    const openDownloadedFile = async () => {
        if (isDownloaded) {
            const localAudioFileName = `IncidentReportFile_${item?.id}_.pdf`;;
            const localAudioDirectory = `${RNFS.ExternalStorageDirectoryPath}/Download`;
            const localAudioURI = `${localAudioDirectory}/${localAudioFileName}`;
    
            try {
                if (Platform.OS === 'android') {
                    // Open file explorer or gallery on Android
                    const success = await RNFS.exists(localAudioURI);
                    if (success) {
                        console.log('Opening file explorer on Android:', localAudioDirectory);
                        Toast.show('File has been downloaded to your Download folder.');
                        // Use react-native-document-picker to open the folder on Android
                        // const result = await DocumentPicker.pick({
                        //     type: [DocumentPicker.types.pdf],
                        // });
    
                        // // Use react-native-fs to read the content of the folder and open it
                        // const content = await RNFS.readFile(result.uri, 'base64');
                        // const openedFolderURI = `data:${result.type};base64,${content}`;
                        // Linking.openURL(openedFolderURI);
                    } else {
                        console.log('File not available yet.');
                    }
                } else if (Platform.OS === 'ios') {
                    // Handle iOS file opening logic here
                    // You might want to use a different library or API for iOS
                    console.log('Opening directories directly is not supported on iOS.');
                }
    
                // Show success message or any other logic
                console.log('File explorer opened successfully');
            } catch (error) {
                console.log('Error opening file explorer:', error);
            }
        } else {
            console.log('File not downloaded yet.');
        }
    };
    
    
    

    return (
        <View style={{ paddingHorizontal: 20 }}>
            {/* <Text style={styles.Date}>{date}</Text> */}
            <View
                style={[
                    styles.ItemBox,
                    {
                        backgroundColor:
                            item?.rate == 'Good' ? '#F1F5F9' : '#F9F2F2',
                        borderColor:
                            item?.rate == 'Good' ? '#4991E7' : '#EB5757',
                    },
                ]}>
                <KeyValue
                    keys="Reported Incidence"
                    value={item?.Incident}
                />
                <KeyValue keys="Date Submitted" value={date} />
                <KeyValue keys="Assessment" value={item?.Comment} />
                <KeyValue keys="Resolution" value={item?.Resolution} />
                <KeyValue keys="Mode" value={item?.Feedback_Mode} />
                <KeyValue
                    keys="Action Taken"
                    value={item?.External_Action_Taken}
                />
                <KeyValue keys="Incidence type" value={item?.rate} />
                <KeyValue
                    keys="Documentation"
                    value={item?.ExternalReport ? 'Yes' : 'NO'}
                />
                {item?.ExternalReport ? (
                    uri ?
                        <Pressable
                        onPress={openDownloadedFile}
                            style={[styles.btnBox, GlobalStyle.Row]}
                            android_ripple={GlobalStyle.WhiteRipple}>
                            <View style={styles.IconBox}>
                                <Fontisto
                                    name="paperclip"
                                    color={Color.White}
                                    size={scale(15)}
                                />
                            </View>
                            <Text style={styles.BtnText}>
                                Downloaded{' '}
                                {/* <Text style={styles.lineText}>file</Text> */}
                            </Text>
                        </Pressable>


                        : downloadProgress > 0 && downloadProgress < 99 ? (
                            <View
                                style={[styles.btnBox, GlobalStyle.Row]}
                                android_ripple={GlobalStyle.WhiteRipple}>
                                <Progress.Circle
                                    showsText
                                    size={40}
                                    borderWidth={0}
                                    progress={downloadProgress / 100}
                                    indeterminate={downloadProgress === 0}
                                    animated={true}
                                    textStyle={{
                                        fontFamily: Font.Poppins800,
                                        fontSize: scale(12),
                                        color: Color.Purple,
                                        justifyContent: 'center',
                                    }}
                                    fill="#00000000"
                                    color={Color.Purple}
                                    unfilledColor={'#E3DAEE'}
                                />
                            </View>
                        ) : (
                            <Pressable
                                onPress={() => downloadAudio(item)}
                                style={[styles.btnBox, GlobalStyle.Row]}
                                android_ripple={GlobalStyle.WhiteRipple}>
                                <View style={styles.IconBox}>
                                    <Fontisto
                                        name="paperclip"
                                        color={Color.White}
                                        size={scale(15)}
                                    />
                                </View>
                                <Text style={styles.BtnText}>
                                    Download{' '}
                                    <Text style={styles.lineText}>file</Text>
                                </Text>
                            </Pressable>
                        )
                ) : null}
            </View>
        </View>
    )
}

export default AllIRComp
const styles = StyleSheet.create({
    containerStyle: {
        borderRadius: scale(100),
        height: verticalScale(40),
        width: '32%',
        borderWidth: scale(1),
        marginRight: scale(5),
    },
    ChangeText: {
        fontSize: scale(13),
    },
    Date: {
        color: Color.Black,
        fontFamily: Font.Inter500,
        fontSize: scale(15),
        marginTop: verticalScale(20),
    },
    ItemBox: {
        borderWidth: scale(1),
        borderRadius: scale(8),
        padding: moderateScale(10),
        marginTop: verticalScale(15),
        marginBottom: 20,
    },
    btnBox: {
        backgroundColor: '#A0A4AD',
        borderRadius: 100,
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: moderateVerticalScale(10),
        marginTop: verticalScale(10),
        overflow: 'hidden',
    },
    lineText: {
        textDecorationLine: 'underline',
    },
    BtnText: {
        color: Color.White,
        fontSize: scale(16),
        marginLeft: scale(8),
    },
    IconBox: {
        borderWidth: scale(1.5),
        borderColor: Color.White,
        borderRadius: scale(5),
        padding: moderateScale(3),
    },
    arrowBox: {
        overflow: 'hidden',
        borderRadius: scale(100),
        justifyContent: 'center',
        alignContent: 'center',
    },
    Row: {
        paddingHorizontal: 15,
        marginVertical: 3,
    },
    container: {
        flex: 1,
    },
    incidentItem: {
        width: windowWidth,
        padding: 16,
        borderWidth: 1,
        borderColor: '#ddd',
    },
});