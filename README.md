Student Personal Finance Tracker Features:

Shows balance, income, expense
Set income, expense, savings goal
Shows savings goal
Shows transactions
Shows charts and analytics

Balance = income - expense

Income - source of money
expense - spendings

transactions - shows where did my money go and we can filter it out with categorization and type and date

Analytics - 

TECH STACK:
    React - frontend
    Backend - NodeJs + Express
    Database - MySQL
    Styling - tailwind



APP COMPONENTS:

Left side bar - 
    app title
    nav

Dashboard - 
    Total balance, income, expense, savings

    Charts, savings

    AddTransaction, SetGoal

    TransactionList


Transaction
    List, filter, search, categorize
    TransactionList

Reports Analytics 
    Monthly trend   trending by category
    top spending ctagory    daily avg spending



npm install react-router-dom
    - By default react has only one page, router helps you to show components
    The Three Main Things You Need to Know

npm install @fontsource/inter







FRONTEND
Step 1 → Set up App.jsx with routing
Step 2 → Build Sidebar with navigation links
Step 3 → Create empty page files
         (Dashboard, Transactions, Analytics)
Step 4 → Build Summary cards (hardcoded data)
Step 5 → Build TransactionForm
Step 6 → Build TransactionList + TransactionItem
Step 7 → Build GoalCard + GoalForm + GoalList
Step 8 → Build Charts (Recharts)
Step 9 → Build Analytics insights

BACKEND
Step 10 → Set up index.js (Express server)
Step 11 → Set up MySQL database + create tables
Step 12 → Set up database connection (config/db.js)
Step 13 → Build auth (register + login)
Step 14 → Build transaction routes, controllers, models
Step 15 → Build category routes, controllers, models
Step 16 → Build goal routes, controllers, models

CONNECTION 
Step 17 → Set up services/ folder (API calls)
Step 18 → Replace hardcoded data with real API calls
Step 19 → Add authentication (login/register pages)
Step 20 → Protect routes (only logged in users can access)

POLISH
Step 21 → Add loading states
Step 22 → Add error handling
Step 23 → Add empty states
         (e.g. "No transactions yet")
Step 24 → Test everything end to end









IMPORTANT NOTES


App.jsx
1 — BrowserRouter
Wraps your entire app. Enables routing to work.
Think of it as the engine that powers navigation.
2 — Routes and Route
Where you define which URL shows which page:
/dashboard   →   <Dashboard />
/transactions →  <Transactions />
/analytics   →   <Analytics />
3 — Link
Replaces normal <a> tags for navigation.
Clicking it changes the page without refreshing the browser.





Sidebar.jsx

navItems array — instead of writing each NavLink separately, we store them in an array and use .map() to render them. Cleaner and easier to add new items later.

item.icon — we store the icon component in the array and render it dynamically with <item.icon size={20} />.

transition-colors — Tailwind class that smoothly animates color changes when hovering.







PAGES

DASHBOARD
What Are Props?
Props are how a parent component passes data to a child component.
Think of it like a function with arguments:
js// normal function
function greet(name) {
  return 'Hello ' + name
}

greet('Juan') // → Hello Juan
Same idea in React:
jsx// child component
function SummaryCard({ title, amount }) {
  return <div>{title}: {amount}</div>
}

// parent passing data
<SummaryCard title="Balance" amount="₱45,000" />
title and amount are the props.

Why Do We Need This?
Your Dashboard will have three summary cards — Balance, Income, Expenses. Instead of building three separate components, you build one SummaryCard component and pass different data to each:
jsx<SummaryCard title="Balance" amount="₱45,000" color="blue" />
<SummaryCard title="Income" amount="₱60,000" color="green" />
<SummaryCard title="Expenses" amount="₱15,000" color="red" />


icon: Icon — we rename icon to Icon with a capital letter inside props because React requires component names to start with a capital letter.
colors[color] — we use the color prop as a key to look up the correct Tailwind classes from the colors object.
grid grid-cols-3 gap-4 — Tailwind CSS grid that creates 3 equal columns with a gap between them.

<SummaryCardwhich component to render
key={item.title}unique identifier for React (required inside .map())
title={item.title}passes the title prop
amount={item.amount}passes the amount prop
icon={item.icon}passes the icon prop
color={item.color}passes the color prop

key is special in React. When you use .map() to render a list, React needs a unique identifier for each item so it can track them efficiently.
jsxkey={item.title}
We use item.title as the key because each card has a unique title. React uses this behind the scenes — you never see it in the UI.








TransactionForm

What is useState?
It's a way to store and update data inside a component.

valuet - the current stored data
setValue - function to update the data
defaultValue - what it starts as


() => - when this is called
setType() - run this
type === 'expense' - a question to know if it is yes - true if no - false

TransactionList

Filtering doesn't remove data — it just hides what doesn't match.
we need filter state


