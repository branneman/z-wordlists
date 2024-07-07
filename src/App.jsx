import { useState, useEffect } from 'react'
import { useKeySequenceDetector } from './hooks/dom'
import wordlist from './wordlist-avi-e3.txt?raw'
import './App.css'

const generateWords = (amount, wordlist) => {
  return wordlist
    .split('\n')
    .map((word) => word.trim())
    .filter((word) => word.length > 0)
    .sort(() => 0.5 - Math.random())
    .slice(0, amount)
}

function App() {
  const [words, setWords] = useState(
    generateWords(5, wordlist)
  )
  const newWords = () =>
    setWords(generateWords(5, wordlist))
  useKeySequenceDetector(' ', newWords)

  useEffect(() => {
    const f = () => newWords()
    document.body.addEventListener('click', f)
    return () =>
      document.body.removeEventListener('click', f)
  })

  return (
    <>
      <h1 className="wordlist__title">AVI E3</h1>
      <ul className="wordlist">
        {words.map((word, index) => (
          <li key={index}>{word}</li>
        ))}
      </ul>
    </>
  )
}

export default App
