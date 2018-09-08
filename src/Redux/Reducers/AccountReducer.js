import {
  REQUEST_ACCOUNT_CREDIT,
  DISPATCH_ACCOUNT_CREDIT,
} from '../Actions/actionCreators';

const initialState = {
  accountCredit: 100000,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case REQUEST_ACCOUNT_CREDIT:
      return {
        ...state,
        accountCredit: action.payload,
      };
    case DISPATCH_ACCOUNT_CREDIT:

      return {
        ...state,
        accountCredit: action.payload,
      };
    default:
      return state;
  }
}
