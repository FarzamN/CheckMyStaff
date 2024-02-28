import React from 'react';
import dayjs from 'dayjs';
import {styles} from './styles';
import Card from './Card';
import FieldInfo from './FieldInfo';

const PaymentItem = ({item, index}) => {
  console.log(
    'Date in Item ==> 19/03/2023',
    dayjs('13/3/2023 11:58:12').format('DD-MM-YYYY'),
  );
  return (
    <Card
      style={[
        styles.card,
        {marginBottom: 15},
        index === 0 && {
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        },
      ]}>
      {/* <FieldInfo
        style={styles.fieldContainer}
        title="Payment ID"
        text={item.paymentid}
      />
      <FieldInfo
        style={styles.fieldContainer}
        title="Email"
        text={item.Email}
      /> */}
      {/* <FieldInfo
        style={styles.fieldContainer}
        title="First Name"
        text={item.First_Name}
      />
      <FieldInfo
        style={styles.fieldContainer}
        title="Last Name"
        text={item.Last_Name}
      /> */}
      <FieldInfo
        style={styles.fieldContainer}
        title="Order Number"
        text={item.OrderNumber}
      />
      <FieldInfo
        style={styles.fieldContainer}
        title="Amount Paid"
        text={item.AmountPaid}
      />
      <FieldInfo
        style={styles.fieldContainer}
        title="Payment Date"
        text={`${dayjs(item.PaymentDate).format('DD-MM-YYYY')}`}
      />
    </Card>
  );
};

export default PaymentItem;
