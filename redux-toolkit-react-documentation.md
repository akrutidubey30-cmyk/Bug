# Redux Toolkit with React: A Working Guide

*Personal learning documentation written as a reference for future me, covering Redux Toolkit basics while integrating it into a React project.*

## Introduction to Redux Toolkit

Redux Toolkit (RTK) is the official, recommended package for writing Redux logic. It's built directly on top of the original Redux library, wrapping the parts that used to require a lot of manual setup store configuration, action types, reducers into a smaller set of functions that do the same job with far less code.

It ships as one npm package: `@reduxjs/toolkit`. Inside it are `configureStore`, `createSlice`, `createAsyncThunk`, and RTK Query, all pre-wired to work together. There's no need to install plain Redux separately RTK includes what's needed.

## Why Redux Toolkit is Used

Plain Redux worked, but writing it by hand meant a lot of repetitive files for even a small feature: action type constants, action creator functions, a switch-statement reducer, manual store setup with middleware. Redux Toolkit exists to remove that repetition. A few concrete reasons it gets used:

- **Less boilerplate** one `createSlice` call replaces what used to be three separate files.
- **Built-in Immer** state updates can be written as if they mutate state directly, and RTK converts them into safe, immutable updates automatically.
- **DevTools out of the box** `configureStore` wires up the Redux DevTools extension with no manual setup.
- **One shared convention** before RTK, every team structured Redux slightly differently. RTK gives a common pattern everyone recognizes.
- **Scales past Context** Context re-renders every consumer on any change; a properly sliced Redux store only re-renders components subscribed to the specific piece of state that changed.

None of this means Redux Toolkit is always the right call. For a small app, `useState` and Context are often enough. RTK earns its place once several unrelated components need to share and reliably update the same data.

## Core Concepts

A handful of terms come up constantly. Here's what each one means in practice, not the textbook definition:

**Store** one object holding the entire app's state. Usually just one per app.

**Slice** a self-contained chunk of state for one feature (cart, auth, counter, whatever), bundled together with the reducers and actions that update it. This is RTK's biggest improvement over plain Redux before, state, reducers, and actions lived in three separate files. Now they live in one.

**Reducer** the function that decides how state changes when an action happens. It's never called directly.

**Action** a plain object describing what happened (`increment`, `addToCart`). RTK generates these automatically from a slice.

**Dispatch** how an action gets fired. `dispatch(increment())` sends it to the store.

**Selector** how a component reads one specific piece of state, without pulling in the whole store.

## Data Flow

Redux (and RTK) follows a strict one-way cycle. Every update, no matter how small, goes through the same steps:

1. **Component dispatches an action** e.g. a button's `onClick` calls `dispatch(increment())`.
2. **The store routes the action to the right reducer** based on which slice registered that action type.
3. **The reducer computes new state** via Immer, so it reads like mutation but produces a new state object.
4. **The store saves the new state and notifies subscribers.**
5. **Connected components re-render** but only the ones whose `useSelector` actually reads the piece of state that changed.

```
Component: dispatch(action()) ->

Store: routes the action to the right slice reducer ->

Reducer: computes new state (Immer makes it "look" mutable) -> 

Store: saves new state, notifies all subscribers -> 

Components: useSelector re-checks → re-renders ONLY if its slice changed
```

*(See the diagram shared alongside this doc for the same flow, visually.)*

The part worth internalizing: components never change state directly. They only ever describe what happened (dispatch an action) and read the current state (via a selector). Everything in between is the reducer's job.

## Important Functions

| Function | From | What it does |
|---|---|---|
| `configureStore()` | `@reduxjs/toolkit` | Creates the store, wires up DevTools and default middleware |
| `createSlice()` | `@reduxjs/toolkit` | Defines a slice's initial state, reducers, and auto-generated actions in one call |
| `createAsyncThunk()` | `@reduxjs/toolkit` | Wraps an async function (API call) so it dispatches pending/fulfilled/rejected actions automatically |
| `useSelector()` | `react-redux` | Reads a piece of state from the store inside a component |
| `useDispatch()` | `react-redux` | Returns the `dispatch` function to send actions |
| `<Provider>` | `react-redux` | Makes the store available to the whole component tree via Context |

## Putting It Together Step by Step

### 1. Installation

```bash
npm install @reduxjs/toolkit react-redux
```

Two packages, two separate jobs: `@reduxjs/toolkit` handles the state logic itself, `react-redux` connects that state to components via `Provider` and hooks.

### 2. Setting up the store

```js
// store.js
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})
```

### 3. Creating a slice

```js
// counterSlice.js
import { createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions
export default counterSlice.reducer
```

That `state.value += 1` looks like direct mutation, which Redux is supposed to never allow. It isn't actually mutating anything Immer, working behind the scenes, converts it into a proper immutable update. This is the one thing that confuses almost everyone coming from plain Redux, so it's worth remembering clearly: the trick only works inside `createSlice`. Try the same thing in a regular component or a plain function, and it will break.

### 4. Connecting React: the Provider

```jsx
// main.jsx
import { Provider } from 'react-redux'
import { store } from './store'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
```

