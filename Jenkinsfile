pipeline {
    agent any

    stages {
        stage('Install Dependencies') {
            steps {
                dir('playwright-framework') {
                    bat 'npm install'
                }
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                dir('playwright-framework') {
                    bat 'npx playwright install'
                }
            }
        }

        stage('Run Smoke Tests') {
            steps {
                dir('playwright-framework') {
                    bat 'npx playwright test tests/smoke/login.spec.js'
                }
            }
        }
    }
}