import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, StatusBar, FlatList, TouchableOpacity } from 'react-native';

import api from './services/api';

export default function App() {
  const [projects, setProjects] = useState([]);

  async function handleAddProject() {
    const response = await api.post('projects', {
      title: `Novo Projecto ${Date.now()}`,
      owner: 'Lucas Quintanilha'
    });

    const project = response.data;

    setProjects([...projects,project]);
  }

  useEffect(() => {
    api.get('projects').then(response => {
      setProjects(response.data);
    })
  }, []);
  return (
    <>
      <StatusBar barStyle='light-content' backgroundColor='#7159c1' />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={projects}
          keyExtractor={project => project.id}
          renderItem={({ item: project }) => (
            <Text style={styles.project}>{project.title}</Text>
          )}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleAddProject}
        >
          <Text style={styles.buttonText}>Adicionar projeto</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7159c1',
  },

  project: {
    color: '#fff',
    fontSize: 20,
  },

  button: {
    backgroundColor: '#FFF',
    margin: 20,
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    fontSize: 16,
    fontWeight: 'bold'
  }
})
