var capteurs = [
	{
		name: "GPS",
		type: "GPS",
		values: [
			{
				name: "Latitude Degrés",
				type: ["map"],
				unit: "°",
				list: false,
                group: "Position"
			},
			{
				name: "Longitude Degrés",
				type: ["map"],
				unit: "°",
				list: false,
                group: "Position"
			},
    		{
				name: "Vitesse",
				type: ["graph", "raw"],
				unit: "Knots",
				list: true
			},    		{
				name: "Temps UTC",
				type: [],
				unit: "H",
				list: false
			},
			{
				name: "Altitude",
				type: ["graph", "raw"],
				unit: "M",
				list: true
			}
		]
	},
	{
		name: "Acceleromètre",
		type: "accelero",
		values: [
			{
				name: "Accélération",
				type: ["graph", "raw"],
				unit: "G",
				list: true
			}
		]
	},
	{
		name: "Humidité",
		type: "hum",
		values: [
			{
				name: "Humidité",
				type: ["graph", "raw"],
				unit: "%RH",
				list: true
			},
			{
				name: "Température Intérieure",
				type: ["graph", "raw"],
				unit: "°C",
				list: true
			}
		]
	},
	{
		name: "Pression",
		type: "press",
		values: [
			{
				name: "Pression",
				type: ["graph", "raw"],
				unit: "hPa",
				list: true
			}
		]
	},
	{
		name: "Temperature Exterieure",
		type: "temp",
		values: [
			{
				name: "Temperature",
				type: ["graph", "raw"],
				unit: "°C",
				list: true
			}
		]
	},
	{
		name: "Tension Batterie",
		type: "analog",
		values: [
			{
				name: "Tension",
				type: ["graph", "raw"],
				unit: "V",
				list: true
			}
		]
	},
	{
		name: "Pression Exterieure",
		type: "press",
		values: [
			{
				name: "Pression",
				type: ["graph", "raw"],
				unit: "hPa",
				list: true
			}
		]
	}
];
