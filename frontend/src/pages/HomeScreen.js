import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
  Alert,
  Platform,
  TouchableOpacity,
} from 'react-native';
import TodoForm from '../components/TodoForm';
import TodoItem from '../components/TodoItem';
import { fetchTodos, addTodo, updateTodo, deleteTodo } from '../api/todoApi';

const notifyError = (title, message) => {
  if (Platform.OS === 'web' && typeof window !== 'undefined' && window.alert) {
    window.alert(`${title}\n\n${message}`);
  } else {
    Alert.alert(title, message);
  }
};

const HomeScreen = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const loadTodos = useCallback(async () => {
    try {
      setErrorMessage(null);
      const data = await fetchTodos();
      setTodos(data);
    } catch (error) {
      setErrorMessage(error.message);
      notifyError('Could not load to-dos', error.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  const handleAdd = async (title) => {
    try {
      setErrorMessage(null);
      const newTodo = await addTodo(title);
      setTodos((prev) => [newTodo, ...prev]);
    } catch (error) {
      setErrorMessage(error.message);
      notifyError('Could not add to-do', error.message);
    }
  };

  const handleToggle = async (todo) => {
    try {
      setErrorMessage(null);
      const updated = await updateTodo(todo._id, { completed: !todo.completed });
      setTodos((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
    } catch (error) {
      setErrorMessage(error.message);
      notifyError('Could not update to-do', error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      setErrorMessage(null);
      await deleteTodo(id);
      setTodos((prev) => prev.filter((t) => t._id !== id));
    } catch (error) {
      setErrorMessage(error.message);
      notifyError('Could not delete to-do', error.message);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadTodos();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>My To-Do List</Text>
        <TodoForm onAdd={handleAdd} />

        {errorMessage && (
          <View style={styles.errorBanner}>
            <Text style={styles.errorText}>{errorMessage}</Text>
            <TouchableOpacity onPress={() => setErrorMessage(null)}>
              <Text style={styles.errorDismiss}>Dismiss</Text>
            </TouchableOpacity>
          </View>
        )}

        {loading ? (
          <ActivityIndicator size="large" color="#6C63FF" style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            data={todos}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <TodoItem todo={item} onToggle={handleToggle} onDelete={handleDelete} />
            )}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListEmptyComponent={
              <Text style={styles.emptyText}>No to-dos yet. Add one above!</Text>
            }
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F5FB',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  header: {
    fontSize: 26,
    fontWeight: '800',
    color: '#333',
    marginBottom: 16,
  },
  errorBanner: {
    backgroundColor: '#FDECEC',
    borderColor: '#E63946',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  errorText: {
    color: '#B71C1C',
    fontSize: 13,
    flex: 1,
    marginRight: 10,
  },
  errorDismiss: {
    color: '#E63946',
    fontWeight: '700',
    fontSize: 13,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 30,
    fontSize: 15,
  },
});

export default HomeScreen;
