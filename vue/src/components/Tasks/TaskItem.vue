<template>
  <li class="text-6xl text-center">{{ task.description }}</li>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { TaskFragment } from '@/generated/graphql'

export default defineComponent({
  props: {
    task: { type: Object as PropType<TaskFragment>, required: true },
  },
  setup() {
    //
  },
})
</script>
