export class workData{

	constructor(){
		this.workData = {
			veryLow: {
				minGain: 15,
				maxGain: 20,
				nonDegree:['Service Crew','Cashier','Dishwasher'],
				degree:{
					'College of Law':['Legislator'],
					'Education':['Teacher'],
				}
			},
			low: {
				minGain: 40,
				maxGain: 60,
				nonDegree:{

				},
				degree:{
					
				}
			},
			average: {
				minGain: 100,
				maxGain: 130,
				nonDegree:{

				},
				degree:{
					
				}
			},
			high: {
				minGain: 150,
				maxGain: 175,
				nonDegree:{

				},
				degree:{
					
				}
			},
			veryHigh: {
				minGain: 200,
				maxGain: 250,
				nonDegree:{

				},
				degree:{
					
				}
			},
		};
		this.acceptedWorkName;
		this.acceptedWorkGain;
	}	

}