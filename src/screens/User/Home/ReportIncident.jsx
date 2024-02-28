import React, {FC, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
  ToastAndroid,
} from 'react-native';
import {GlobalStyle} from '../../../Constants/GlobalStyle';
import Header from '../../../components/Header/Header';
import CustomInput from '../../../components/CustomInput';
import {Color} from '../../../utils/Color';
import {useForm} from 'react-hook-form';
import Validation from '../../../components/Validation';
import CustomDropDown from '../../../components/CustomDropDownPicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {format} from 'date-fns';
import {
  ActionData,
  FinalData,
  ResidesInEstate,
  Titles,
  good,
} from '../../../Constants/Data';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import Feather from 'react-native-vector-icons/Feather';
import {Font} from '../../../utils/font';
import CustomButton from '../../../components/CustomButton';
import DocumentPicker from 'react-native-document-picker';
import {useDispatch, useSelector} from 'react-redux';
import {AddIncidentApi} from '../../../redux/actions/UserActions';

const resolutionData = [
  {label: 'Commendation', value: 'Commendation'},
  {label: 'Promotion', value: 'Promotion'},
  {label: 'Warning', value: 'Warning'},
  {label: 'Termination', value: 'Termination'},
];
const actionTakerData = [
  {label: 'Police Report', value: 'Police Report'},
  {label: 'Legal Action', value: 'Legal Action'},
  {label: 'Other', value: 'Other'},
  {label: 'No Action', value: 'No Action'},
];
const modeData = [
  {label: 'Written', value: 'Written'},
  {label: 'Verbal', value: 'Verbal'},
];

