import React, {useState} from 'react';
import ErrorBoundary from '../Error-boundary/Error-boundary';
import Search from '../Search-panel/Search-panel';
import View from '../View/View';
import { ThemeContext } from '../Context/Context';
import { BrowserRouter as Router, Route, Routes, useLocation} from 'react-router-dom';
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

	const Introdaction = () => {
		return (
			<div>
				<h3>Welcome to search App(Star Wars)</h3>
				<section>
					<div>
						You can find next elements:
						<div>planets</div>
						<div>starships</div>
						<div>people</div>
						<div>vehicles</div>
						<div>species</div>
					</div>
					<div>just type one of this in search field</div>
				</section>
			</div>
		)
	}

	return (
		<ErrorBoundary>
			<Router>
				<ThemeContext.Provider value={theme}>
					<div className={`shell ${theme}`}>
						<div className="app">
							<div className="header">RS School. Task 3</div>
							<button className={`changeBtn ${theme}`} onClick={changeTheme}>Change theme</button>
							<Search onUpdateSearch= {onUpdateSearch}/>
							<Routes>
								{/* <Route path='/' element={<Navigate to='/view'/>}/> */}
								<Route path='/' element={<Introdaction/>}/>
								{/* <Route path='/search' element={<SearchPanel/>}/> */}
								{/* <Route path='/view' element={<View search={search}/>}/> */}
								<Route path='/view/:page?' element={<View search={search}/>}/>
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