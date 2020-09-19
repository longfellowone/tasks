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

export type MutationRoot = {
  __typename?: 'MutationRoot';
  test: Scalars['String'];
};


export type MutationRootTestArgs = {
  username: Scalars['String'];
};

export type QueryRoot = {
  __typename?: 'QueryRoot';
  todos: Array<Todo>;
  tasks: Array<Task>;
};


export type QueryRootTasksArgs = {
  query: Scalars['String'];
};

export type Task = {
  __typename?: 'Task';
  id: Scalars['ID'];
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

export type TaskListQueryVariables = Exact<{
  query: Scalars['String'];
}>;


export type TaskListQuery = (
  { __typename?: 'QueryRoot' }
  & { tasks: Array<(
    { __typename?: 'Task' }
    & TaskFragment
  )> }
);

export type TestMutationMutationVariables = Exact<{
  username: Scalars['String'];
}>;


export type TestMutationMutation = (
  { __typename?: 'MutationRoot' }
  & Pick<MutationRoot, 'test'>
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
export const TaskListDocument = gql`
    query TaskList($query: String!) {
  tasks(query: $query) {
    ...Task
  }
}
    ${TaskFragmentDoc}`;

/**
 * __useTaskListQuery__
 *
 * To run a query within a Vue component, call `useTaskListQuery` and pass it any options that fit your needs.
 * When your component renders, `useTaskListQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useTaskListQuery(
 *   {
 *      query: // value for 'query'
 *   }
 * );
 */
export function useTaskListQuery(variables: TaskListQueryVariables | VueCompositionApi.Ref<TaskListQueryVariables> | ReactiveFunction<TaskListQueryVariables>, options: VueApolloComposable.UseQueryOptions<TaskListQuery, TaskListQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<TaskListQuery, TaskListQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<TaskListQuery, TaskListQueryVariables>> = {}) {
            return VueApolloComposable.useQuery<TaskListQuery, TaskListQueryVariables>(TaskListDocument, variables, options);
          }
export type TaskListQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<TaskListQuery, TaskListQueryVariables>;
export const TestMutationDocument = gql`
    mutation TestMutation($username: String!) {
  test(username: $username)
}
    `;

/**
 * __useTestMutationMutation__
 *
 * To run a mutation, you first call `useTestMutationMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useTestMutationMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useTestMutationMutation({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useTestMutationMutation(options: VueApolloComposable.UseMutationOptions<TestMutationMutation, TestMutationMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<TestMutationMutation, TestMutationMutationVariables>>) {
            return VueApolloComposable.useMutation<TestMutationMutation, TestMutationMutationVariables>(TestMutationDocument, options);
          }
export type TestMutationMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<TestMutationMutation, TestMutationMutationVariables>;