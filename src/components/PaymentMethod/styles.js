import { StyleSheet } from 'react-native';
import { s, vs } from 'react-native-size-matters';
import { Color } from '../../utils/Color';
import { Font } from '../../utils/font';

export const styles = StyleSheet.create({
    read_card: {
        borderRadius: s(10),
        backgroundColor: Color.White,
    },
    card: {
        width: '85%',
        padding: 10,
        paddingTop: 30,
        shadowRadius: 0,
        elevation: 2,
        alignSelf: 'center',
    },

    fieldContainer: {
        marginLeft: 10,
        marginBottom: 15,
    },

    fieldInfo_fieldContainer: {
        borderBottomWidth: s(0.5),
        borderBottomColor: 'rgba(0, 0, 0, 0.04)',
        marginVertical: vs(5),
    },
    title: {
        fontSize: s(16),
        color: Color.Black,
        fontFamily: Font.Poppins500,
    },
    text: {
        fontSize: s(14),
        color: Color.Black,
        fontFamily: Font.Poppins400,
        marginTop: vs(5),
    },
});