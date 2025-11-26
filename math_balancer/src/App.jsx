import React, { useState, useEffect } from 'react';
import { Apple, Star, Car, Square, Heart, Circle, Smile, Cloud } from 'lucide-react';
import confetti from 'canvas-confetti';
import './index.css';

const ICONS = [Apple, Star, Car, Square, Heart, Circle, Smile, Cloud];
const COLORS = ['#e74c3c', '#f1c40f', '#3498db', '#9b59b6', '#2ecc71', '#e67e22'];

function App() {
  const [level, setLevel] = useState(1);
  const [operation, setOperation] = useState('add');
  const [score, setScore] = useState(0);
  const [problem, setProblem] = useState(null);
  const [options, setOptions] = useState([]);
  const [feedback, setFeedback] = useState('none'); // 'none', 'correct', 'wrong'
  const [shaking, setShaking] = useState(null); // index of shaking button

  useEffect(() => {
    generateProblem();
  }, [level, operation]);

  const generateProblem = () => {
    let num1, num2, answer;
    const Icon = ICONS[Math.floor(Math.random() * ICONS.length)];
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];

    if (level === 1) {
      if (operation === 'add') {
        num1 = Math.floor(Math.random() * 5) + 1; // 1-5
        num2 = Math.floor(Math.random() * 4) + 1; // 1-4
        answer = num1 + num2;
      } else {
        num1 = Math.floor(Math.random() * 9) + 1; // 1-9
        num2 = Math.floor(Math.random() * num1); // 0 to num1-1
        answer = num1 - num2;
      }
    } else {
      if (operation === 'add') {
        num1 = Math.floor(Math.random() * 10) + 5; // 5-14
        num2 = Math.floor(Math.random() * 10) + 1; // 1-10
        answer = num1 + num2;
      } else {
        num1 = Math.floor(Math.random() * 10) + 10; // 10-19
        num2 = Math.floor(Math.random() * 9) + 1; // 1-9
        answer = num1 - num2;
      }
    }

    // Generate options
    const opts = new Set([answer]);
    while (opts.size < 3) {
      let offset = Math.floor(Math.random() * 5) - 2; // -2 to 2
      if (offset === 0) offset = 3;
      let val = answer + offset;
      if (val >= 0) opts.add(val);
    }

    setProblem({ num1, num2, answer, Icon, color });
    setOptions(Array.from(opts).sort(() => Math.random() - 0.5));
    setFeedback('none');
    setShaking(null);
  };

  const handleAnswer = (val, idx) => {
    if (feedback === 'correct') return;

    if (val === problem.answer) {
      setFeedback('correct');
      setScore(s => s + 1);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      setTimeout(generateProblem, 1500);
    } else {
      setShaking(idx);
      setTimeout(() => setShaking(null), 500);
    }
  };

  if (!problem) return null;

  const { Icon, color } = problem;

  return (
    <div className="app-container">
      <header>
        <div className="score-badge">
          <Star fill="#f1c40f" stroke="#f39c12" />
          <span>{score}</span>
        </div>
        <div className="controls">
          <div className="toggle-group">
            <button
              className={level === 1 ? 'active' : ''}
              onClick={() => setLevel(1)}
            >
              Level 1
            </button>
            <button
              className={level === 2 ? 'active' : ''}
              onClick={() => setLevel(2)}
            >
              Level 2
            </button>
          </div>
          <div className="toggle-group">
            <button
              className={operation === 'add' ? 'active' : ''}
              onClick={() => setOperation('add')}
            >
              +
            </button>
            <button
              className={operation === 'sub' ? 'active' : ''}
              onClick={() => setOperation('sub')}
            >
              -
            </button>
          </div>
        </div>
      </header>

      <main>
        <div className="problem-card">
          <div className="number-group">
            <div className="number">{problem.num1}</div>
            <div className="icons">
              {Array.from({ length: problem.num1 }).map((_, i) => (
                <Icon key={i} size={24} color={color} fill={color} />
              ))}
            </div>
          </div>

          <div className="operator">
            {operation === 'add' ? '+' : '-'}
          </div>

          <div className="number-group">
            <div className="number">{problem.num2}</div>
            <div className="icons">
              {Array.from({ length: problem.num2 }).map((_, i) => (
                <div key={i} className={operation === 'sub' ? 'crossed-out' : ''}>
                  <Icon size={24} color={color} fill={color} />
                </div>
              ))}
            </div>
          </div>

          <div className="operator">=</div>

          <div className="number-group">
            <div className="number">?</div>
          </div>
        </div>

        {feedback === 'correct' && (
          <div className="feedback-message">Correct! 🎉</div>
        )}

        <div className="options-grid">
          {options.map((opt, idx) => (
            <button
              key={idx}
              className={`option-btn ${shaking === idx ? 'shake' : ''} ${feedback === 'correct' && opt === problem.answer ? 'bounce' : ''}`}
              onClick={() => handleAnswer(opt, idx)}
            >
              {opt}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
