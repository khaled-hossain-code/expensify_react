import { createStore, combineReducers} from 'redux';
import uuid from 'uuid';
//ADD_EXPENSE
const addExpense = ({
  description = '',
  note = '',
  amount = 0,
  createdAt = 0
} = {}) => ({
  type: "ADD_EXPENSE",
  expenses: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
});

// EDIT EXPENSE
const editExpense = (id, expenses = {}) => ({
  type: 'EDIT_EXPENSE',
  id,
  expenses
});

// REMOVE EXPENSE
const removeExpense = ( { id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
});

// SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text
});
// SORT_BY_DATE
const sortByDate = () => ({
  type: "SORT_BY_DATE"
});
// SORT_BY_AMOUNT
const sortByAmount = () => ({
  type: "SORT_BY_AMOUNT"
});
// SET_START_DATE
const setStartDate = ( date ) => ({
  type: 'SET_START_DATE',
  date
});
// SET_END_DATE
const setEndDate = (date) => ({
  type: 'SET_END_DATE',
  date
});

const demoState = {
    expenses: [{
      id:'asdfqwe',
      description: 'January Rent',
      note: 'total payment of january',
      amount: 45500,
      createdAt: 0  
    }],
    filters: {
      text: 'rent',
      sortBy: 'amount',
      startDate: undefined,
      endDate: undefined
    }
};

const expenseReducer = (state = [], action) => {
  switch(action.type){
    case 'ADD_EXPENSE':
      return [...state, action.expenses];
    case 'EDIT_EXPENSE':
      return state.map( expense => {
        if ( expense.id === action.id) {
          return {...expense,...action.expenses}
        }
        return expense
      })
    case 'REMOVE_EXPENSE':
      return state.filter( ({id}) => id !== action.id)
    default:
      return state;
  }
}

const filtersReducerDefault = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
}

const filtersReducer = (state = filtersReducerDefault, action) => {
  switch(action.type){
    case 'SET_TEXT_FILTER':
      return {...state,text:action.text}
    case 'SORT_BY_DATE':
      return {...state,sortBy:'date'}
    case 'SORT_BY_AMOUNT':
      return {...state,sortBy:'amount'}
    case 'SET_START_DATE':
      return {...state, startDate: action.date}
    case 'SET_END_DATE':
      return {...state, endDate: action.date}
    default:
      return state;
  }
}

const store = createStore(
  combineReducers({
    expenses: expenseReducer,
    filters: filtersReducer
  })
);

const getVisibileExpenses = ( expenses, {text, sortBy, startDate, endDate}) => {
  return expenses.filter( expense => {
    const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
    const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
    const textMatch = expense.description.toLowerCase().includes( text.toLowerCase());

    return startDateMatch && endDateMatch && textMatch; //if all true item will be returned 
  }).sort( (a,b) => {
    if(sortBy === 'date'){
      return a.createdAt < b.createdAt ? 1 : -1;
    }else if( sortBy == 'amount') {
      return a.amount < b.amount ? 1 : -1;
    }
  })
}

store.subscribe( () => {
  const state = store.getState();
  const visibleExpenses = getVisibileExpenses(state.expenses, state.filters);
  console.log(visibleExpenses);
});

const expenseOne = store.dispatch(addExpense({ description: 'rent', amount: 1000, createdAt: 1000}));
const expenseTwo = store.dispatch(addExpense({ description: 'coffe', amount: 3000, createdAt: 2000}));
// store.dispatch(removeExpense(expenseTwo.expenses));
// store.dispatch(editExpense(expenseOne.expenses.id, {amount: 2000}));

store.dispatch(setTextFilter('Rent'));
// store.dispatch(setTextFilter());

// store.dispatch(sortByAmount());
// store.dispatch(sortByDate());
// store.dispatch(setStartDate(0));
// store.dispatch(setStartDate(1100));
// store.dispatch(setEndDate(1350));