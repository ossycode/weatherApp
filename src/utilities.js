import Chart from 'chart.js/auto'


export function convertWeather( d ) {
	let celcius = Math.round(parseFloat(d.main.temp)-273.15);
	let fahrenheit = Math.round(((parseFloat(d.main.temp)-273.15)*1.8)+32); 
	
	console.log(celcius)
    console.log(fahrenheit)
}






(async function() {
  const data = [
    { year: 2010, count: 10 },
    { year: 2011, count: 20 },
    { year: 2012, count: 15 },
    { year: 2013, count: 25 },
    { year: 2014, count: 22 },
    { year: 2015, count: 30 },
    { year: 2016, count: 28 },
  ];

  new Chart(
    document.getElementById('graph'),
    {
      type: 'bar',
      options: {
        animation: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: false
          }
        },
		layout: {
            // padding:  {
			// 	top: 20,
			// 	left: 20,
			// 	right: 20,
			// 	bottom: 20,

			// }
        },
		scales: {
			xAxes: [{
				barThickness: 2,  // number (pixels) or 'flex'
                maxBarThickness: 5 // number (pixels)
			}]
		}
      },
      data: {
        labels: data.map(row => row.year),
        datasets: [
          {
            label: 'Acquisitions by year',
            data: data.map(row => row.count),
			backgroundColor: '#fcd34d',
			barThickness: 4,  // number (pixels) or 'flex'
            maxBarThickness: 5 // number (pixels)


          }
        ]
      }
    }
  );
})();
 




// export async function getAquisitionsByYear() {
//   const acquisitionsByYearQuery = {
//     dimensions: [
//       'Artworks.yearAcquired',
//     ],
//     measures: [
//       'Artworks.count'
//     ],
//     filters: [ {
//       member: 'Artworks.yearAcquired',
//       operator: 'set'
//     } ],
//     order: {
//       'Artworks.yearAcquired': 'asc'
//     }
//   };

//   const resultSet = await cubeApi.load(acquisitionsByYearQuery);

//   return resultSet.tablePivot().map(row => ({
//     year: parseInt(row['Artworks.yearAcquired']),
//     count: parseInt(row['Artworks.count'])
//   }));
// }

// export async function getDimensions() {
//   const dimensionsQuery = {
//     dimensions: [
//       'Artworks.widthCm',
//       'Artworks.heightCm'
//     ],
//     measures: [
//       'Artworks.count'
//     ],
//     filters: [
//       {
//         member: 'Artworks.classification',
//         operator: 'equals',
//         values: [ 'Painting' ]
//       },
//       {
//         member: 'Artworks.widthCm',
//         operator: 'set'
//       },
//       {
//         member: 'Artworks.widthCm',
//         operator: 'lt',
//         values: [ '500' ]
//       },
//       {
//         member: 'Artworks.heightCm',
//         operator: 'set'
//       },
//       {
//         member: 'Artworks.heightCm',
//         operator: 'lt',
//         values: [ '500' ]
//       }
//     ]
//   };

//   const resultSet = await cubeApi.load(dimensionsQuery);

//   return resultSet.tablePivot().map(row => ({
//     width: parseInt(row['Artworks.widthCm']),
//     height: parseInt(row['Artworks.heightCm']),
//     count: parseInt(row['Artworks.count'])
//   }));
// }
 