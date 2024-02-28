import React, { useState } from 'react';
import { Dimensions, Platform, StyleSheet, Text, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { useDispatch, useSelector } from 'react-redux';


const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;
const width = Dimensions.get('screen').width

const DoubleText = (props) => {
    return (
        <SkeletonPlaceholder   backgroundColor={'#0a21424d'}>
            <SkeletonPlaceholder.Item flexDirection="row" alignItems="center" marginTop={props.marginTop}>
                <SkeletonPlaceholder.Item
                    width={props.width}
                    height={props.height}
                />
            </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
    )
}

export default DoubleText

const styles = StyleSheet.create({})