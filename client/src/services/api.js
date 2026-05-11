const API_URL = 'http://localhost:5000/api'

export const api = {
  // Auth
  register: async (name, email, password, contact_number) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, contact_number })
    })
    return response.json()
  },

  login: async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    return response.json()
  },

  // Transactions
  getTransactions: async (token) => {
    const response = await fetch(`${API_URL}/transactions`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    return response.json()
  },

  addTransaction: async (token, transaction) => {
    const response = await fetch(`${API_URL}/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(transaction)
    })
    return response.json()
  },

  updateTransaction: async (token, id, transaction) => {
    const response = await fetch(`${API_URL}/transactions/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(transaction)
    })
    return response.json()
  },

  deleteTransaction: async (token, id) => {
    const response = await fetch(`${API_URL}/transactions/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    })
    return response.json()
  },

  // Goals
  getGoals: async (token) => {
    const response = await fetch(`${API_URL}/goals`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    return response.json()
  },

  addGoal: async (token, goal) => {
    const response = await fetch(`${API_URL}/goals`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(goal)
    })
    return response.json()
  },

  updateGoal: async (token, id, goal) => {
    const response = await fetch(`${API_URL}/goals/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(goal)
    })
    return response.json()
  },

  deleteGoal: async (token, id) => {
    const response = await fetch(`${API_URL}/goals/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    })
    return response.json()
  },

  // Categories
    getCategories: async () => {
      const response = await fetch(`${API_URL}/categories`)
      return response.json()
    },

    getCategoriesByType: async (type) => {
      const response = await fetch(`${API_URL}/categories/${type}`)
      return response.json()
    },


}

