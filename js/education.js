
		google.charts.load('current', {'packages':['corechart']});
		google.charts.setOnLoadCallback(drawAll);
		
		// Global data for diff table
		var education_data = null;
		var education_pcap_data = null;
		var gdp_data = null;
		var gdp_pcap_data = null;
		var military_data = null;
		
		var table_url = 'https://docs.google.com/spreadsheets/d/1Njt710r2976erWl68O3qwNUa0NRmqBBPDydE_QkWGFo';
		
			
				
		function drawAll() {
			var sheetNames = {GDP: 'GDP', 
							  GDP_PCAP: 'GDP_Per_Capita', 
							  Military: 'Military_Expense',
							  Education_PCAP: 'Education_Per_Capita',
							  Education: 'Education_Expense',
							  Shared_Education: 'Shared_Education',
							  Shared_Education_PCAP: 'Shared_Education_PCAP',
							  Education_Growth: 'Education_Growth',
							  EGP: 'Education_Growth_Percentage'};
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
			
			var queryEducationPcap = new google.visualization.Query(table_url + '/gviz/tq?sheet=' + sheetNames.Education_PCAP + '&headers=1&tq=' + queryString);
			queryEducationPcap.send(responseEducationPcap); 
			
			var queryEducation = new google.visualization.Query(table_url + '/gviz/tq?sheet=' + sheetNames.Education + '&headers=1&tq=' + queryString);
			queryEducation.send(responseEducation);
			
			var querySharedEducation = new google.visualization.Query(table_url + '/gviz/tq?sheet=' + sheetNames.Shared_Education + '&headers=1&tq=' + queryString);
			querySharedEducation.send(responseSharedEducation);
			
			var querySharedEducationPCAP = new google.visualization.Query(table_url + '/gviz/tq?sheet=' + sheetNames.Shared_Education_PCAP + '&headers=1&tq=' + queryString);
			querySharedEducationPCAP.send(responseSharedEducationPCAP);
			
			queryString = encodeURIComponent('SELECT A, B, C, D, E, F, G, H, I, J, K');
			var queryEducationGrowth = new google.visualization.Query(table_url + '/gviz/tq?sheet=' + sheetNames.Education_Growth + '&headers=1&tq=' + queryString);
			queryEducationGrowth.send(responseEducationGrowth); 	
			
			var queryEGP = new google.visualization.Query(table_url + '/gviz/tq?sheet=' + sheetNames.EGP + '&headers=1&tq=' + queryString);
			queryEGP.send(responseEGP); 	 			
		} // Get the data and call the corresponding handler	
		
		
		function responseEducationGrowth(response) {
			if (response.isError()) {
				alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
				return;
			}
			var data = response.getDataTable();
			var options = {height: 400,
						   legend: { position: 'top' },
						   vAxis: {title: 'Education Expense Growth in Us Dollars ($)'},
						   hAxis: {title: 'Year'}};
			var chart = new google.visualization.LineChart(document.getElementById('education_growth_div'));
			chart.draw(data, options);
		}
		
		function responseEGP(response) {
			if (response.isError()) {
				alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
				return;
			}
			var data = response.getDataTable();
			var options = {height: 400,
						   legend: { position: 'top' },
						   vAxis: {title: 'Education Expense Growth in Percentage (%)'},
						   hAxis: {title: 'Year'}};
			var chart = new google.visualization.LineChart(document.getElementById('education_growth_percentage_div'));
			chart.draw(data, options);
		}		
		
		function responseSharedEducation(response) {
			if (response.isError()) {
				alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
				return;
			}
			var data = response.getDataTable();
			var options = {height: 400,
						   legend: { position: 'top' },
						   vAxis: {title: 'Shared Education Expense over GDP (%)'},
						   hAxis: {title: 'Country'}};
			var chart = new google.visualization.ColumnChart(document.getElementById('shared_education_div'));
			chart.draw(data, options);
		}
		
		function responseSharedEducationPCAP(response) {
			if (response.isError()) {
				alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
				return;
			}
			var data = response.getDataTable();
			var options = {height: 400,
						   legend: { position: 'top' },
						   vAxis: {title: 'Shared Education Expense Per Capita over GDP Per Capita(%)'},
						   hAxis: {title: 'Country'}};
			var chart = new google.visualization.ColumnChart(document.getElementById('shared_education_pcap_div'));
			chart.draw(data, options);
		}

		
		function responseEducation(response) {
			if (response.isError()) {
				alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
				return;
			}
			var data = response.getDataTable();
			var options = {height: 400,
						   legend: { position: 'top' },
						   vAxis: {title: 'Education Expense in US Dollors ($)'},
						   hAxis: {title: 'Country'}};
			var chart = new google.visualization.ColumnChart(document.getElementById('education_expense_div'));
			chart.draw(data, options);
			education_data = data;
			if (gdp_data)
				drawDiffChart(education_data, gdp_data, 'Education_Over_GDP_div');
			if (military_data)
				drawDiffChart(education_data, military_data, 'Education_Over_Military_div');
		}
		
		function responseEducationPcap(response) {
			if (response.isError()) {
				alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
				return;
			}
			var data = response.getDataTable();
			education_pcap_data = data;
			var options = {height: 400,
						   legend: { position: 'top' },
						   vAxis: {title: 'Education Expense Per Capita in US Dollors ($)'},
						   hAxis: {title: 'Country'}};
			var chart = new google.visualization.ColumnChart(document.getElementById('education_expense_pcap_div'));
			chart.draw(data, options);
			
			if (gdp_pcap_data)
				drawDiffChart(education_pcap_data, gdp_pcap_data, 'Education_Over_GDP_PCAP_div');
			
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
			if (education_data) 
				drawDiffChart(education_data, gdp_data, 'Education_Over_GDP_div');
    
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
			if (education_pcap_data) 
				drawDiffChart(education_pcap_data, gdp_pcap_data, 'Education_Over_GDP_PCAP_div');
    
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
			if (education_data) 
				drawDiffChart(education_data, military_data, 'Education_Over_Military_div');    
		}
		
		
		function drawDiffChart(data_new, data_old, div_name) {
			var chartDiff = new google.visualization.ColumnChart(document.getElementById(div_name));
			var diffData = chartDiff.computeDiff(data_old, data_new);
			var new_name = div_name.split('_')[0]
			var old_name = div_name.split('_')[2]
			var chart_name = div_name.substring(0, div_name.length-3).split('_').join(' ');
			console.log(chart_name);
			var options = { legend: { position: 'top' },
							diff: { newData: { widthFactor: 0.8, tooltip : {prefix : new_name} },
									oldData: { opacity: 1, color: 'yellow', tooltip: {prefix: old_name}}},
							height: 400,
							vAxis: {title: chart_name},
							hAxis: {title: 'Country'}};
			chartDiff.draw(diffData, options);
		}
		
