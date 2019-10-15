
		google.charts.load('current', {'packages':['corechart']});
		google.charts.setOnLoadCallback(drawAll);
		
		// Global data for diff table
		var military_data = null;
		var military_pcap_data = null;
		var gdp_data = null;
		var gdp_pcap_data = null;
		var military_data = null;
		
		var table_url = 'https://docs.google.com/spreadsheets/d/1Njt710r2976erWl68O3qwNUa0NRmqBBPDydE_QkWGFo';
		
			
				
		function drawAll() {
			var sheetNames = {GDP: 'GDP', 
							  GDP_PCAP: 'GDP_Per_Capita', 
							  Military: 'Military_Expense',
							  Shared_Military: 'Shared_Military',
							  Shared_Military_PCAP: 'Shared_Military_PCAP',
							  Military_PCAP: 'Military_Per_Capita'
							  };
			getData(sheetNames);
			
		} //drawAllSheets
		
		function getData(sheetNames) {
			var queryString = encodeURIComponent("SELECT A, C, D, E, F, G, H, I");
			var queryGDP = new google.visualization.Query(table_url + '/gviz/tq?sheet=' + sheetNames.GDP + '&headers=1&tq=' + queryString);
			queryGDP.send(responseGDP); 
			
			var queryGDPPcap = new google.visualization.Query(table_url + '/gviz/tq?sheet=' + sheetNames.GDP_PCAP + '&headers=1&tq=' + queryString);
			queryGDPPcap.send(responseGDPPcap);
			
			var queryMilitary = new google.visualization.Query(table_url + '/gviz/tq?sheet=' + sheetNames.Military + '&headers=1&tq=' + queryString);
			queryMilitary.send(responseMilitary); 
			
			var queryMilitaryPcap = new google.visualization.Query(table_url + '/gviz/tq?sheet=' + sheetNames.Military_PCAP + '&headers=1&tq=' + queryString);
			queryMilitaryPcap.send(responseMilitaryPcap); 
			
			var querySharedMilitary = new google.visualization.Query(table_url + '/gviz/tq?sheet=' + sheetNames.Shared_Military + '&headers=1&tq=' + queryString);
			querySharedMilitary.send(responseSharedMilitary);
			
			var querySharedMilitaryPCAP = new google.visualization.Query(table_url + '/gviz/tq?sheet=' + sheetNames.Shared_Military_PCAP + '&headers=1&tq=' + queryString);
			querySharedMilitaryPCAP.send(responseSharedMilitaryPCAP);
				
		} // Get the data and call the corresponding handler	
		
		
		
		function responseMilitary(response) {
			if (response.isError()) {
				alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
				return;
			}
			var data = response.getDataTable();
			var options = {height: 400,
						   legend: { position: 'top' },
						   vAxis: {title: 'Military Expense in US Dollors ($)'},
						   hAxis: {title: 'Country'}};
			var chart = new google.visualization.ColumnChart(document.getElementById('military_expense_div'));
			chart.draw(data, options);
			military_data = data;
			if (gdp_data)
				drawDiffChart(military_data, gdp_data, 'Military_Over_GDP_div');
		}
		
		function responseSharedMilitary(response) {
			if (response.isError()) {
				alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
				return;
			}
			var data = response.getDataTable();
			var options = {height: 400,
						   legend: { position: 'top' },
						   vAxis: {title: 'Shared Military Expense over GDP (%)'},
						   hAxis: {title: 'Country'}};
			var chart = new google.visualization.ColumnChart(document.getElementById('shared_military_div'));
			chart.draw(data, options);
		}
		
		function responseSharedMilitaryPCAP(response) {
			if (response.isError()) {
				alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
				return;
			}
			var data = response.getDataTable();
			var options = {height: 400,
						   legend: { position: 'top' },
						   vAxis: {title: 'Shared Military Expense Per Capita over GDP Per Capita(%)'},
						   hAxis: {title: 'Country'}};
			var chart = new google.visualization.ColumnChart(document.getElementById('shared_military_pcap_div'));
			chart.draw(data, options);
		}

		
		function responseMilitaryPcap(response) {
			if (response.isError()) {
				alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
				return;
			}
			var data = response.getDataTable();
			military_pcap_data = data;
			var options = {height: 400,
						   legend: { position: 'top' },
						   vAxis: {title: 'Military Expense Per Capita in US Dollors ($)'},
						   hAxis: {title: 'Country'}};
			var chart = new google.visualization.ColumnChart(document.getElementById('military_expense_pcap_div'));
			chart.draw(data, options);
			
			if (gdp_pcap_data)
				drawDiffChart(military_pcap_data, gdp_pcap_data, 'Military_Over_GDP_PCAP_div');
			
		}
		
		function responseGDP(response) {
			if (response.isError()) {
				alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
				return;
			}
			var data = response.getDataTable();
			gdp_data = data;
			var options = {height: 400,
						   legend: { position: 'top' },
						   vAxis: {title: 'GDP in US Dollors ($)'},
						   hAxis: {title: 'Country'}};
			var chart = new google.visualization.ColumnChart(document.getElementById('gdp_div'));
			chart.draw(data, options);
			if (military_data) 
				drawDiffChart(military_data, gdp_data, 'Military_Over_GDP_div');
    
		}
		
		function responseGDPPcap(response) {
			if (response.isError()) {
				alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
				return;
			}
			var data = response.getDataTable();
			gdp_pcap_data = data;
			var options = {height: 400,
						   legend: { position: 'top' },
						   vAxis: {title: 'GDP Per Capita in US Dollors ($)'},
						   hAxis: {title: 'Country'}};
			var chart = new google.visualization.ColumnChart(document.getElementById('gdp_pcap_div'));
			chart.draw(gdp_pcap_data, options);
			if (military_pcap_data) 
				drawDiffChart(military_pcap_data, gdp_pcap_data, 'Military_Over_GDP_PCAP_div');
    
		}		
		
		
		function drawDiffChart(data_new, data_old, div_name) {
			var chartDiff = new google.visualization.ColumnChart(document.getElementById(div_name));
			var diffData = chartDiff.computeDiff(data_old, data_new);
			var new_name = div_name.split('_')[0]
			var old_name = div_name.split('_')[2]
			var chart_name = div_name.substring(0, div_name.length-3).split('_').join(' ');
			console.log(chart_name);
			var options = { legend: { position: 'top' },
							diff: { newData: { widthFactor: 0.6, tooltip : {prefix : new_name} },
									oldData: { opacity: 1, color: 'yellow', tooltip: {prefix: old_name}}},
							height: 400,
							vAxis: {title: chart_name},
							hAxis: {title: 'Country'}};
			chartDiff.draw(diffData, options);
		}
		