`Provider` makes the store available to every component underneath it through Context. Wrap the top-level `<App />` once, and this file doesn't need to be touched again.

### 5. Reading and updating state in a component

```jsx
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement } from './counterSlice'

function Counter() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  )
}
```

`useSelector` reads from the store, `useDispatch` sends actions. That's really the entire API surface needed for basic state management.

### 6. Handling async data

Regular reducers have to stay synchronous, so they can't handle API calls directly. For fetching data, RTK ships `createAsyncThunk`:

```js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchUser = createAsyncThunk('user/fetchUser', async (userId) => {
  const response = await fetch(`/api/users/${userId}`)
  return response.json()
})

const userSlice = createSlice({
  name: 'user',
  initialState: { data: null, status: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
  },
})
```

This is enough to get started. For an app that leans heavily on API fetching, RTK Query is worth a dedicated look next it ships in the same package and handles caching, loading state, and refetching on its own, cutting out the need to hand-write this pattern for every endpoint.

## Real-World Use Cases

Places RTK genuinely earns its place, rather than being reached for out of habit:

- **Shopping cart state** items, quantities, and totals need to be read and updated from the product grid, the navbar cart icon, and the checkout page at once. A natural fit for a cart-based e-commerce project.
- **Authentication/session state** logged-in user info, tokens, and role need to be available anywhere in the app without prop drilling through every layout.
- **Theme and UI preferences** dark/light mode, sidebar collapsed state, and similar settings that many unrelated components need to read.
- **Multi-step forms** data collected across several steps or pages before final submission.
- **Global notification/toast queue** any component can push a notification without knowing which component renders the toast UI.

## Common Mistakes / Troubleshooting

- **`useSelector((state) => state)`** grabbing the entire store instead of one slice. Every state change anywhere in the app re-renders this component. Select only what's needed: `useSelector((state) => state.counter.value)`.
- **Slice key mismatch** the key given to a reducer inside `configureStore` has to match how it's read in `useSelector`. Register a slice as `counter` but write `state.counterState.value`, and the result is `undefined`.
- **Forgetting the Provider** any `useSelector` or `useDispatch` call outside a `<Provider>` throws immediately. Easy to miss when adding Redux to a project partway through.
- **Mutating state outside a slice** Immer's mutation trick is scoped to `createSlice`. It won't help in a regular component or a helper function.

## My Own Notes

The mental model that helped me most was thinking of Redux as a central data box. Components do not change the data inside this box directly. They dispatch an action describing what happened, the reducer updates the state, and components read the latest state with `useSelector`.

- `useState` is useful for temporary data needed by one component, such as form input values. Redux is more useful when the same data is needed by several unrelated components.
- A slice keeps a feature's state, reducers, and generated actions together. In my Bugflow project, I created separate slices for bugs and authentication.
- `action.payload` is the data sent with an action. For example, the add-bug form sends the complete new bug object, while the delete action only needs the bug ID.
- Redux state is temporary during a browser session unless it is saved somewhere. I synchronized important Redux data with Local Storage so bugs, accounts, the current user, and the selected theme remain after a reload.
- The basic flow I want to remember is: user action → dispatch → reducer → store update → component re-render.

## Challenges I Faced

- **Choosing between local and global state:** At first, it was confusing to decide whether every value should go into Redux. I solved this by keeping form fields in `useState` and moving shared data such as bugs, authentication, theme, sidebar, and modal state into Redux.
- **Removing prop drilling:** Bug data and actions were initially passed through components. As more pages needed the same data, this became difficult to follow. Using `useSelector` and `useDispatch` inside the components made the data flow clearer.
- **Updating one specific bug:** For edit and status features, I needed to find the correct bug by its ID before changing it. I used `find()` for updates and `filter()` for deletion.
- **Keeping data after reload:** Redux state reset when the page refreshed. I used `useEffect` and Local Storage to save and restore the important state.
- **Protected routes:** The dashboard should not be available before login. I created a protected route that checks `currentUser` from Redux and redirects unauthenticated users to the login page.
- **Sidebar layout:** The expanded sidebar originally covered the dashboard. I stored the sidebar state in Redux and changed the content area's left spacing based on whether the sidebar was expanded.

## Additional Things I Explored

- I used Redux for UI state as well as business data. The light/dark theme, desktop sidebar, mobile menu, and add-bug modal are all controlled through Redux actions.
- I built username-based authentication with a separate auth slice and protected routes. This is suitable for a learning project, although a production application would require a backend and secure password handling.
- I connected Redux state with Local Storage for persistence.
- I implemented complete CRUD operations: adding, displaying, editing, status updating, and deleting bugs.
- I added dynamic routes for bug details and editing, such as `/bugs/:bugId` and `/bugs/:bugId/edit`.
- I replaced browser alerts with toast notifications, including a custom delete confirmation toast.
- I created responsive desktop and mobile dashboards and made the selected theme work across the full application.

## Further Reading

- Redux Toolkit docs: https://redux-toolkit.js.org
- Redux core concepts: https://redux.js.org
- RTK Query (for API-heavy apps) built into the same `@reduxjs/toolkit` package, worth its own pass once the basics feel solid
