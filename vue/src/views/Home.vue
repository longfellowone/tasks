<template>
  <todo-list />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import TodoList from '@/components/TodoList.vue'

export default defineComponent({
  components: { TodoList },
  setup() {
    //
  },
})
</script>
