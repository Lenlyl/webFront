<template>
  <div>
    todo-list
    <div>
      <input type="text" @keyup.enter="addTodo" v-model="newTodo" />

      <div>
        <ul>
          <li v-for="item in todos" :key="item.id">
            <TodoItem :item="item" @remove="removeTodo"></TodoItem>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
let id = 1;
import TodoItem from "./TodoItem";
export default {
  components: {
    TodoItem,
  },
  data() {
    return {
      newTodo: "",
      todos: [
        {
          id: this.createId(),
          title: "item1",
        },
        {
          id: this.createId(),
          title: "item2",
        },
      ],
    };
  },
  methods: {
    removeTodo(id) {
      this.todos = this.todos.filter((item) => {
        return item.id !== id;
      });
    },
    createId() {
      return id++;
    },
    addTodo() {
      this.todos.push({
        title: this.newTodo,
        id: this.createId(),
      });

      // reset
      this.newTodo = "";
    },
  },
};
</script>

<style></style>
