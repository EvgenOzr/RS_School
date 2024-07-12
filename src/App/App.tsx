import React, {useState} from 'react';
import ErrorBoundary from '../Error-boundary/Error-boundary';
import Search from '../Search-panel/Search-panel';
import View from '../View/View';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate} from 'react-router-dom';
import './App.css'

const App = () => {
	
	const [search, setSearch] = useState('')


	const onUpdateSearch = (search: string) =>{
        setSearch(search)
    }

	const NoMatch = () => {
		const location = useLocation();
	  
		return (
		  <div>
			<h3>
			  No match for <code>{location.pathname}</code>
			</h3>
		  </div>
		);
	}

	// const SearchPanel = () => {
	// 	return (
	// 		<div>
	// 			<Search onUpdateSearch= {onUpdateSearch}/>
	// 			<View search = {search}/>
	// 		</div>
	// 	)
	// }

	return (
		<ErrorBoundary>
			{/* <MemoryRouter basename='/search'> */}
			{/* <Router basename='/search'> */}
			<Router>
				<div className="app">
					<div className="header">RS School. Task 2</div>
					<Search onUpdateSearch= {onUpdateSearch}/>
					<Routes>
						<Route path='/' element={<Navigate to='/view'/>}/>
						{/* <Route path='/search' element={<SearchPanel/>}/> */}
						<Route path='/view' element={<View search={search}/>}/>
						<Route path='/view/:page' element={<View search={search}/>}/>
						<Route path='*' element={<NoMatch/>}/>
					</Routes>
				</div>
			</Router>
			{/* </MemoryRouter> */}
		</ErrorBoundary>
	)

}

export default App;