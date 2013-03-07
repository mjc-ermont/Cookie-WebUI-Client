var capteurs = [
	{
		name: "GPS",
		type: "GPS",
		values: [
			{
				name: "Latitude Degrés",
				type: ["map"],
				unit: "°"
			},
			{
				name: "Latitude Minutes",
				type: ["map"],
				unit: "'"
			},
			{
				name: "Longitude Degrés",
				type: ["map"],
				unit: "°"
			},
			{
				name: "Longitude Minutes",
				type: ["map"],
				unit: "'"
			},
			{
				name: "Temps UTC",
				type: ["map"],
				unit: "H"
			},
			{
				name: "Altitude",
				type: ["graph", "raw"],
				unit: "M"
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
				unit: "G"
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
				unit: "%RH"
			},
			{
				name: "Température Intérieure",
				type: ["graph", "raw"],
				unit: "°C"
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
				unit: "hPa"
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
				unit: "°C"
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
				unit: "V"
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
				unit: "hPa"
			}
		]
	},
];
