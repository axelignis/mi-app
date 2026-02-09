import { useState } from 'react'
import { chatWithClaude } from './claude'

function App() {
  const [message, setMessage] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    if (!message.trim()) return
    
    setLoading(true)
    setResponse('')
    
    try {
      const reply = await chatWithClaude(message)
      setResponse(reply)
    } catch (error) {
      setResponse('Error: ' + (error as Error).message)
    }
    
    setLoading(false)
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '1rem',
        padding: '2rem',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        <h1 style={{ textAlign: 'center', color: '#667eea' }}>
          💬 Chat con Claude
        </h1>
        
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Escribe tu mensaje..."
          style={{
            width: '100%',
            minHeight: '100px',
            padding: '1rem',
            fontSize: '1rem',
            borderRadius: '0.5rem',
            border: '2px solid #ddd',
            marginBottom: '1rem',
            fontFamily: 'system-ui'
          }}
        />
        
        <button
          onClick={handleSend}
          disabled={loading}
          style={{
            width: '100%',
            padding: '1rem',
            fontSize: '1.1rem',
            background: loading ? '#ccc' : '#667eea',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: 'bold'
          }}
        >
          {loading ? '⏳ Enviando...' : '🚀 Enviar'}
        </button>

        {response && (
          <div style={{
            marginTop: '2rem',
            padding: '1.5rem',
            background: '#f8f9fa',
            borderRadius: '0.5rem',
            borderLeft: '4px solid #667eea'
          }}>
            <strong style={{ color: '#667eea' }}>Claude:</strong>
            <p style={{ marginTop: '0.5rem', whiteSpace: 'pre-wrap' }}>
              {response}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
