import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Paystack} from 'react-native-paystack-webview';
import {Color} from '../../../utils/Color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GlobalStyle} from '../../../Constants/GlobalStyle';
import {useDispatch, useSelector} from 'react-redux';
import {BaseUrl} from '../../../Constants/Urls';
import {CommonActions} from '@react-navigation/native';
import {PAYMENT_COMPLETE} from '../../../redux/reducer/Holder';

const Payment = ({route, navigation}) => {
  const {amount} = route.params;
  const dispatch = useDispatch();
  const user_detail = useSelector(state => state.user_detail);
  // console.log(amount);
  const paymenHandler = () => {
    setTimeout(() => {
      navigation.goBack();
    }, 100);
  };

  const saveTransaction = async transactionid => {
    console.log('working payment');
    var myHeaders = new Headers();
    let theData = new FormData();

    const TokenData = await AsyncStorage.getItem('token');
    const Token = JSON.parse(TokenData);
    console.log(Token);
    myHeaders.append('Authorization', `Bearer ${Token}`);
    // theData.append('customerId', user.CustomerID)
    theData.append('OrderNumber', transactionid);
    theData.append('AmountPaid', String(amount));
    try {
      const response = await fetch(
        `https://api.checkmypeople.logicsdrive.net/checkMyStaff/member/load-wallet-account`,
        {
          method: 'POST',
          headers: myHeaders,
          body: theData,
          redirect: 'follow',
        },
      );
      const responseData = await response.json();

      if (responseData?.status == 200) {
        console.log('========>', responseData);
        return responseData;
      } else {
        console.log(responseData?.message);
        navigation.goBack();
      }
    } catch (error) {
      console.log('Something went wrong', error);
    }
  };
  return (
    <SafeAreaView style={GlobalStyle.container}>
      <Paystack
        // paystackKey="pk_live_cc7e8c489114eceac097716cf2e1d8c3b74502e4"
        paystackKey="pk_test_d9b608110f40b3befeb2fa1ff65b2a9b92cd2716"
        channels={['card', 'bank', 'ussd', 'qr', 'mobile_money']}
        amount={String(amount)}
        billingEmail={user_detail.Email}
        activityIndicatorColor={Color.Main}
        onCancel={paymenHandler}
        onSuccess={res => {
          saveTransaction(res.data.transactionRef.reference).then(
            async data => {
              const parsedUser = JSON.stringify(data.customer);
              await AsyncStorage.setItem('user_detail', parsedUser);
              navigation.goBack();
              navigation.goBack();
              dispatch({type: PAYMENT_COMPLETE, payload: true});
            },
          );
        }}
        autoStart={true}
      />
    </SafeAreaView>
  );
};

export default Payment;

const styles = StyleSheet.create({});

// import {View, TouchableOpacity, Text} from 'react-native';
// import {CommonActions} from '@react-navigation/native';

// function Payment() {
//

//   //   const saveTransaction = async (transactionid) => {
//   //     var myHeaders = new Headers()
//   //     myHeaders.append('Authorization', `Bearer ${user.plain_text_token}`)
//   //     var formdata = new FormData()
//   //     formdata.append('customerId', user.CustomerID)
//   //     formdata.append('OrderNumber', transactionid)
//   //     formdata.append('AmountPaid', route.params.amount)
//   //     try {
//   //       const response = await fetch(
//   //         `${new_base_url}/customer/load-wallet-account`,
//   //         {
//   //           method: 'POST',
//   //           headers: myHeaders,
//   //           body: formdata,
//   //           redirect: 'follow',
//   //         },
//   //       )
//   //       const responseData = await response.json()

//   //       if (responseData.status == 200) {
//   //         console.log('========>', responseData)
//   //         return responseData
//   //       } else {
//   //         alert(responseData.message)
//   //         navigation.goBack()
//   //       }
//   //     } catch (error) {
//   //       console.log('Something went wrong', error)
//   //     }
//   //   }

//   return (
//     <View style={{flex: 1}}>
//       <Paystack
//
//         // paystackKey="pk_test_d9b608110f40b3befeb2fa1ff65b2a9b92cd2716"
//         // paystackKey="pk_live_cc7e8c489114eceac097716cf2e1d8c3b74502e4"
//
//         // billingEmail={user.Email}
//
//
//         // onCancel={(e) => {
//         //   // handle response here
//         //   navigation.goBack()
//         // }}
//         onCancel={paymenHandler}
//         // onSuccess={(res) => {
//         //   console.log('hey man', res.data.transactionRef.reference)
//         //   saveTransaction(res.data.transactionRef.reference).then(
//         //     async (data) => {
//         //       console.log('===========>', data)
//         //       setUser(data.customer)
//         //       const parsedUser = JSON.stringify(data.customer)
//         //       await AsyncStorage.setItem('user', parsedUser)
//         //       navigation.dispatch(
//         //         CommonActions.reset({
//         //           index: 0,
//         //           routes: [
//         //             // {
//         //             //   name: user ? 'dashboard' : 'profile',
//         //             // },
//         //             {
//         //               name: 'dashboard',
//         //               params: {
//         //                 replacedFromLicense: true,
//         //               },
//         //             },
//         //           ],
//         //         }),
//         //       )
//         //     },
//         //   )
//         //   // handle response here
//         // }}
//
//       />
//     </View>
//   );
// }

// export default Payment;
