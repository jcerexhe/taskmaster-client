/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Axios from 'axios';

class TaskMasterClient extends Component {

  render() {
    return (
      <MemberTaskList interval="1000" />
    );
  }
}

class MemberTaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memberTasks: []
    };
  }

  componentDidMount() {
    var that = this;

    var fetch = function() {
      Axios.get('https://taskmasterserver.herokuapp.com/member_tasks.json')
        .then(function (response) {
          console.log(response);
          that.setState({memberTasks: response.data});
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    // initial fetch
    fetch();

    // re-fetches every hour
    setInterval(function() {
      fetch();
    }, 3600000)
  }

  render() {
    var tasks = function(task, index) {
      return (
        <View key={index}>
          <View>
            <Text style={styles.nameText}>{ task.member.name }</Text>
          </View>
          <View>
            <Text style={styles.standardText}>{ task.task.name }{'\n'}</Text>
          </View>
        </View>
      );
    };

    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var date = new Date();
    var day = days[ date.getDay() ];
    var dd = date.getDate();
    var mm = date.getMonth();
    var dateMod = day + ", " + dd + "/" + mm;

    return (
      <View style={styles.container}>
        <View style={styles.headerSection}>
          <Text style={styles.header}>
            Task Master
          </Text>
        </View>
        <Text style={styles.date}>
          {dateMod}
        </Text>
        { this.state.memberTasks.map(tasks) }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  headerSection: {
    backgroundColor: '#00acc1',
    padding: 20,
    marginBottom: 30,
  },
  header: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    marginTop: 10,
  },
  date: {
    textAlign: 'right',
    fontSize: 20,
    marginBottom: 20,
    paddingRight: 20,
  },
  nameText: {
    textAlign: 'left',
    color: '#333333',
    marginBottom: 2,
    fontSize: 20,
    paddingLeft: 20,
    fontWeight: 'bold',
  },
  standardText: {
    textAlign: 'left',
    color: '#333333',
    marginBottom: 2,
    fontSize: 20,
    paddingLeft: 20,
  },
});

AppRegistry.registerComponent('TaskMasterClient', () => TaskMasterClient);
