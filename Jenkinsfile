pipeline {
  agent any
  stages {
    stage("package") {
      steps {
        sh 'docker build -t kryz81/koa-ts-boilerplate:1.0.3 .'
        sh 'docker push kryz81/koa-ts-boilerplate:1.0.3'
      }
    }
    stage("deploy") {
      steps {
        sh 'docker run -d --name db --rm mongo'
        sh 'docker run -d --rm -p 3000:3000 --name koa -e APP_PORT=3000 --link db:db  -e DB_ENDPOINT=mongodb://db:27017 kryz81/koa-ts-boilerplate:1.0.3'
      }
    }
  }
}
