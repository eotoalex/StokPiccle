import React, {Component} from 'react';
import {
  View,
  Text,
} from 'react-native';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  title:{
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: "#20232a",
    borderRadius: 6,
    backgroundColor: "#61dafb",
    color: "#20232a",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold"
  }
})

function Login () {
  
  
    return (
    <View>
      <Text style={styles.title} >Login</Text>
      
    </View>
    )
  }
