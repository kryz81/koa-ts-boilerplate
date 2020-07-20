pipeline {
  agent any
  stages {
    stage("package") {
      steps {
        sh 'docker build -t kryz81/koa-ts-boilerplate:1.0.2 .'
        sh 'docker push kryz81/koa-ts-boilerplate:1.0.2'
      }
    }
    stage("deploy") {
      steps {
        sh 'docker run -d --rm -p 3000:3000 --name koa kryz81/koa-ts-boilerplate:1.0.2'
      }
    }
  }
}
