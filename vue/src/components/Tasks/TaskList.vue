<template>
  <ul>
    <task-item v-for="task in tasks" :key="task.id" :task="task" />
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useTasksQuery } from '@/generated/graphql'
import { useResult } from '@vue/apollo-composable'
import TaskItem from '@/components/Tasks/TaskItem.vue'

export default defineComponent({
  components: { TaskItem },
  props: {},
  setup() {
    const { result } = useTasksQuery()
    const tasks = useResult(result, [], (data) => data.tasks)

    return { tasks }
  },
})
</script>
