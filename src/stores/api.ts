// api.ts
export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

export async function fetchTodos(): Promise<Todo[]> {
  const res = await fetch("https://dummyjson.com/todos");
  if (!res.ok) {
    throw new Error("Failed to fetch todos");
  }
  const data = await res.json();
  return data.todos;
}

export async function addTodo(todoText: string): Promise<Todo> {
  const res = await fetch("https://dummyjson.com/todos/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      todo: todoText,
      completed: false,
      userId: 1,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to add todo");
  }

  return res.json();
}

export async function updateTodo(
  id: number,
  updatedFields: Partial<Todo>
): Promise<Todo> {
  const res = await fetch(`https://dummyjson.com/todos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedFields),
  });

  if (!res.ok) {
    throw new Error("Failed to update todo");
  }

  return res.json();
}

export async function deleteTodo(id: number): Promise<Todo> {
  const res = await fetch(`https://dummyjson.com/todos/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete todo");
  }

  return res.json();
}
