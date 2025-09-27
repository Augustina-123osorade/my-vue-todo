// src/stores/api.ts
export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

export async function fetchTodos(): Promise<Todo[]> {
  try {
    const response = await fetch('https://dummyjson.com/todos');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.todos || [];
  } catch (error) {
    console.error('Error fetching todos:', error);
    return [];
  }
}

export async function fetchTodoById(id: string): Promise<Todo | null> {
  try {
    const response = await fetch(`https://dummyjson.com/todos/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching todo:', error);
    return null;
  }
}