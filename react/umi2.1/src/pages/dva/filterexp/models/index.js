import { routerRedux } from 'dva/router';
import { test } from '../services';
import { message } from 'antd';
import modelExtend from 'dva-model-extend';
import filterModel from 'utils/commonModel/index';

export default modelExtend(filterModel({ reqFn: test, namespace: 'filter' }), {
  namespace: 'filter',
  state: {
    test: '11',
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/businessHangingAccounts') {
          dispatch({
            type: 'getPageList',
            payload: {},
          });
          dispatch({
            type: 'getFilterStateList',
          });
        }
      });
    },
  },

  effects: {
    *toTest({ payload }, { put, call, select }) {
      const data = yield call(test, payload);
      if (data.code === 'S000000') {
        // yield put(routerRedux.push('/knowledge'));
        message.success('请求数据成功！');
      } else {
        throw data;
      }
    },
  },
  reducers: {
    saveData(state, { payload }) {
      return {
        ...state,
      };
    },
  },
});
