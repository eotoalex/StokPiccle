import {StyleSheet} from 'react-native';

const styles = StyleSheet.create ({

    container: {
        flex: 2,
      },
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
      },
      input:{
          borderWidth:1,
          borderColor:'#777',
          padding:8,
          margin:10,
          width:200
      },
      errMsg:{
        color:"red",
        opacity: 100
      },
      registerLink:{
        color:"blue"
      }

});

export default styles