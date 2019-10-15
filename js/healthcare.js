
		google.charts.load('current', {'packages':['corechart']});
		google.charts.setOnLoadCallback(drawAll);
		
		// Global data for diff table
		var healthcare_data = null;
		var healthcare_pcap_data = null;
		var gdp_data = null;
		var gdp_pcap_data = null;
		var military_data = null;
		
		var table_url = 'https://docs.google.com/spreadsheets/d/1Njt710r2976erWl68O3qwNUa0NRmqBBPDydE_QkWGFo';
		
			
				
		function drawAll() {
			var sheetNames = {GDP: 'GDP', 
							  GDP_PCAP: 'GDP_Per_Capita', 
							  Military: 'Military_Expense',
							  Healthcare_PCAP: 'Healthcare_Per_Capita',
							  Healthcare: 'Healthcare_Expense',
							  Shared_Healthcare: 'Shared_Healthcare',
							  Shared_Healthcare_PCAP: 'Shared_Healthcare_PCAP',
							  Healthcare_Growth: 'Healthcare_Growth',
							  HGP: 'Healthcare_Growth_Percentage'};
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
			
			var queryHealthcarePcap = new google.visualization.Query(table_url + '/gviz/tq?sheet=' + sheetNames.Healthcare_PCAP + '&headers=1&tq=' + queryString);
			queryHealthcarePcap.send(responseHealthcarePcap); 
			
			var queryHealthcare = new google.visualization.Query(table_url + '/gviz/tq?sheet=' + sheetNames.Healthcare + '&headers=1&tq=' + queryString);
			queryHealthcare.send(responseHealthcare);
			
			var querySharedHealthcare = new google.visualization.Query(table_url + '/gviz/tq?sheet=' + sheetNames.Shared_Healthcare + '&headers=1&tq=' + queryString);
			querySharedHealthcare.send(responseSharedHealthcare);
			
			var querySharedHealthcarePCAP = new google.visualization.Query(table_url + '/gviz/tq?sheet=' + sheetNames.Shared_Healthcare_PCAP + '&headers=1&tq=' + queryString);
			querySharedHealthcarePCAP.send(responseSharedHealthcarePCAP);
			
			queryString = encodeURIComponent('SELECT A, B, C, D, E, F, G, H, I, J, K');
			var queryHealthcareGrowth = new google.visualization.Query(table_url + '/gviz/tq?sheet=' + sheetNames.Healthcare_Growth + '&headers=1&tq=' + queryString);
			queryHealthcareGrowth.send(responseHealthcareGrowth); 	
			
			var queryHGP = new google.visualization.Query(table_url + '/gviz/tq?sheet=' + sheetNames.HGP + '&headers=1&tq=' + queryString);
			queryHGP.send(responseHGP); 	 			
		} // Get the data and call the corresponding handler	
		
		
		function responseHealthcareGrowth(response) {
			if (response.isError()) {
				alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
				return;
			}
			var data = response.getDataTable();
			var options = {height: 400,
						   legend: { position: 'top' },
						   vAxis: {title: 'Healthcare Expense Growth in Us Dollars ($)'},
						   hAxis: {title: 'Year'}};
			var chart = new google.visualization.LineChart(document.getElementById('healthcare_growth_div'));
			chart.draw(data, options);
		}
		
		function responseHGP(response) {
			if (response.isError()) {
				alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
				return;
			}
			var data = response.getDataTable();
			var options = {height: 400,
						   legend: { position: 'top' },
						   vAxis: {title: 'Healthcare Expense Growth in Percentage (%)'},
						   hAxis: {title: 'Year'}};
			var chart = new google.visualization.LineChart(document.getElementById('healthcare_growth_percentage_div'));
			chart.draw(data, options);
		}		
		
		function responseSharedHealthcare(response) {
			if (response.isError()) {
				alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
				return;
			}
			var data = response.getDataTable();
			var options = {height: 400,
						   legend: { position: 'top' },
						   vAxis: {title: 'Shared Healthcare Expense over GDP (%)'},
						   hAxis: {title: 'Country'}};
			var chart = new google.visualization.ColumnChart(document.getElementById('shared_healthcare_div'));
			chart.draw(data, options);
		}
		
		function responseSharedHealthcarePCAP(response) {
			if (response.isError()) {
				alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
				return;
			}
			var data = response.getDataTable();
			var options = {height: 400,
						   legend: { position: 'top' },
						   vAxis: {title: 'Shared Healthcare Expense Per Capita over GDP Per Capita(%)'},
						   hAxis: {title: 'Country'}};
			var chart = new google.visualization.ColumnChart(document.getElementById('shared_healthcare_pcap_div'));
			chart.draw(data, options);
		}

		
		function responseHealthcare(response) {
			if (response.isError()) {
				alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
				return;
			}
			var data = response.getDataTable();
			var options = {height: 400,
						   legend: { position: 'top' },
						   vAxis: {title: 'Healthcare Expense in US Dollors ($)'},
						   hAxis: {title: 'Country'}};
			var chart = new google.visualization.ColumnChart(document.getElementById('healthcare_expense_div'));
			chart.draw(data, options);
			healthcare_data = data;
			if (gdp_data)
				drawDiffChart(healthcare_data, gdp_data, 'Healthcare_Over_GDP_div');
			if (military_data)
				drawDiffChart(healthcare_data, military_data, 'Healthcare_Over_Military_div');
		}
		
		function responseHealthcarePcap(response) {
			if (response.isError()) {
				alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
				return;
			}
			var data = response.getDataTable();
			healthcare_pcap_data = data;
			var options = {height: 400,
						   legend: { position: 'top' },
						   vAxis: {title: 'Healthcare Expense Per Capita in US Dollors ($)'},
						   hAxis: {title: 'Country'}};
			var chart = new google.visualization.ColumnChart(document.getElementById('healthcare_expense_pcap_div'));
			chart.draw(data, options);
			
			if (gdp_pcap_data)
				drawDiffChart(healthcare_pcap_data, gdp_pcap_data, 'Healthcare_Over_GDP_PCAP_div');
			
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
			if (healthcare_data) 
				drawDiffChart(healthcare_data, gdp_data, 'Healthcare_Over_GDP_div');
    
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
			if (healthcare_pcap_data) 
				drawDiffChart(healthcare_pcap_data, gdp_pcap_data, 'Healthcare_Over_GDP_PCAP_div');
    
		}		
		
		function responseMilitary(response) {
			if (response.isError()) {a
				alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
				return;
			}
			var data = response.getDataTable();
			military_data = data;
			var options = {height: 400,
						   legend: { position: 'top' },
						   vAxis: {title: 'Military Expense in US Dollors ($)'},
						   hAxis: {title: 'Country'}};
			var chart = new google.visualization.ColumnChart(document.getElementById('military_expense_div'));
			chart.draw(military_data, options);
			if (healthcare_data) 
				drawDiffChart(healthcare_data, military_data, 'Healthcare_Over_Military_div');    
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
		
