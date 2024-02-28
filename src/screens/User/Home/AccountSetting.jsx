import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  useWindowDimensions,
} from 'react-native';
import React, {useState, useEffect, FC} from 'react';
import {GlobalStyle} from '../../../Constants/GlobalStyle';
import Header from '../../../components/Header/Header';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import PersonalDetail from '../SwipeScreens/PersonalDetail';
import WorkDetail from '../SwipeScreens/WorkDetail';
import {scale} from 'react-native-size-matters';
import {Font} from '../../../utils/font';
import {Color} from '../../../utils/Color';
import CorporateAccSet from './CorporateAccSet';
import { useDispatch, useSelector } from 'react-redux';
import { ACCOUNT_SET_INDEX, DRAWER_COLOR } from '../../../redux/reducer/Holder';

const AccountSetting = () => {
  const dispatch = useDispatch();
  const user_detail = useSelector(state => state.user_detail);
  const account_set_index = useSelector(state => state.account_set_index);
  const FirstRoute = () => <PersonalDetail />;
  const SecRoute = () => <WorkDetail />;

  const renderScene = SceneMap({
    First: FirstRoute,
    Second: SecRoute,
  });

  const layout = useWindowDimensions();
  const [index, setIndex] = useState(account_set_index);
  const [routes, setRoutes] = useState([
    {key: 'First', title: 'Personal Detail', type: 'first'},
    {key: 'Second', title: 'Work Detail'},
  ]);

  useEffect(() => {
    dispatch({ type:DRAWER_COLOR, payload: false })
    setRoutes([
      {key: 'First', title: 'Personal Details', type: 'first'},
      {key: 'Second', title: 'Work Details'},
    ]);
  }, []);
  const renderTabBar = props => (
    <View
      style={{
        alignItems: 'center',
        width: '100%',
      }}>
      <TabBar
        {...props}
        indicatorStyle={{backgroundColor: Color.Main, marginLeft: '15%'}}
        contentContainerStyle={{marginLeft: '10%'}}
        style={{
          backgroundColor: Color.LightGrey,
          elevation: 10,
          width: '100%',
          // alignSelf: 'center',
          // justifyContent: 'space-between',
        }}
        renderLabel={({route, focused, color}) => (
          <>
            <Text
              style={{
                fontFamily: Font.Poppins500,
                fontSize: scale(13),
                color: focused ? Color.Main : Color.Grey,
              }}>
              {route.title}
            </Text>
          </>
        )}
        activeColor={{color: Color.Main}}
        inactiveColor={{color: Color.Grey}}
        // tabStyle={{width: scale(117)}}
        bounces={true}
        scrollEnabled={true}
      />
    </View>
  );
  return (
    <SafeAreaView style={GlobalStyle.grey_container}>
      <Header title="Account Setting" gapp />
      {/* <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}> */}
  {
    user_detail?.Role == 'corporate' ?
    <CorporateAccSet />
:
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={(indx)  => (setIndex(indx), dispatch({ type:ACCOUNT_SET_INDEX, payload: indx }))}
        initialLayout={{width: layout.width}}
      />
  }
      {/* </View> */}
    </SafeAreaView>
  );
};

export default AccountSetting;

const styles = StyleSheet.create({});
