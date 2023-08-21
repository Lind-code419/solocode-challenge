document.addEventListener('alpine:init', () => {

	Alpine.data('TaxiQueue', () => {

		return {
			version: 'api-1.0',
			queueLength: 0,
			taxiQueueLength: 0,
			departedTaxis: 0,
			init() {
				axios
					.get('/api/passenger/queue')
					.then(result => {
						// an example API call
						this.queueLength = result.data.passenger_queue_count
					});
			},
			joinQueue() {
				//call api
				axios
					.post(`/api/passenger/join`)
					.then(result => {

						console.log(result.data.message);
						
					})

			},
			leaveQueue() {
				//call api
				axios
					.post(`/api/passenger/leave`)
					.then(result => {

						console.log(result.data.message);

					})

			},

			joinTaxiQueue() {
				//call api
				axios
					.post(`/api/taxi/join`)
					.then(result => {

						console.log(result.data.message);
						
					})
			},

			queueLength() {

			},

			taxiQueueLength() {

			},

			taxiDepart() {
				//call api
				axios
					.post(`/api/taxi/depart`)
					.then(result => {
						console.log(result.data.message);
						this.departedTaxis++
					})

			}
		}
	});

});