const ReportIncident = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {userData} = route.params;

  const incidence_types = useSelector(state => state.incidence_types);

  const [index, setIndex] = useState(100);
  const [file, setFile] = useState({});
  const [isDSelected, setIsDSelected] = useState();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [Ddate, setDDate] = useState(new Date());

  const [incidence, setIncidence] = useState('');
  const [resolutions, setResolutions] = useState('');
  const [action, setAction] = useState('');
  const [actionNo, setActionYes] = useState(true);
  const [mode, setMode] = useState('');
  const [rate, setRate] = useState('');
  const [loader, setLoader] = useState(false);


  const [incidntCh, setIncidntCh] = useState(false);
  const [resolutionCh, setResolutionCh] = useState(false);
  const [actionTakenCh, setActionTakenCh] = useState(false);
  const [modeCh, setModeCh] = useState(false);
  const [rateEmployeeCh, setRateEmployeeCh] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({mode: 'all'});

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const selectAudio = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });

      console.log('Selected audio file:', result);
      const AudioSource = {
        name: result?.[0]?.name,
        uri: result?.[0]?.uri,
        type: result?.[0]?.type,
      };

      setFile(AudioSource);
    } catch (err) {
      console.log('Error: ', err);
    }
  }; 

  const addIncident = data => {
    if(incidence){
      if(resolutions){
        if(action){
          if(mode){
            if(rate){
              dispatch(
                AddIncidentApi(
                  incidence,
                  data,
                  resolutions,
                  action,
                  mode,
                  rate,
                  file,
                  userData,
                  setLoader,
                  ToastAndroid,
                  navigation,
                ),
              );
            }else{
              setRateEmployeeCh(true)
              // alert('Rate Employee is required!')
              setModeCh(false)
              setActionTakenCh(false)
              setResolutionCh(false)
              setIncidntCh(false)
         
            }
          }else{
            setModeCh(true)
            setRateEmployeeCh(false)
            setActionTakenCh(false)
            setResolutionCh(false)
            setIncidntCh(false)
            // alert('Mode is required!')
          }
        }else{
          setActionTakenCh(true)

          setRateEmployeeCh(false)
          setModeCh(false)
          setResolutionCh(false)
          setIncidntCh(false)
          // alert('Action Taken is required!')
        }
      }else{
        setResolutionCh(true)

        setRateEmployeeCh(false)
        setModeCh(false)
        setActionTakenCh(false)
        setIncidntCh(false)
        // alert('Resolution is required!')
      }
    }else{
      setIncidntCh(true)
      setRateEmployeeCh(false)
      setModeCh(false)
      setActionTakenCh(false)
      setResolutionCh(false)
      // alert('Incidence is required!')
    }

  };

  const getActionCheck = name => {
    setAction(name)
    if(name == 'No Action'){
      setActionYes(true)
    }else{
      setActionYes(false)
    }
  }

  return (
    <SafeAreaView style={GlobalStyle.container}>
      <Header title="Report Incident" gapp />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[GlobalStyle.grey_container, GlobalStyle.Padding]}>
          <CustomDropDown
            Heading={'Incidence'}
            items={incidence_types}
            value={incidence}
            setValue={val => (setIncidence(val),setIncidntCh(false))}
          />
          {
             incidntCh && <Validation title={'Incidence is required!'} />
          }

          <CustomInput
            multiline={true}
            onFocus={() => {
              setIndex(0);
            }}
            style={{
              borderColor:
                index === 0
                  ? Color.Main
                  : errors.email
                  ? Color.red
                  : Color.border,
              // height: 70,
            }}
            Heading="Assessment"
            control={control}
            name="assessment"
            rules={{
              required: 'Assessment is required',
            }}
            placeholder="Assessment"
          />
          {errors.assessment && (
            <Validation title={errors.assessment.message} />
          )}

          <CustomDropDown
            Heading={'Resolution'}
            items={resolutionData}
            value={resolutions}
            setValue={val => (setResolutions(val),setResolutionCh(false))}
          />
           {
             resolutionCh && <Validation title={'Resolution is required!'} />
          }

          <CustomDropDown
            Heading={'Action Taken'}
            items={actionTakerData}
            value={action}
            setValue={val => (getActionCheck(val),setActionTakenCh(false))}
          />
              {
             actionTakenCh && <Validation title={'Action Taken is required!'} />
          }
          <CustomDropDown
            Heading={'Mode'}
            items={modeData}
            value={mode}
            setValue={val => (setMode(val),setModeCh(false))}
          />
              {
             modeCh && <Validation title={'Mode is required!'} />
          }
          {/* <CustomDropDown
            Heading={'Documentation'}
            items={ResidesInEstate}
            value={yes}
            setValue={val => setYes(val)}
          /> */}
          <CustomDropDown
            Heading={'Rate Employee'}
            items={good}
            value={rate}
            setValue={val => (setRate(val),setRateEmployeeCh(false))}
          />
              {
             rateEmployeeCh && <Validation title={'Rate Employee is required!'} />
          }
        </View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onCancel={hideDatePicker}
          onConfirm={date => {
            setDatePickerVisibility(false);
            setIsDSelected(true);
            setDDate(date);
            console.log('date', date);
          }}
        />
        {actionNo  ? null : (
          <CustomButton
            onPress={selectAudio}
            Ripple={GlobalStyle.PurpleRipple}
            File={file?.uri ? false : true}
            FontAwesome={file?.uri ? true : false}
            textStyle={{color: file?.uri ?  "white" : Color.Black}}
            ButtonStyle={[styles.uploadBtn,{ backgroundColor: file?.uri ? 'green' : Color.UploadBtnColor}]}
            title={file?.uri ? 'File uploaded' : "Uplaod File"}
          />
        )}
        <View style={{height: 15}} />
      </ScrollView>
      <View style={GlobalStyle.EndBtnBox}>
        <CustomButton
          onPress={handleSubmit(addIncident)}
          Ripple={GlobalStyle.WhiteRipple}
          title="Add"
          loader={loader}
          disabled={loader}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  DateBoX: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    height: 50,
    backgroundColor: Color.White,
    overflow: 'hidden',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Color.border,
    marginTop: 10,
  },
  ChooseText: {
    fontSize: 14,
    color: Color.MidGrey,
    fontFamily: Font.Inter500,
  },
  uploadBtn: {
    backgroundColor: Color.UploadBtnColor,
    borderWidth: 2,
    borderStyle: 'dotted',
    borderColor: Color.MidGrey,
    marginTop: 15,
  },
});

export default ReportIncident;
