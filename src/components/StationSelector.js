import { useCallback, useEffect, useState } from 'react';
import axios from 'axios'

//url: https://api-v3.mbta.com/predictions?page%5Boffset%5D=0&page%5Blimit%5D=20&sort=departure_time&filter%5Broute_type%5D=2&filter%5Bstop%5D=place-north&filter%5Bdirection_id%5D=0&include=stop,schedule
function StationSelector({station, setStation}) {
	const [stations, setStations] = useState([])
	useEffect(()=>{
		axios.get(`https://api-v3.mbta.com/stops?page%5Boffset%5D=0&page%5Blimit%5D=100&filter%5Broute_type%5D=2`).then(({data}) => {
		console.log('stations', data)
		setStations(data.data)
	})
	}, [])

	const handleChange = useCallback((e)=>{
		setStation(e.target.value)
	}, [])

	return <div className="StationSelector">
		<select name="stations" value={station} onChange={handleChange}>
			{stations.map((station)=> <option key={station.id} value={station.relationships.parent_station?.data.id || station.id}>{station.attributes.name}</option>)}
		</select>
	</div>
}

export default StationSelector