Why Does React Need It? - Key
When your list changes — an item is added, deleted, or updated — React needs to know:

"Which item changed? Which one do I need to re-render?"

Without key, React has to re-render the entire list every time anything changes.
With key, React can pinpoint exactly which item changed and only re-render that one.

Whenever we use a map, we will use a key

- actual filtering logic
filter = 'all'     → typeMatch = true  (show everything)
filter = 'income'  → typeMatch = true  only if transaction.type is 'income'
filter = 'expense' → typeMatch = true  only if transaction.type is 'expense'








GOALS

we use hover for buttons while focus - it is to indicate that something is being activated by something like keyboard - for example we use it in a form inputs


What's Worth Understanding
ResponsiveContainer — makes charts resize automatically based on screen size.
dataKey — tells Recharts which property from your data to use:
jsxdataKey="income"  → uses the income value from each data object
dataKey="month"   → uses the month value for the axis labels
COLORS array with index % COLORS.length — cycles through colors even if there are more categories than colors:
index=0 → COLORS[0] = blue
index=1 → COLORS[1] = green
index=5 → COLORS[5 % 5] = COLORS[0] = blue (cycles back)






Analytics page
function InsightCard({ title, value, subtitle, icon: Icon, color}) - we write {} inside the parameters to allow destructuring. easy access to props without writing props.title


What's Worth Understanding


What is .reduce()?.reduce() loops through an array and boils it down to a single value.That single value can be:

A number (sum, average, max)
An object (like the top spending category)
Anything really

numbers.reduce((accumulator, currentItem) => {
  return ...
}, startingValue)


.reduce() vs .map() vs .filter()
.map() transforms each item new array same length
.filter() keeps items that pass new smaller array
.reduce() boils down to one thing single value


reduce() for finding the top category:
jsxexpenses.reduce((max, item) =>
  item.amount > max.amount ? item : max
, expenses[0])
This loops through expenses and keeps track of the highest one:
start  → max = { category: 'Food', amount: 5000 }
loop 1 → 10000 > 5000? YES → max = { category: 'Rent', amount: 10000 }
loop 2 → 2000 > 10000? NO  → max stays Rent
loop 3 → 3000 > 10000? NO  → max stays Rent
result → { category: 'Rent', amount: 10000 }
Savings Rate formula:
(income - expenses) / income * 100
(60000 - 14500) / 60000 * 100 = 75%











BACKEND

Where to Find Documentation
Library Documentation
Express - expressjs.com/en/starter/hello-world
MySQL2 - npmjs.com/package/mysql2
JWT - npmjs.com/package/jsonwebtoken
Bcrypt - npmjs.com/package/bcrypt
Dotenv - npmjs.com/package/dotenv

1. Never put passwords in your code → use .env
2. Always use cors() → lets React talk to backend
3. Always use express.json() → lets Express read JSON data

What is createPool?
It's a way to manage multiple database connections efficiently.




AUTH

The Flow

Register:
User submits name, email, password
→ backend hashes the password
→ saves user to database
→ returns success

Login:
User submits email, password
→ backend finds user by email
→ compares password with hashed password
→ if match → generates JWT token
→ returns token to frontend

Protected Routes:
Frontend sends request with token
→ backend verifies token
→ if valid → allows access
→ if invalid → returns 401 unauthorized

What is a JWT Token?
Think of it like a wristband at an event:
Login → get wristband (token)
Every request → show wristband
Backend checks wristband → lets you in
Wristband expires → login again

1 — Never Store Plain Passwords
js// ❌ never do this
password: "password123"

// ✅ always hash first
const hashedPassword = await bcrypt.hash(password, 10)
The 10 is called salt rounds — higher number = more secure but slower. 10 is the standard.

2 — The ? in SQL Queries
jsdb.query('SELECT * FROM users WHERE email = ?', [email])
Never do this:
js// ❌ dangerous - SQL injection risk
db.query(`SELECT * FROM users WHERE email = ${email}`)
The ? is a placeholder — mysql2 safely inserts the value for you, protecting against SQL injection attacks.

3 — What is SQL Injection?
When someone types malicious SQL into your form:
email: ' OR 1=1; DROP TABLE users; --
Without ? placeholders this could delete your entire database. The ? prevents this.

4 — HTTP Status Codes
jsres.status(201).json(...)  ← created
res.status(400).json(...)  ← bad request
res.status(401).json(...)  ← unauthorized
res.status(500).json(...)  ← server error
Always return the correct status code — it tells the frontend what happened.

5 — JWT Token Structure
A JWT token has three parts separated by dots:
header.payload.signature

eyJhbGc.eyJpZCI6M.x7Hs9dK
PartContainsHeaderalgorithm usedPayloaduser data (id, email)Signatureverifies token wasn't tampered with

