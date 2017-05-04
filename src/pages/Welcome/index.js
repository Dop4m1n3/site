/**
 * 404 page template
 */
import React, { Component, PropTypes } from 'react'
import axios from 'axios'
import { Link } from 'react-router' // eslint-disable-line
import TextInput from '../../components/TextInput'
import { getParams } from '../../utils/analytics/source/urlParams'
import styles from './index.css'

export default class Welcome extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      code: ''
    }
  }
  componentDidMount() {
    const params = getParams()
    if (!params && !params.code) {
      console.log('redirect') // eslint-disable-line
      return false
    }
    console.log('hi', params) // eslint-disable-line
    this.setState({ // eslint-disable-line
      code: params.code
    }, () => {
      console.log(this.refs)
      this.refs.code.refs.input.select()
    })
  }
  handleClick = (e) => {
    e.target.select()
  }
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.hero}>
            <h1>Welcome to Serverless</h1>
            <div className={styles.description}>
              Copy the verification code below and paste it back into the CLI prompt
            </div>
            <div className={styles.inputWrapper}>
              <strong>verification code:</strong>
              <TextInput
                ref={'code'}
                value={this.state.code}
                readOnly
                onClick={this.handleClick}
                className={styles.input}
              />
            </div>
          </div>
          <div className={styles.nextSteps}>
            <h2>Next Steps</h2>
            <div className={styles.boxWrapper}>
              <div className={styles.box}>
                <a href='/framework/docs/'>
                  <div className={styles.stepNumber}>1.</div>
                  <div className={styles.stepTitle}>Checkout the Docs</div>
                  <div className={styles.stepDescription}>
                    Learn the basics of using the Serverless Framework
                  </div>
                </a>
              </div>
              <div className={styles.box}>
                <a href='https://github.com/serverless/examples/' target='_blank' rel='noopener noreferrer'>
                  <div className={styles.stepNumber}>2.</div>
                  <div className={styles.stepTitle}>View Example Projects</div>
                  <div className={styles.stepDescription}>
                    Clone existing serverless examples to build your own projects
                  </div>
                </a>
              </div>
              <div className={styles.box}>
                <a href='https://gitter.im/serverless/serverless' target='_blank' rel='noopener noreferrer'>
                  <div className={styles.stepNumber}>3.</div>
                  <div className={styles.stepTitle}>Chat on Gitter/Forums</div>
                  <div className={styles.stepDescription}>
                    Ask questions and engage<br />with the community
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
