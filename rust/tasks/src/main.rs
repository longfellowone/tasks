// https://doc.rust-lang.org/book/ch14-03-cargo-workspaces.html
// https://github.com/jaheba/stuff/blob/master/communicating_intent.md
// https://ferrisellis.com/content/rust-implementing-units-for-types/
// http://xion.io/post/code/rust-iter-patterns.html
// http://xion.io/post/code/rust-string-args.html
// https://www.reddit.com/r/rust/comments/hzx1ak/beginners_critiques_of_rust/fzm45ms?utm_source=share&utm_medium=web2x
// https://github.com/perdumonocle/sql-builder
use actix_cors::Cors;
use actix_web::{web, App, HttpResponse, HttpServer};
use async_graphql::http::{playground_source, GraphQLPlaygroundConfig};
use async_graphql::{Context, EmptySubscription, FieldResult, Object, SimpleObject, ID};
use async_graphql_actix_web::{GQLRequest, GQLResponse};
use serde::{Deserialize, Serialize};
use sqlx::{FromRow, PgPool};
use std::env;
// use meilisearch_sdk::{client::*, document::*, search::*};
use std::thread::sleep;
use std::time::Duration;

#[derive(SimpleObject, FromRow, Debug)]
struct Todo {
    id: i32,
    text: String,
}

#[derive(SimpleObject, Serialize, Deserialize, Debug)]
struct Task {
    id: ID,
    area: String,
    panel: String,
    task_type: String,
    description: String,
    status: String,
    remaining_time: i32,
}

// impl Document for Task {
//     type UIDType = i32;
//
//     fn get_uid(&self) -> &Self::UIDType {
//         &self.id
//     }
// }

struct QueryRoot;

#[Object]
impl QueryRoot {
    async fn todos(&self, ctx: &Context<'_>) -> FieldResult<Vec<Todo>> {
        let db_pool = ctx.data::<PgPool>()?;

        // let assemblies: Vec<Todo> = sqlx::query_as!(
        //     Todo,
        //     r#"
        //         SELECT id, text
        //         FROM todos
        //     "#,
        // )
        // .fetch_all(db_pool)
        // .await
        // .unwrap();

        let todos = sqlx::query_as::<_, Todo>(
            r#"
                SELECT id, text
                FROM todos
            "#,
        )
        .fetch_all(db_pool)
        .await
        .unwrap();

        Ok(todos)
    }

    async fn tasks(&self, _ctx: &Context<'_>, query: String) -> FieldResult<Vec<Task>> {
        // let db_pool = ctx.data::<PgPool>()?;

        println!("{}", query);

        let tasks = vec![
            Task {
                id: "1".into(),
                area: "area1".to_string(),
                panel: "panel1".to_string(),
                task_type: "task_type1".to_string(),
                description: "task1".to_string(),
                status: "status1".to_string(),
                remaining_time: 1,
            },
            Task {
                id: 2.into(),
                area: "area2".to_string(),
                panel: "panel2".to_string(),
                task_type: "task_type2".to_string(),
                description: "task2".to_string(),
                status: "status2".to_string(),
                remaining_time: 2,
            },
        ];

        Ok(tasks)
    }
}

struct MutationRoot;

#[Object]
impl MutationRoot {
    async fn test(&self, username: String) -> FieldResult<String> {
        sleep(Duration::from_secs(2));
        Ok(username)
    }
}

type Schema = async_graphql::Schema<QueryRoot, MutationRoot, EmptySubscription>;

async fn index(schema: web::Data<Schema>, req: GQLRequest) -> GQLResponse {
    schema.execute(req.into_inner()).await.into()
}

async fn index_playground() -> actix_web::Result<HttpResponse> {
    Ok(HttpResponse::Ok()
        .content_type("text/html; charset=utf-8")
        .body(playground_source(
            GraphQLPlaygroundConfig::new("/").subscription_endpoint("/"),
        )))
}

#[actix_web::main]
async fn main() -> anyhow::Result<()> {
    // docker run -it --rm -p 7700:7700 getmeili/meilisearch:latest ./meilisearch --master-key=masterKey
    // https://www.elastic.co/blog/found-keeping-elasticsearch-in-sync
    // https://docs.rs/meilisearch-sdk/0.2.0/src/meilisearch_sdk/search.rs.html#152
    // Soft delete records, exclude from search
    // https://matklad.github.io/2020/08/12/who-builds-the-builder.html
    // https://www.npmjs.com/package/dompurify

    // let client = Client::new("http://localhost:7700", "masterKey");
    // let tasks_index = client.get_or_create("tasks").await.unwrap();
    //
    // let mut tasks = vec![];
    //
    // let mut rdr = csv::Reader::from_path("C:/Users/mattw/dev/tasks-rust/tasks/Todos.csv").unwrap();
    // for row in rdr.deserialize() {
    //     let task: Task = row?;
    //     tasks.push(task);
    // }
    //
    // tasks_index
    //     .add_or_replace(&tasks, Some("id"))
    //     .await
    //     .unwrap();
    //
    // sleep(Duration::from_secs(1));
    //
    // let query = Query::new("conduit").with_filters("area = n1");
    // let results = tasks_index.search::<Task>(&query).await.unwrap().hits;
    //
    // results.iter().for_each(|task| println!("{:?}", task));

    let db_pass = env::var("DB_PASS").unwrap();
    let db_url = format!("postgres://postgres:{}@localhost/rust", db_pass);

    let db_pool = PgPool::connect(&db_url).await?;

    let schema = async_graphql::Schema::build(QueryRoot, MutationRoot, EmptySubscription)
        .data(db_pool)
        .finish();

    HttpServer::new(move || {
        App::new()
            .data(schema.clone())
            .wrap(Cors::new().finish())
            .route("/", web::post().to(index))
            .route("/", web::get().to(index_playground))
    })
    .bind("0.0.0.0:8080")? // Use 0.0.0.0 to access from network
    .run()
    .await?;

    println!("Server started!");

    Ok(())
}
