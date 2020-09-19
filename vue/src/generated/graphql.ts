import gql from 'graphql-tag';
import * as VueApolloComposable from '@vue/apollo-composable';
import * as VueCompositionApi from 'vue';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type ReactiveFunction<TParam> = () => TParam;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type QueryRoot = {
  __typename?: 'QueryRoot';
  todos: Array<Todo>;
  tasks: Array<Task>;
};

export type Task = {
  __typename?: 'Task';
  id: Scalars['Int'];
  area: Scalars['String'];
  panel: Scalars['String'];
  taskType: Scalars['String'];
  description: Scalars['String'];
  status: Scalars['String'];
  remainingTime: Scalars['Int'];
};

export type Todo = {
  __typename?: 'Todo';
  id: Scalars['Int'];
  text: Scalars['String'];
};

export type TaskFragment = (
  { __typename?: 'Task' }
  & Pick<Task, 'id' | 'area' | 'panel' | 'taskType' | 'description' | 'status' | 'remainingTime'>
);

export type TasksQueryVariables = Exact<{ [key: string]: never; }>;


export type TasksQuery = (
  { __typename?: 'QueryRoot' }
  & { tasks: Array<(
    { __typename?: 'Task' }
    & TaskFragment
  )> }
);

export const TaskFragmentDoc = gql`
    fragment Task on Task {
  id
  area
  panel
  taskType
  description
  status
  remainingTime
}
    `;
export const TasksDocument = gql`
    query Tasks {
  tasks {
    ...Task
  }
}
    ${TaskFragmentDoc}`;

/**
 * __useTasksQuery__
 *
 * To run a query within a Vue component, call `useTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useTasksQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useTasksQuery(
 *   {
 *   }
 * );
 */
export function useTasksQuery(options: VueApolloComposable.UseQueryOptions<TasksQuery, TasksQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<TasksQuery, TasksQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<TasksQuery, TasksQueryVariables>> = {}) {
            return VueApolloComposable.useQuery<TasksQuery, undefined>(TasksDocument, undefined, options);
          }
export type TasksQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<TasksQuery, TasksQueryVariables>;