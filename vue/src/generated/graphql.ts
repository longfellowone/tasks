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
};

export type Todo = {
  __typename?: 'Todo';
  id: Scalars['Int'];
  text: Scalars['String'];
};

export type TodosQueryVariables = Exact<{ [key: string]: never; }>;


export type TodosQuery = (
  { __typename?: 'QueryRoot' }
  & { todos: Array<(
    { __typename?: 'Todo' }
    & Pick<Todo, 'id' | 'text'>
  )> }
);


export const TodosDocument = gql`
    query Todos {
  todos {
    id
    text
  }
}
    `;

/**
 * __useTodosQuery__
 *
 * To run a query within a Vue component, call `useTodosQuery` and pass it any options that fit your needs.
 * When your component renders, `useTodosQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useTodosQuery(
 *   {
 *   }
 * );
 */
export function useTodosQuery(options: VueApolloComposable.UseQueryOptions<TodosQuery, TodosQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<TodosQuery, TodosQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<TodosQuery, TodosQueryVariables>> = {}) {
            return VueApolloComposable.useQuery<TodosQuery, undefined>(TodosDocument, undefined, options);
          }
export type TodosQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<TodosQuery, TodosQueryVariables>;