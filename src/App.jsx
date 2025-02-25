import { Loading } from './components';

function App({ children }) {
  return (
    <div className='page-wrapper'>
      <Loading />
      <main>
        {children}
      </main>
    </div>
  )
}

export default App