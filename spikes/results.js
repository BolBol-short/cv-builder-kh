// Shared helpers for the test page: keep results, print logs, ask yes/no questions.
import { detectInAppBrowser } from '../src/features/export/inAppBrowser.js'

const results = {}

export function record(name, value) {
  results[name] = value
  showResults()
}

export function log(sectionId, message) {
  const box = document.getElementById(`${sectionId}-log`)
  box.textContent += `${message}\n`
}

// Shows two buttons under a test and records the answer.
export function askYesNo(sectionId, question, resultName) {
  const box = document.getElementById(`${sectionId}-log`)
  const line = document.createElement('div')
  line.textContent = question + ' '
  for (const answer of ['Yes', 'No']) {
    const button = document.createElement('button')
    button.textContent = answer
    button.addEventListener('click', () => {
      record(resultName, answer)
      line.textContent = `${question} ${answer}`
    })
    line.append(button)
  }
  box.append(line)
}

function deviceInfo() {
  const standalone = window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true
  return [
    `User agent: ${navigator.userAgent}`,
    `In-app browser: ${detectInAppBrowser(navigator.userAgent) ?? 'no'}`,
    `Screen: ${screen.width}x${screen.height}, pixel ratio ${devicePixelRatio}`,
    `Opened from Home Screen: ${standalone ? 'yes' : 'no'}`,
  ].join('\n')
}

export function resultsText() {
  const lines = Object.entries(results).map(([name, value]) => `${name}: ${value}`)
  return `${deviceInfo()}\n\n${lines.join('\n') || '(no results yet)'}`
}

export function showResults() {
  document.getElementById('results').textContent = resultsText()
}
