import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.textWrapper} onPress={() => onToggle(todo)}>
        <View style={[styles.checkbox, todo.completed && styles.checkboxChecked]}>
          {todo.completed && <Text style={styles.checkmark}>✓</Text>}
        </View>
        <Text style={[styles.title, todo.completed && styles.titleCompleted]}>
          {todo.title}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onDelete(todo._id)} style={styles.deleteButton}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  textWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#6C63FF',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#6C63FF',
  },
  checkmark: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 16,
  },
  title: {
    fontSize: 16,
    color: '#222',
    flexShrink: 1,
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  deleteButton: {
    marginLeft: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  deleteText: {
    color: '#E63946',
    fontWeight: '600',
    fontSize: 13,
  },
});

export default TodoItem;
