var league = 2000;

setUrl(league,1);

const apiKey = "cced9426f65840e2bcac3db5188bd167";

showResults();

var url = "";
var pageCounter = 1;
var infoWrapper = document.getElementById('info');
var matchesWrapper = document.getElementById('matches');
var chooseLeague = document.querySelectorAll('.league');
var prevButton = document.getElementById('prev');
var nextButton = document.getElementById('next');

function setUrl(comp,md) {
	url = "http://api.football-data.org/v2/competitions/" + comp + "/matches?matchday=" + md;
}

function clearResults() {
	matchesWrapper.innerHTML = "";
}

function nextMatchweek() {
	pageCounter++;
	if (pageCounter > 1) {
		prevButton.style.display = 'inline-block';
	}
	setUrl(league,pageCounter);
	clearResults();
	showResults();
}

function prevMatchweek() {
	pageCounter--;
	if (pageCounter == 1) {
		prevButton.style.display = 'none';
	}
	setUrl(league,pageCounter);
	clearResults();
	showResults();
}

function showResults() {
	fetch(url, {
		method: "GET",
		headers: {
		"X-Auth-Token": apiKey
		 }
	})
		.then(response => response.json())
		.then(data => {
				
			console.log(data);
			var leagueName = data.competition.name;
			var countryName = data.competition.area.name;
			infoWrapper.innerHTML = leagueName + "/" + countryName;
				
			for (i = 0; i <= data.matches.length; i++) {
				
				var homeTeamName = data.matches[i].homeTeam.name;
				var awayTeamName = data.matches[i].awayTeam.name;
				var homeTeamScore = data.matches[i].score.fullTime.homeTeam;
				var awayTeamScore = data.matches[i].score.fullTime.awayTeam;
				var date = data.matches[i].utcDate;
				
				if (homeTeamScore == null || awayTeamScore == null) {
					homeTeamScore = '-';
					awayTeamScore = '-';
				}
				
				var newParagraph = document.createElement('p');
				matchesWrapper.appendChild(newParagraph);
				newParagraph.innerHTML = '<div class="line"><span class="home">' + homeTeamName + '</span><span class="score">' + homeTeamScore + '</span><span class="score">' + awayTeamScore + '</span><span class="away">' + awayTeamName + '</span></div>';
				
			}
				
		});
	}
	
chooseLeague.forEach((choosen)=> {
	choosen.addEventListener('click', (e) => {
		clearResults();
		league = e.target.dataset.league;
		setUrl(league,1);;
		showResults();
	})
});


prevButton.addEventListener('click', prevMatchweek);
nextButton.addEventListener('click', nextMatchweek);



					