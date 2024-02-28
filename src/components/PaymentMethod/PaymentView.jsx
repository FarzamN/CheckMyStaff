import React from 'react';
import {Paystack} from 'react-native-paystack-webview';
import {View} from 'react-native';

function PaymentView(props) {
  return (
    <View style={{flex: 1}}>
      <Paystack
        //pk_live_cc7e8c489114eceac097716cf2e1d8c3b74502e4
        //pk_test_d9b608110f40b3befeb2fa1ff65b2a9b92cd2716

        paystackKey="pk_test_d9b608110f40b3befeb2fa1ff65b2a9b92cd2716"
        channels={['card', 'bank', 'ussd', 'qr', 'mobile_money']}
        amount={props.amount}
        billingEmail={props.email}
        activityIndicatorColor="green"
        onCancel={props.onCancel}
        onSuccess={props.onSuccess}
        autoStart
      />
    </View>
  );
}

export default PaymentView;
