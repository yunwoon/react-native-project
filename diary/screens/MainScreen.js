import React from 'react';
import { StyleSheet, Text, ScrollView, FlatList, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

export default class MainScreen extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <MaterialCommunityIcons name="calendar-multiselect" size={30} style={{ color: tintColor }} />
    )
  }
  state = {
    selectedDate: '',
    Posts: [
      {
        id : 1,
        title: '02/02',
        content: '오늘 뭐 먹지',
        date: '2020-02-02',
      },
      {
        id : 2,
        title: '02/05',
        content: '일기 어플 UI 완성 했긔',
        date: '2020-02-05',
      },
    ]
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Calendar
          onDayPress={(day) => { this.setState(this.state.selectedDate = day) }}
          current={new Date()} />
        <ScrollView>
          <FlatList
            data={this.state.Posts.filter(data => { return data.date == this.state.selectedDate.dateString })}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  onPress={() => { this.props.navigation.navigate('Detail', { post: item }) }}>
                  <View style={styles.detailbox}>
                    <Text style={styles.detailtitle}>
                      {item.title}
                    </Text>
                    <Text style={styles.detailcontent}>
                    {item.content}
                    </Text>
                  </View>
                </TouchableOpacity>
              )
            }}
            keyExtractor={(item, index) => { return '$(index)' }} />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 100,
  },
  fontcontainer: {
    fontSize: 30,
    fontWeight: "bold",
  },
  detailbox:{
    marginVertical:30,
    marginLeft: 30,
    borderLeftColor: 'lightblue',
    borderLeftWidth: 5,
    paddingLeft: 20,
  },
  detailtitle:{
    fontWeight:'bold',
    fontSize: 40,
  },
  detailcontent:{
    fontSize: 14,
  },
});
