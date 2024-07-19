import React, {useState, useContext, createContext} from 'react';
import ErrorBoundary from '../Error-boundary/Error-boundary';
import Search from '../Search-panel/Search-panel';
import View from '../View/View';
import { ThemeContext } from '../Context/Context';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate} from 'react-router-dom';
import './App.css'

const App = () => {
	
	const [search, setSearch] = useState('')
	const [theme, setTheme] = useState('light')

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

	const changeTheme = () => {
		if(theme === 'light') {
			setTheme('dark')
		} else {
			setTheme('light')
		}
	}

	return (
		<ErrorBoundary>
			<Router>
				<ThemeContext.Provider value={theme}>
					<div className={`shell ${theme}`}>
						<div className="app">
							<div className="header">RS School. Task 2</div>
							<button className={`changeBtn ${theme}`} onClick={changeTheme}>Change theme</button>
							<Search onUpdateSearch= {onUpdateSearch}/>
							<Routes>
								<Route path='/' element={<Navigate to='/view'/>}/>
								{/* <Route path='/search' element={<SearchPanel/>}/> */}
								<Route path='/view' element={<View search={search}/>}/>
								<Route path='/view/:page' element={<View search={search}/>}/>
								<Route path='*' element={<NoMatch/>}/>
							</Routes>
						</div>
					</div>
				</ThemeContext.Provider>
			</Router>
		</ErrorBoundary>
	)
}

export default App;