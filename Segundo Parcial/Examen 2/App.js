import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainMenu">
        <Stack.Screen name="MainMenu" component={MainMenu} options={{ title: 'Menu Principal' }} />
        <Stack.Screen name="TodoList" component={TodoListScreen} options={{ title: 'Lista de Tareas Pendientes' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const MainMenu = () => {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.menuContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('TodoList', { title: 'Todos Pendientes (Solo IDs)', filterFn: () => true })}>
        <Text style={styles.menuItem}>Lista de todos los pendientes (solo IDs)</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('TodoList', { title: 'Todos Pendientes (IDs y Titles)', filterFn: () => true })}>
        <Text style={styles.menuItem}>Lista de todos los pendientes (IDs y Titles)</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('TodoList', { title: 'Pendientes Sin Resolver', filterFn: (todo) => !todo.completed })}>
        <Text style={styles.menuItem}>Lista de todos los pendientes sin resolver (ID y Title)</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('TodoList', { title: 'Pendientes Resueltos', filterFn: (todo) => todo.completed })}>
        <Text style={styles.menuItem}>Lista de todos los pendientes resueltos (ID y Title)</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('TodoList', { title: 'Todos Pendientes (IDs y User ID)', filterFn: () => true })}>
        <Text style={styles.menuItem}>Lista de todos los pendientes (IDs y User ID)</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('TodoList', { title: 'Pendientes Resueltos (IDs y User ID)', filterFn: (todo) => todo.completed })}>
        <Text style={styles.menuItem}>Lista de todos los pendientes resueltos (IDs y User ID)</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('TodoList', { title: 'Pendientes Sin Resolver (IDs y User ID)', filterFn: (todo) => !todo.completed })}>
        <Text style={styles.menuItem}>Lista de todos los pendientes sin resolver (IDs y User ID)</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const TodoListScreen = ({ route }) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, []);

  const renderTodoItem = ({ item }) => (
    <View style={styles.todoItem}>
      <Text>ID: {item.id}</Text>
      <Text>Title: {item.title}</Text>
      <Text>User ID: {item.userId}</Text>
      <Text>Completed: {item.completed ? 'Yes' : 'No'}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.todoListTitle}>{route.params.title}</Text>
      <FlatList
        data={todos.filter(route.params.filterFn)}
        renderItem={renderTodoItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  todoListContainer: {
    marginBottom: 20,
  },
  todoListTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  todoItem: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  menuContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItem: {
    fontSize: 18,
    marginVertical: 10,
  },
});

export default App;