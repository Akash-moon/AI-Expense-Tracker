'use strict';
import React, { useState, useEffect, useCallback } from "react";

//------------------------SPEECH RECOGNITION-----------------------------

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = 'en-US';

//------------------------COMPONENT-----------------------------

const category_income = [
  'business', 'investments', 'extra income', 'deposits', 'lottery', 'gifts', 'salary', 'savings', 'rental income'
];
const category_expense = [
  'bills', 'car', 'clothes', 'travel', 'food', 'shopping', 'house', 'entertainment', 'phone', 'pets', 'other'
];

const Speech = () => {
  const [listening, setListening] = useState(false);
  const [finalTranscript, setFinalTranscript] = useState('');

  const toggleListen = useCallback(() => {
    setListening(prevListening => !prevListening);
  }, []);

  useEffect(() => {
    const handleListen = () => {
      console.log('listening?', listening);

      if (listening) {
        recognition.start();
        recognition.onend = () => {
          console.log("...continue listening...");
          recognition.start();
        };
      } else {
        recognition.stop();
        recognition.onend = () => {
          console.log("Stopped listening per click");
        };
      }

      recognition.onstart = () => {
        console.log("Listening!");
      };

      recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) finalTranscript += transcript + ' ';
          else interimTranscript += transcript;
        }

        document.getElementById('interim').innerHTML = interimTranscript;
        document.getElementById('final').innerHTML = finalTranscript;
        setFinalTranscript(finalTranscript.trim());

        parseCommands(finalTranscript.trim());
      };

      recognition.onerror = (event) => {
        console.log("Error occurred in recognition: " + event.error);
      };
    };

    handleListen();
  }, [listening]);

  const parseCommands = (transcript) => {
    const commands = transcript.toLowerCase();

    if (/create|finish|save/.test(commands)) {
      console.log("Command: Create Transaction");
      // Implement create transaction logic here
    }

    if (/cancel|delete|remove|clear/.test(commands)) {
      console.log("Command: Cancel Transaction");
      // Implement cancel transaction logic here
    }

    if (/set|change/.test(commands) && /category/.test(commands)) {
      const category = commands.match(/category (.+)/);
      if (category) {
        const categoryName = category[1].trim();
        console.log(`Command: Add Category - ${categoryName}`);
        // Implement add category logic here
      }
    }

    if (/date/.test(commands)) {
      const date = commands.match(/date (.+)/);
      if (date) {
        const dateValue = date[1].trim();
        console.log(`Command: Add Date - ${dateValue}`);
        // Implement add date logic here
      }
    }

    if (/amount/.test(commands)) {
      const amount = commands.match(/amount (.+) dollars?/);
      if (amount) {
        const amountValue = amount[1].trim();
        console.log(`Command: Add Amount - ${amountValue}`);
        // Implement add amount logic here
      }
    }

    if (/expense/.test(commands)) {
      const expenseDetails = commands.match(/expense (.+)/);
      if (expenseDetails) {
        const details = expenseDetails[1].trim();
        console.log(`Command: Add Expense - ${details}`);
        // Implement add expense logic here
      }
    }

    if (/income|balance/.test(commands)) {
      const incomeDetails = commands.match(/income (.+)|balance (.+)/);
      if (incomeDetails) {
        const details = incomeDetails[1] ? incomeDetails[1].trim() : incomeDetails[2].trim();
        console.log(`Command: Add Income - ${details}`);
        // Implement add income logic here
      }
    }
  };

  return (
    <div style={container}>
      <button id='microphone-btn' style={button} onClick={toggleListen}>
        {listening ? 'Stop Listening' : 'Start Listening'}
      </button>
      <div id='interim' style={interim}></div>
      <div id='final' style={final}></div>
    </div>
  );
};

const container = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '2rem',
  border: '1px solid #ccc'
};

const button = {
  padding: '1rem 2rem',
  margin: '1rem',
  fontSize: '1.5rem',
  cursor: 'pointer'
};

const interim = {
  color: 'gray',
  marginTop: '1rem'
};

const final = {
  color: 'black',
  marginTop: '1rem'
};

export default Speech;
