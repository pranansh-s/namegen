import { createSlice } from '@reduxjs/toolkit';
import { industries, styles } from '../../data/options';
import axios from 'axios';

const { parseString } = require('xml2js');

const BASE_API_PATH = 'https://api.groq.com/openai/v1/chat/completions';

const BASE_PROMPT = {
  model: 'llama-3.3-70b-versatile',
  messages: [
    {
      role: 'system',
      content:
        "you're a name generator that outputs 25 creative names based on the inputs provided. Ensure to follow the style as instructed before. It's important. Keep names shorter than 8 characters and ensure they pass the radio test",
    },
    { role: 'user', content: '' },
  ],
  max_tokens: 300,
  temperature: 0.7,
  frequency_penalty: 0,
  presence_penalty: 0,
  top_p: 1,
  stop: ['###'],
};

const initialState = {
  page: 0,
  searchTerm: '',
  industry: 0,
  keywords: [],
  styles: [0],
  results: [],
  saved: [],

  selectedName: null,
  isSavedOn: false,
};

const startupNameGeneratorSlice = createSlice({
  name: 'startupNameGenerator',
  initialState,
  reducers: {
    resetState: _ => initialState,
    pageSet: (state, action) => {
      state.page = action.payload;
    },
    searchTermSet: (state, action) => {
      state.searchTerm = action.payload;
    },
    industrySet: (state, action) => {
      state.industry = action.payload;
    },
    keywordsSet: (state, action) => {
      state.keywords = action.payload;
    },
    stylesSet: (state, action) => {
      let styles = state.styles;
      if (styles.includes(action.payload)) {
        if (styles.length > 1) styles = styles.filter(idx => idx != action.payload);
      } else if (styles.length <= 2) {
        styles.push(action.payload);
        if (styles.includes(0)) styles = styles.filter(idx => idx != 0);
        if (action.payload == 0 || styles.length === 11) styles = [0];
      }
      state.styles = styles;
    },
    resultsSet: (state, action) => {
      let res = state.results;
      res.push(...action.payload);
      const uniqueList = res.filter((value, index, array) => array.indexOf(value) === index);
      state.results = uniqueList;
    },
    clearResults: state => {
      state.results = [];
    },
    savedSet: (state, action) => {
      let saved = state.saved.map(item => ({ ...item }));
      if (saved.some(item => item.name === action.payload.name)) {
        saved = saved.filter(val => val.name != action.payload.name);
      } else {
        saved.push(action.payload);
      }
      localStorage.setItem('saved', JSON.stringify(saved));
      state.saved = saved;
    },
    savedArraySet: (state, action) => {
      state.saved = action.payload;
      localStorage.setItem('saved', action.payload);
    },
    selectedNameSet: (state, action) => {
      state.selectedName = action.payload;
    },
    clearSelectedNameSet: state => {
      state.selectedName = null;
    },
    isSavedOnSet: (state, action) => {
      state.isSavedOn = action.payload;
    },
  },
});

export const savedSetAsync = name => async dispatch => {
  const com = await axios.post('/api/check-domain', { domain: `${name}.com` });

  let trademark = null;
  try {
    let trademMarkCall = await axios.get(`${TRADEMARK_API_PATH}/basicSearch?query=${name}`);
    parseString(trademMarkCall.data, (err, result) => {
      if (err) {
        console.log(err, '<- Error');
      } else {
        trademark = result.response.result[0].$.numFound ? true : false;
      }
    });
  } catch {
    trademark = null;
  }

  dispatch(
    savedSet({
      name: name,
      domain: com.data[0].available,
      trademark: trademark,
    })
  );
};

export const resultsSetAsync = () => async (dispatch, getState) => {
  const { startupNameGenerator } = getState();
  for (var i in startupNameGenerator.styles) {
    let PROMPT = `Description: ${startupNameGenerator.searchTerm} Keywords: ${
      startupNameGenerator.keywords.join(', ') || ''
    } Industry: ${
      typeof startupNameGenerator.industry == 'number'
        ? industries[startupNameGenerator.industry]
        : startupNameGenerator.industry
    } Style: ${styles[i]} Result:`;

    let FINAL_PROMPT = { ...BASE_PROMPT };
    FINAL_PROMPT.messages[1].content = PROMPT;
    let res = await axios.post(BASE_API_PATH, FINAL_PROMPT, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_SECRET}`,
        'Content-Type': 'application/json',
      },
    });

    let results = res.data.choices[0].message.content.replace(/^\d+\.\s+/gm, '').split('\n');
    results = results.filter(
      item => item.length > 0 && item.length < 50 && item.split(' ').every(word => word.length <= 13)
    );
    dispatch(resultsSet(results));
  }
};

export const {
  resultsSet,
  resetState,
  pageSet,
  searchTermSet,
  industrySet,
  keywordsSet,
  stylesSet,
  clearResults,
  savedSet,
  savedArraySet,
  isSavedOnSet,
  selectedNameSet,
  clearSelectedNameSet,
} = startupNameGeneratorSlice.actions;
export default startupNameGeneratorSlice.reducer;
