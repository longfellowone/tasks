<template>
  <task-list />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TaskList from '@/components/TaskList/TaskList.vue'

export default defineComponent({
  components: { TaskList },
  setup() {
    //
  },
})
</script>
