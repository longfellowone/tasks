<template>
  <ul>
    <task-item v-for="task in tasks" :key="task.id" :task="task" />
  </ul>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useTaskListQuery, useTestMutationMutation } from '@/generated/graphql'
import { useResult } from '@vue/apollo-composable'
import TaskItem from '@/components/TaskList/TaskItem/TaskItem.vue'

export default defineComponent({
  components: { TaskItem },
  props: {},
  setup() {
    const query = ref({ query: 'testing123' })

    const { result } = useTaskListQuery(query)
    const tasks = useResult(result, [], (data) => data.tasks)

    const { mutate: startTest } = useTestMutationMutation({
      variables: { username: 'testing' },
      update: (_cache, { data: startTest }) => {
        console.log(startTest?.test)
      },
    })

    startTest()

    return { tasks }
  },
})
</script>
