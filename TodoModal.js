import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, FlatList, KeyboardAvoidingView, TextInput, Keyboard } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons'

export default class TodoModal extends React.Component {

    state = {
        newTodo: "",
    }


    toggleTodoCompleted = index => {
        let list = this.props.list
        list.todo[index].completed = !list.todo[index].completed;

        this.props.updateList(list);
    }

    addTodo = () => {
        let list = this.props.list;
        list.todo.push({ title: this.state.newTodo, completed: false })

        this.props.updateList(list);
        this.setState({ newTodo: "" })

        Keyboard.dismiss();
    }


    renderTodo = (todo, index) => {
        return (
            <View style={styles.list}>
                <TouchableOpacity onPress={() => this.toggleTodoCompleted(index)}>
                    <Ionicons name={todo.completed ? 'star' : 'star-outline'} size={30} color='#ffa31a' />
                </TouchableOpacity>
                <Text style=
                    {[styles.pogers,
                    {
                        textDecorationLine: todo.completed ? 'line-through' : 'none',
                        //  color: todo.completed ? '' : '#ACABAB'
                    }]}>{todo.title}</Text>
            </View>
        )
    }

    render() {


        const list = this.props.list
        const taskCount = list.todo.length;
        const completedCount = list.todo.filter(todo => todo.completed).length;

        return (
            <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
                <SafeAreaView style={styles.con}>
                    <TouchableOpacity
                        style={{ position: 'absolute', top: 15, right: 15 }}
                        onPress={this.props.closeModal}>
                        <AntDesign
                            name="close"
                            size={40}
                            color="#808080" />
                    </TouchableOpacity>
                    {/* <View style={[styles.section, styles.header]}>
                    <View>
                        <Text style={styles.title}>{this.state.name}</Text>
                        <Text style={styles.taskCount}>
                            {completedCount} z {taskCount}
                        </Text>
                    </View>
                </View> */}

                    <View style={[styles.section, { flex: 3 }]}>
                        <FlatList
                            data={list.todo}
                            renderItem={({ item, index }) => this.renderTodo(item, index)}
                            keyExtractor={item => item.title}
                            contentContainerStyle={{ paddingHorizontal: 30, paddingVertical: 60 }}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                    <View style={[styles.section, styles.footer]}>
                        <TextInput
                            style={styles.input}
                            onChangeText={text => this.setState({ newTodo: text })}
                            value={this.state.newTodo} />
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => this.addTodo()}>
                            <AntDesign
                                name="plus"
                                size={40}
                                color="#1b1b1b"
                                borderWidth='2'
                            />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView >
            </KeyboardAvoidingView>


        );
    }
}

const styles = StyleSheet.create({
    con: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1b1b1b',

    },
    section: {
        flex: 1,
        marginBottom: 40,
        marginTop: 60,
        alignSelf: "stretch"
    },
    pogers: {
        color: "#ACABAB",
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20,
        fontSize: 20,
        marginBottom: 10,
    },
    header: {
        justifyContent: 'flex-end',
    },
    title: {
        color: 'white',
        fontSize: 40,

    },
    taskCount: {
        color: 'white',

    },
    input: {
        backgroundColor: '#292929',
        flex: 1,
        height: 40,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        color: "#ACABAB",
        padding: 8,

    },
    button: {
        backgroundColor: '#ffa31a',
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    footer: {
        paddingHorizontal: 30,
        flexDirection: 'row',
        alignItems: 'center',
    },
    list: {

        flexDirection: 'row',
        marginRight: 100,
    },


})