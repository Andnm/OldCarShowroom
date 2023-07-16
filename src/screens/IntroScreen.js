import { View, Text, StyleSheet } from "react-native";
import React, {useEffect} from 'react';

const Intro = ({ navigation }) => {

    useEffect(() => {
        const timer = setTimeout(() => {
          navigation.navigate('Home');
        }, 2000);
    
        return () => clearTimeout(timer);
    
      }, [navigation]);

    return (
        <View style={styles.container}>
            <Text style={styles.content}>
                Driveconn
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundImage: 'linear-gradient(to bottom, #19779B, #17B3A6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        fontSize: 40,
        fontWeight: 700,
        color: "white",
        fontStyle: "italic",
    },
});

export default Intro