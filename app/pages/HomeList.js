import React, { Component } from "react";
import { View, Text, FlatList, StyleSheet } from 'react-native';

class HomeCell extends Component {
  render() {
    return (
      <View style={styles.homeCell}>
        <Text>{this.props.value}</Text>
      </View>
    );
  }
}

const listArr = [
  { key: '1', component: '123' },
  { key: '2', component: '123' },
  { key: '3', component: '123' },
  { key: '4', component: '123' },
  { key: '5', component: '123' },
  { key: '6', component: '123' },
  { key: '7', component: '123' },
  { key: '8', component: '123' },
  { key: '9', component: '123' },
  { key: '10', component: '123' },
];

export default class HomeList extends Component {
  render() {
    return (
      <View style={styles.homeList}>
        <FlatList
          data={listArr}
          renderItem={({ item }) =>
            <HomeCell value={item.key} />
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  homeList: {
    width: "auto",
    height: 400,
    backgroundColor: "#129999"
  },
  homeCell: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "#123123",
    borderBottomWidth: 1
  }
});