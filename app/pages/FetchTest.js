
import React, { Component } from "react";
import {
  View,
  Text,
  Button
} from 'react-native';

import HttpUtil from '../Tool/HttpUtil';
import JsonUtil from '../Tool/JsonUtil';

export default class FetchTest extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: '返回结果'
    }
  }

  get() {
    HttpUtil.get('https://facebook.github.io/react-native/movies.json')
      .then(result => this.setState({ text: JSON.stringify(result) }))
      .catch(error => this.setState({ text: "请求失败，接口不通" }))
  }

  post() {
    var data = { username: 'ayuhani', password: '123456' }
    HttpUtil.post('http://rapapi.org/mockjsdata/26411/ayuhani/post', data)
      .then(result => this.setState({ text: JSON.stringify(result) }))
      .catch(error => this.setState({ text: "请求失败，接口不通" }))
  }

  localJson() {

    let carList = require('../Tool/mock/carList.json');
    let jsonStr = JsonUtil.jsonToStr(carList);
    let strJson = JsonUtil.strToJson(jsonStr)
    let jsonToMap = JsonUtil.jsonToMap(jsonStr);

    console.log("json 转 string:" + jsonStr);
    console.log("string 转 json:" + strJson);
    console.log("string 转 map:" + jsonToMap);

    console.log("data type:" + typeof (carList));
    console.log("carList.success:" + carList.success);
    console.log("carList.errMsg:" + carList.errMsg);

    let body = carList.body;
    console.log("carList.body:" + body);

    let list = body.list;
    if (Array.isArray(list)){
      for(let i=0;i<list.length;i++){
        let car = list[i];
        console.log("car.wareId:" + car.wareId);
        console.log("car.ware:" + car.ware);
      }
      this.setState({ text: '解析成功了' })
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ margin: 20 }}>
          <View style={{ backgroundColor: "green", height: 50, justifyContent: "center" }}>
            <Text style={{ backgroundColor: "yellow", alignSelf: "center" }}>网络请求和JSON解析</Text>
          </View>

          <View style={{ backgroundColor: "red" }}>
            <Button
              title={'get'}
              onPress={() => this.get()}
            />
          </View>
          <View style={{ backgroundColor: "green" }}>
            <Button
              title={'post'}
              onPress={() => this.post()}
            />
          </View>

          <View style={{ backgroundColor: "yellow" }}>
            <Button
              title={'本地json'}
              onPress={() => this.localJson()}
            />
          </View>

          <Text numberOfLines={50} style={{ marginTop: 16, height: 500 }}>{this.state.text}</Text>
        </View>
      </View>
    )
  }
}