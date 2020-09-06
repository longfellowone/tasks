// TEMPORARY FIX
// https://github.com/dotansimha/graphql-code-generator/issues/4703

const fs = require('fs')
const path = require('path')

const loadGeneratedPath = path.resolve(__dirname, '../src/generated/graphql.ts')

fs.writeFileSync(
  loadGeneratedPath,
  fs
    .readFileSync(loadGeneratedPath, 'utf8')
    .replace(/@vue\/composition-api/m, 'vue')
)
