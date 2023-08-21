document.addEventListener('alpine:init', () => {

    Alpine.data('TaxiQueue', () => {

        return {
            version: 'no-api-1.0',
			waitingPassengers : 0,
			waitingTaxi : 0,
			departingTaxi : 0,
            joinQueue() {
				return this.waitingPassengers++;
				
            },
            leaveQueue() {
				return this.waitingPassengers--;

            },

            joinTaxiQueue() {
				return this.waitingTaxi++;

            },

            queueLength() {
				return this.waitingPassengers

            },

            taxiQueueLength() {
				return this.waitingTaxi

            },

            taxiDepart() {
				if (this.waitingPassengers >= 12 && this.waitingTaxi >=1) {
					console.log(this.waitingTaxi);
					this.waitingPassengers -=12;
					this.waitingTaxi--;
					this.departingTaxi++;
				}

            }
        }

    });

});




