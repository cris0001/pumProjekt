import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import TodoModal from './TodoModal'

export default class TodoList extends React.Component {

    state = {
        showListVis: false,
    };

    toggleListModal() {
        this.setState({
            showListVis: !this.state.showListVis
        })
    }

    render() {

        const list = this.props.list;
        const completed = list.todo.filter(todo => todo.completed).length;
        const remaining = list.todo.length - completed;

        return (
            <View>
                <Modal
                    animationType="slide"
                    visible={this.state.showListVis}
                    onRequestClose={() => this.toggleListModal()}>

                    <TodoModal
                        list={list}
                        closeModal={() => this.toggleListModal()}
                        updateList={this.props.updateList} />

                </Modal>
                <TouchableOpacity onPress={() => this.toggleListModal()}>
                    <View style={styles.list}>
                        <Text style={styles.li}>{list.name}</Text>

                        <View>
                            <View style={styles.border}>
                                <Text style={styles.count}>{remaining}</Text>
                                <Text style={styles.todo}>Pozostało</Text>
                            </View>
                            <View style={{ alignItems: 'center', marginTop: 10, paddingVertical: 5, }}>
                                <Text style={styles.count}>{completed}</Text>
                                <Text style={styles.todo}>Ukończono</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>



        )
    }
}

const styles = StyleSheet.create({
    list: {
        backgroundColor: "#292929",
        paddingVertical: 40,
        marginTop: 90,
        paddingHorizontal: 10,
        borderRadius: 10,
        marginHorizontal: 10,
        alignItems: "center",
        width: 200,
        height: 330,
        borderColor: '#1b1b1b',
        borderWidth: 1,
    },

    li: {

        color: "black",
        fontSize: 30,
        marginTop: -10,
        fontWeight: "bold",
        marginBottom: 30,
        borderColor: 'white',
        borderRadius: 5,
        paddingHorizontal: 13,
        backgroundColor: "#FD9825",



    },
    count: {
        color: 'white',
        fontWeight: "bold",
        fontSize: 50,


    },
    todo: {
        color: "white",
        fontWeight: "bold",
        fontSize: 15,

    },
    border: {
        alignItems: 'center',
    }
})