6 — Never Put Sensitive Data in JWT Payload
js// ❌ never include password in token
jwt.sign({ id: user.id, password: user.password }, ...)

// ✅ only include non-sensitive data
jwt.sign({ id: user.id, email: user.email }, ...)
JWT payload is not encrypted — anyone can decode it.

7 — async/await vs Callbacks
js// old callback style
db.query('SELECT...', (error, results) => {
  console.log(results)
})

// modern async/await style
const [results] = await db.query('SELECT...')
console.log(results)
Always use async/await — cleaner and easier to read.

8 — try/catch for Error Handling
jsconst register = async (req, res) => {
  try {
    // code that might fail
  } catch (error) {
    // handle the error gracefully
    res.status(500).json({ message: 'Server error' })
  }
}
Without try/catch — one error crashes your entire server.

9 — How Middleware Works
const authMiddleware = (req, res, next) => {
  // verify token
  // if valid → call next()
  // if invalid → return error
}
next() is the key — it passes the request to the next function in the chain.

10 — The Request Flow
Client sends request
      ↓
cors() middleware
      ↓
express.json() middleware
      ↓
authMiddleware (for protected routes)
      ↓
Route handler
      ↓
Controller
      ↓
Model (database query)
      ↓
Response sent back


async - "This function will do something that takes time — and I need to wait for it."
await - "Stop here and wait until this finishes before moving to the next line."


Things Worth Understanding

JOIN in SQL query:
`SELECT t.*, c.name as category_name 
 FROM transactions t
 JOIN categories c ON t.category_id = c.id`
This combines transactions with categories so you get the category name instead of just the category_id number.


req.user.id:
const transactions = await getAllTransactions(req.user.id)
This comes from authMiddleware — it decoded the JWT token and attached the user to the request. So every transaction query is filtered by the logged in user.

req.params.id:
deleteTransaction(req.params.id, req.user.id)

This gets the id from the URL:
DELETE /api/transactions/5  → req.params.id = 5
goal_id || null:
jsgoal_id || null
If goal_id is empty or undefined → sends null to database instead of empty string.





BEARER TOKEN - SAMPLE
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqdWFuQGVtYWlsLmNvbSIsImlhdCI6MTc3ODM4ODAzNSwiZXhwIjoxNzc4OTkyODM1fQ.3G5hezLAfQ1vD99n19Gc5ZnIoX1q81hEP__9WTn0QmA




CONNECTING FRONTEND TO BACKEND
Phase 1 — Create API service functions
Phase 2 — Create login/register pages
Phase 3 — Store JWT token
Phase 4 — Replace hardcoded data with real API calls
Phase 5 — Protect routes (only logged in users can access)




Register page

State Variables:
jsxconst [name, setName] = useState('')
const [email, setEmail] = useState('')
Each input field has its own state. When user types → state updates → input shows the typed value.
Why validate before sending?
jsxif (!name || !email || !password || !contact_number) {
  setError('Please fill in all fields')
  return
}
This prevents empty data from going to the backend. Saves server resources and gives instant feedback to the user.
API call:
jsxconst result = await api.register(name, email, password, contact_number)
We wait for the response with await because registration takes time (hashing, database insert).
Check the response:
jsxif (result.message === 'User registered successfully') {
  navigate('/login')
}
The backend sends back a message telling us if it worked or not. We check it and act accordingly.

navigate works only inside the page so use location.replace




REPLACING HARD CODED WITH SQL

Before We Write Code
Do you understand useEffect?
Think of it like:

"When this component loads, do this."

jsxuseEffect(() => {
  // this runs when component first loads
}, [])
The empty [] means run only once when the component first mounts.

What is "Mounting"?
When a component first appears on the screen — that's called mounting.
User visits /transactions
→ Transactions component loads for the first time
→ component is "mounted"
→ appears on screen

Why Empty [] for Fetching Data?
You only want to fetch transactions once when the page loads — not every time something changes:

If you removed []:
User visits /transactions     → fetch data
User clicks filter button     → fetch data again (unnecessary!)
User types one letter         → fetch data again (unnecessary!)


TRANSACTION.JSX
What Changed and Why
useState([]) — starts as empty array instead of hardcoded data:
jsxconst [transactions, setTransactions] = useState([])
loading state — shows loading message while fetching:
jsxconst [loading, setLoading] = useState(true)
fetchTransactions function — separated into its own function so we can call it multiple times:
jsxconst fetchTransactions = async () => {
  setLoading(true)
  const data = await api.getTransactions(token)
  setTransactions(data)
  setLoading(false)
}
Why call fetchTransactions() after adding?
jsxconst addTransaction = async (transaction) => {
  await api.addTransaction(token, transaction)
  fetchTransactions() // ← refreshes the list with new data
}
After adding a transaction we need to refresh the list to show the new item. Instead of manually adding it to the array, we just re-fetch everything from the database — ensures data is always accurate.