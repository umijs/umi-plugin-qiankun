import { query } from '@/services/user';

export default {
  namespace: 'user',

  state: {
    list: [],
  },

  effects: {
    *query(_, { put }) {
      const { data } = yield query();
      yield put({
        type: 'querySuccess',
        payload: {
          list: data,
        },
      });
    },
  },

  reducers: {
    querySuccess(state, { payload }) {
      state.list = payload.list;
    },
  },
};
