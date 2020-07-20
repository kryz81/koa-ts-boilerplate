pipeline {
    agent any
    stages {
        stage("build") {
            steps {
                sh 'npm i'
                sh 'npm run build'
            }
        }
        stage("test") {
            steps {
                sh 'npm run test:coverage'
            }
        }
    }
}
