import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal } from 'react-native';
import data from './data';
import Data from './data';
import TodoList from './TodoList'
import Fire from './Fire'


export default class App extends React.Component {

  state = {
    addTodoVis: false,
    lists: [],
    user: {},
    loading: true,

  }

  componentDidMount() {
    firebase = new Fire((error, user) => {
      if (error) {
        return alert("zle")
      }

      firebase.getLists(lists => {
        this.setState({ lists, user }, () => {
          this.setState({ loading: false });
        })
      })

      this.setState({ user });
    });
  }

  toggleAddModal() {
    this.setState({
      addTodoVis: !this.state.addTodoVis
    })

  };

  updateList = list => {
    this.setState({
      list: this.state.lists.map(item => {
        return item.id === list.id ? list : item;
      })
    })
  };

  renderList = list => {
    return <TodoList list={list}
      updateList={this.updateList} />
  }

  render() {
    return (

      <View style={styles.container} >
        <Modal animationType="slide" visible={this.state.addTodoVis}>
        </Modal>
        <View>
          <Text>user: {this.state.user.uid}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.title}>
            Twoja
            </Text>
          <Text> </Text>
          <Text style={styles.title2}>lista zadań</Text>



        </View>

        <View style={styles.list}>
          <FlatList
            data={Data}
            keyExtractor={item => item.name}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => this.renderList(item)}
            keyboardShouldPersistTaps="always"
          />
        </View>


      </View >

    );
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1b1b1b',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 150,
    borderRadius: 2,
    borderColor: "#FD9825",

  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    color: "white",
    borderRadius: 10,
  },
  title2: {
    fontSize: 42,
    fontWeight: "bold",
    color: "white",
    backgroundColor: "#FD9825",
    borderRadius: 5,
    paddingHorizontal: 10,
    color: 'black',

  },

  list: {

    marginTop: 30,
    backgroundColor: 'black',
    backgroundColor: '#1b1b1b',

  },


});
