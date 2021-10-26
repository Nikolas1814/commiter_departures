import { useState } from 'react';
import './App.css';
import Schedule from './components/Schedule';
import StationSelector from './components/StationSelector';

//url: https://api-v3.mbta.com/predictions?page%5Boffset%5D=0&page%5Blimit%5D=20&sort=departure_time&filter%5Broute_type%5D=2&filter%5Bstop%5D=place-north&filter%5Bdirection_id%5D=0&include=stop,schedule
function App() {
	const [station, setStation] = useState('place-north')
	return <div className="App">
		<StationSelector station={station} setStation={setStation}/>
		<Schedule station={station} setStation={setStation}/>
	</div>
}

export default App;
