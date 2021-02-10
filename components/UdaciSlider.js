import React from 'react'
import { View, Text, Slider, StyleSheet } from 'react-native'
import { gray } from '../utils/colors'


export default function UdaciSlider ({ max, unit, step, value, onChange }) {
    return (
        <View style={styles.row}>
            <Slider
                style={{flex: 1}}
                step={step}
                value={value}
                maximumValue={max}
                minimumValue={0}
                onValueChange={onChange}
            />
            <View style={styles.metricCounter}>
                <Text style={{textAlign: 'center', fontSize: 24}}>{value}</Text>
                <Text style={{color: gray, fontSize: 18}}>{unit}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center'
    },
    metricCounter: {
        width: 85,
        justifyContent: 'center',
        alignItems: 'center'
    },
})