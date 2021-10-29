import { useCallback, useEffect, useState } from 'react';
import axios from 'axios'
import moment from 'moment'


//curl -X GET "https://api-v3.mbta.com/trips?page%5Boffset%5D=0&page%5Blimit%5D=10&include=stops&filter%5Bid%5D=CR-479322-401" -H  "accept: application/vnd.api+json"

function Schedule({station, setStation}) {
	const [departures, setDepartures] = useState([])
	useEffect(()=>{
		axios.get(`https://api-v3.mbta.com/predictions?page%5Boffset%5D=0&page%5Blimit%5D=20&sort=departure_time&filter%5Broute_type%5D=2&filter%5Bstop%5D=${station}&filter%5Bdirection_id%5D=0&include=stop,schedule,trip`).then(({data}) => {
			const {data: predictions, included} = data
			const prepared = {}
			if(included){
				for(const record of included){
					prepared[record.id] = record
				}
			}
			for(const prediction of predictions){
				prediction.schedule = prepared[prediction.relationships?.schedule?.data.id]
				prediction.stop = prepared[prediction.relationships?.stop?.data.id]
				prediction.trip = prepared[prediction.relationships?.trip?.data.id]
				prediction.departure = prediction.attributes?.departure_time || prediction.schedule?.attributes?.departure_time
			}
			setDepartures(predictions.sort((a, b) => new Date(a.departure) - new Date(b.departure)))
		})
	}, [station])
	return <div className="Table">
		<table>
			<tbody>
				<tr>
					<th>Departure Time</th>
					<th>Destination</th>
					<th>Train</th>
					<th>Track</th>
					<th>Status</th>
				</tr>
				{departures.map((record) =>
					<tr key={record.id}>
						<td>{moment(record.departure).format('MMM Do h:mm a')}</td>
						<td>{record.trip.attributes.headsign}</td>
						<td>{record.trip.attributes?.name}</td>
						<td>{record.stop.attributes?.platform_code || record.stop.attributes?.platform_name}</td>
						<td>{record.attributes.status}</td>
					</tr>
				)}
			</tbody>
		</table>
	</div>
}

export default Schedule
