import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const TRADEMARK_API_PATH = 'https://assignment-api.uspto.gov/trademark';

const initialState = {
	com: false,
	net: false,
	org: false,
	me: false,
	xyz: false,
	trademark: false,
	loading: true,
};

const domainSlice = createSlice({
  name: 'domain',
  initialState,
  reducers: {
		resetDomain: (_) => {
			return initialState;
		},

    domainSet: (_, action) => {
			const { com, net, org, me, xyz, trademark } = action.payload;
      return {
				com,
				net,
				org,
				me,
				xyz,
				trademark,
				loading: false
			}
    },
  },
});

export const { domainSet, resetDomain } = domainSlice.actions;
export default domainSlice.reducer;

export const domainSetAsync = nme => async dispatch => {
  const name = nme.toLowerCase().replace(/\s/g, '');
  const domainList = [
    { domain: `${name}.com` },
    { domain: `${name}.net` },
    { domain: `${name}.org` },
    { domain: `${name}.me` },
    { domain: `${name}.xyz` },
  ];

  const domains = await axios.post('/api/check-domain', domainList);

  let trademark = null;
  try {
    let trademMarkCall = await axios.get(`${TRADEMARK_API_PATH}/basicSearch?query=${nme}`);
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
    domainSet({
      com: domains.data[0].available,
      net: domains.data[1].available,
      org: domains.data[2].available,
      me: domains.data[3].available,
      xyz: domains.data[4].available,
      trademark: trademark,
    })
  );
};