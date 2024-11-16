import { useState } from 'react'
import './App.css'
import Loading from './components/Loading/Loading'
import InterviewStart from './components/InterviewStart/InterviewStart'
import Question from './components/Question/Question'
import AnswerInput from './components/AnswerInput/AnswerInput'
import CompletionMessage from './components/CompletionMessage/CompletionMessage'
import SummaryContainer from './components/SummaryContainer/SummaryContainer'

interface InterviewQuestion {
  question: string
  answer: string
  isAnswered: boolean
}

function App() {
  const [topic, setTopic] = useState('')
  const [isInterviewStarted, setIsInterviewStarted] = useState(false)
  const [questions, setQuestions] = useState<InterviewQuestion[]>([])
  const [currentAnswer, setCurrentAnswer] = useState('')
  const [summaries, setSummaries] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [story, setStory] = useState<string>('')

  const handleStartInterview = async (newTopic: string) => {
    setLoading(true)
    setIsInterviewStarted(true)

    try {
      const response = await fetch('http://localhost:3000/api/interview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic: newTopic }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to start interview')
      }

      if (data.question) {
        setQuestions([{ question: data.question, answer: '', isAnswered: false }])
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitAnswer = async () => {
    if (!currentAnswer.trim()) return

    setLoading(true)
    const currentQuestionIndex = questions.length - 1
    const answers = questions.map(q => q.answer).filter(a => a)

    //get summary of question and answer
    try {
      const summaryResponse = await fetch('http://localhost:3000/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: questions[currentQuestionIndex].question, answer: currentAnswer, topic }),
      })
      const summaryData = await summaryResponse.json()
      setSummaries([...summaries, summaryData.summary])

      //get next question
      const response = await fetch('http://localhost:3000/api/interview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic,
          answers: [...answers, currentAnswer],
          questions: questions.map(q => q.question),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit answer')
      }

      //update question with answer
      const updatedQuestions = [...questions]
      updatedQuestions[currentQuestionIndex] = {
        ...updatedQuestions[currentQuestionIndex],
        answer: currentAnswer,
        isAnswered: true,
      }

      //check for completion
      if (data.status === 'completed') {
        setIsCompleted(true)
        fetchStory()
      } else if (data.question) {
        //add new question
        updatedQuestions.push({
          question: data.question,
          answer: '',
          isAnswered: false,
        })
      }

      setQuestions(updatedQuestions)
      setCurrentAnswer('')

    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchStory = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/story', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic, summaries }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate story')
      }

      setStory(data.story)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className="App">
      <center>
        <h1>Tell me a story about...</h1>
      </center>

      {!isInterviewStarted && (
        <InterviewStart
          onTopicChange={setTopic}
          onStart={handleStartInterview}
          loading={loading}
        />
      )}
      {isInterviewStarted && (
        <>
          {summaries.length > 0 && (
            <SummaryContainer summaries={summaries} />
          )}
          <div className="interview-container">
            {questions.length > 0 && !questions[questions.length - 1].isAnswered && (
              <div className="qa-pair-container">
                <Question
                  question={questions[questions.length - 1].question}
                />
                <AnswerInput
                  value={currentAnswer}
                  onChange={setCurrentAnswer}
                  onSubmit={handleSubmitAnswer}
                  loading={loading}
                />
              </div>
            )}
          </div>
        </>
      )}
      {loading && <Loading />}

      {isCompleted && <CompletionMessage story={story} />}
    </div>
  )
}

export default App