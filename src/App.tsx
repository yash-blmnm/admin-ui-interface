import './App.css';
import UsersList from './pages/UsersList';

function App() {

  return (
    <main className="flex flex-col items-center w-full gap-3 md:gap-6 px-2 py-4 md:px-12 md:py-8 h-screen">
      <UsersList />
    </main>
  )
}

export default App
