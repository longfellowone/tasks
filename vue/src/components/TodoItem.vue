<template>
  <li class="text-6xl text-center">{{ todo.text }}</li>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Todo } from '@/generated/graphql'

export default defineComponent({
  props: {
    todo: { type: Object as PropType<Todo>, required: true },
  },
  setup(props) {
    return { props }
  },
})
</script>
