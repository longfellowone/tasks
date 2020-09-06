<template>
  <ul>
    <todo-item v-for="todo in todos" :key="todo.id" :todo="todo" />
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useTodosQuery } from '@/generated/graphql'
import { useResult } from '@vue/apollo-composable'
import TodoItem from '@/components/TodoItem.vue'

export default defineComponent({
  components: { TodoItem },
  props: {},
  setup() {
    const { result } = useTodosQuery()
    const todos = useResult(result, [], (data) => data.todos)

    return { todos }
  },
})
</script>
