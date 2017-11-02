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
const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
});

export {addExpense,editExpense,removeExpense}
