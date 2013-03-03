var capteurs = [
	{
		name: "GPS",
		type: "GPS",
		values: [
			{
				name: "Latitude Degrés",
				type: ["map", "raw"],
				unit: "°"
			},
			{
				name: "Latitude Minutes",
				type: ["map", "raw"],
				unit: "'"
			},
			{
				name: "Longitude Degrés",
				type: ["map", "raw"],
				unit: "°"
			},
			{
				name: "Longitude Minutes",
				type: ["map", "raw"],
				unit: "'"
			},
		]
	},
	{
		name: "Acceleromètre",
		type: "accelero",
		values: [
			{
				name: "Accélération",
				type: ["graph", "gauge", "raw"],
				unit: "G"
			},
		]
	},
	{
		name: "Humidité",
		type: "hum",
		values: [
			{
				name: "Humidité",
				type: ["graph", "gauge", "raw"],
				unit: "%RH"
			},
			{
				name: "Température Intérieure",
				type: ["graph", "gauge", "vgauge", "raw"],
				unit: "°C"
			},
		]
	},
	{
		name: "Pression",
		type: "press",
		values: [
			{
				name: "Pression",
				type: ["graph", "gauge", "raw"],
				unit: "hPa"
			},
		]
	},
	{
		name: "Temperature Exterieure",
		type: "temp",
		values: [
			{
				name: "Temperature",
				type: ["graph", "gauge", "vgauge", "raw"],
				unit: "°C"
			},
		]
	},
	{
		name: "Tension Batterie",
		type: "analog",
		values: [
			{
				name: "Tension",
				type: ["graph", "gauge", "raw"], 
				unit: "V"
			},
		]
	},
];