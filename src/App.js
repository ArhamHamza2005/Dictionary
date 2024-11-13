import React, { useState } from 'react';
import './App.css';

const Dictionary = () => {
  const [word, setWord] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(API_URL + word);
      if (!response.ok) throw new Error('Word not found');

      const data = await response.json();
      let definition = data[0]?.meanings[0]?.definitions[0];
      
      setResult({
        word: data[0].word,
        partOfSpeech: data[0].meanings[0].partOfSpeech,
        meaning: definition?.definition || "No meaning available",
        example: definition?.example || "No example available",
        sourceUrl: data[0].sourceUrls[0],
      });
      setError('');
    } catch (err) {
      setError('Sorry! Word not found...');
      setResult(null);
    }
  };

  return (
    <main>
      <form id="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a word"
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div className="result">
        {error && <p className="error">{error}</p>}
        {result && (
          <>
            <p id="word"><strong>Word:</strong> {result.word}</p>
            <p id="pos"><strong>Part of Speech:</strong> {result.partOfSpeech}</p>
            <p id="mean"><strong>Meaning:</strong> {result.meaning}</p>
            <p id="example"><strong>Example:</strong> {result.example}</p>
            <br />
            <a id="read" href={result.sourceUrl} target="_blank" rel="noopener noreferrer">
              Read More...
            </a>
          </>
        )}
      </div>
    </main>
  );
};

export default Dictionary;
