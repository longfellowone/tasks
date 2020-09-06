<template>
  <div>Testing</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

export default defineComponent({
  props: {},
  setup() {
    const { result } = useQuery(gql`
      query Todos {
        todos {
          id
          text
        }
      }
    `)
    console.log(result)
  },
})
</script>
