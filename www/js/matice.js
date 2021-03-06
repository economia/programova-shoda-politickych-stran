var padding = 100

var width = 670;
	height = 670;

var svg = d3.select("body").append("svg")
	.attr("width", width )
	.attr("height", height);

var colorScale = d3.scale.linear()
		.domain([4, 30, 45,  55])
		.range(["#D7191C", "#FDAE61", "#A6D96A", "#008837"])

var strany = ["ANO", "Úsvit", "TOP 09", "Zelení", "SSČR", "Svobodní", "SPOZ", "Cibulka", "Piráti", "Občané", "ODS", "LEV 21", "KSČM", "Koruna", "KDU-ČSL", "KAN", "Změna", "Hlavu v.", "DSSS", "ČSSD"]

var celeStrany = ["ANO", "Úsvit přímé demokracie", "TOP 09", "Strana zelených", "Strana soukromníků ČR", "Strana svobodných občanů", "SPOZ", "Pravý blok Petra Cibulky", "Pirátská strana", "Občané 2011", "ODS", "LEV 21", "KSČM", "Koruna česká", "KDU-ČSL", "Klub angažovaných nestraníků", "Hnutí změna", "Hlavu vzhůru", "DSSS", "ČSSD"]

var scale = d3.scale.ordinal()
			.domain(strany)
			.rangePoints([0, width - padding - 27])

var xAxis = d3.svg.axis()
		.scale(scale)
		.orient("bottom")

var yAxis = d3.svg.axis()
		.scale(scale)
		.orient("right")

var div = d3.select("body").append("div")
				.attr("class", "tooltip")
				.style("opacity", 0)

var dataset = [-1, 44.5, 43.5, 43.25, 39.25, 25, 43.5, 39.25, 40, 43.25, 35.5, 31.5, 36.75, 43.25, 44.5, 39.75, 40.75, 29.75, 33.5, 35.75,
44.5, -1, 46.5, 39.25, 38.25, 31, 38.5, 40.25, 43, 42.25, 37.5, 29.25, 30, 48.25, 41.25, 37.5, 36.75, 26.5, 34.5, 30.5,
43.5, 46.5, -1, 41.25, 33.25, 30, 38.5, 37.25, 40, 39.25, 41.5, 28.25, 30.75, 47.25, 46.25, 42.75, 34, 32.75, 29.5, 34.75,
43.25, 39.25, 41.25, -1, 36, 22.75, 44.25, 42, 46.75, 46, 26.25, 38.25, 42.75, 40, 41.25, 35.5, 46.75, 20.5, 39.25, 41.5,
39.25, 38.25, 33.25, 36, -1, 28.75, 36.25, 39, 33.75, 43, 31.25, 25.25, 35.75, 37, 37.25, 33.5, 34.75, 35.5, 37.25, 26.5,
25, 31, 30, 22.75, 28.75, -1, 22, 30.75, 32.5, 24.75, 32, 26.5, 20.75, 32.75, 26, 24.75, 19.5, 30.75, 23.75, 19.5,
43.5, 38.5, 38.5, 44.25, 36.25, 22, -1, 46.25, 39.75, 50.25, 29.5, 34.5, 43, 39.25, 40.5, 38.75, 41.75, 30.75, 38.5, 43.75,
39.25, 40.25, 37.25, 42, 39, 30.75, 46.25, -1, 39.75, 49, 31.25, 33.25, 37.75, 41, 36.25, 34.5, 38.75, 32.5, 42.25, 37.5,
40, 43, 40, 46.75, 33.75, 32.5, 39.75, 39.75, -1, 44.75, 29, 35.75, 36.5, 41.75, 34, 33.25, 43, 24.25, 38, 37.25,
43.25, 42.25, 39.25, 46, 43, 24.75, 50.25, 49, 44.75, -1, 32.25, 32.25, 41.75, 43, 44.25, 38.5, 44.75, 30.5, 44.25, 40.5,
35.5, 37.5, 41.5, 26.25, 31.25, 32, 29.5, 31.25, 29, 32.25, -1, 19.75, 22, 42.25, 39.25, 32.5, 24.5, 32.75, 23.25, 23.5,
31.5, 29.25, 28.25, 38.25, 25.25, 26.5, 34.5, 33.25, 35.75, 32.25, 19.75, -1, 32.25, 28.25, 27.75, 23.5, 32, 18.75, 30.5, 33.75,
36.75, 30, 30.75, 42.75, 35.75, 20.75, 43, 37.75, 36.5, 41.75, 22, 32.25, -1, 32.75, 34.75, 27.5, 38.5, 22.75, 36.75, 38.5,
43.25, 48.25, 47.25, 40, 37, 32.75, 39.25, 41, 41.75, 43, 42.25, 28.25, 32.75, -1, 45.25, 41.5, 35.75, 33.5, 31.25, 32.5,
44.5, 41.25, 46.25, 41.25, 37.25, 26, 40.5, 36.25, 34, 44.25, 39.25, 27.75, 34.75, 45.25, -1, 39.25, 36.5, 33.5, 29.5, 36.25,
39.75, 37.5, 42.75, 35.5, 33.5, 24.75, 38.75, 34.5, 33.25, 38.5, 32.5, 23.5, 27.5, 41.5, 39.25, -1, 33.25, 31, 26.25, 31,
40.75, 36.75, 34, 46.75, 34.75, 19.5, 41.75, 38.75, 43, 44.75, 24.5, 32, 38.5, 35.75, 36.5, 33.25, -1, 21, 33.75, 36,
29.75, 26.5, 32.75, 20.5, 35.5, 30.75, 30.75, 32.5, 24.25, 30.5, 32.75, 18.75, 22.75, 33.5, 33.5, 31, 21, -1, 28.25, 25,
33.5, 34.5, 29.5, 39.25, 37.25, 23.75, 38.5, 42.25, 38, 44.25, 23.25, 30.5, 36.75, 31.25, 29.5, 26.25, 33.75, 28.25, -1, 35.25,
35.75, 30.5, 34.75, 41.5, 26.5, 19.5, 43.75, 37.5, 37.25, 40.5, 23.5, 33.75, 38.5, 32.5, 36.25, 31, 36, 25, 35.25, -1];

var otazky = ["Senát by měl být i nadále zachován.", "Tzv. babyboxy by měly být i nadále zachovány.", "V ČR by měla být i nadále povolena stavba mešit.", "Prezident by měl být i nadále volen přímo občany.", "Zaměstnavatel by měl mít možnost dát výpověď bez udání důvodu.", "Měla by být zavedena možnost eutanázie.", "ČR by měla i nadále usilovat o přijetí eura.", "Prezident by měl mít i nadále možnost udělovat milost.", "Daň ze zisku velkých komunikačních firem by se měla zvýšit alespoň na 30 %.", "Státní instituce by měly být rozmísťovány rovnoměrně po celém území ČR.", "Stát by měl finančně podporovat vznik sítě romských asistentů prevence kriminality.", "Mělo by být zřízeno specializované státní zastupitelství pro boj proti korupci.", "Sazba DPH na některé položky by měla být nulová.", "Kouření v restauracích by mělo být zakázáno.", "Maximální výše schodku státního rozpočtu by měla být omezena zákonem.", "Český telekomunikační úřad by měl v podmínkách aukce na LTE sítě vyhradit část spektra v pásmu 800 MHz pro nové hráče.", "Vydávání majetku církvím v rámci tzv. církevních restitucí by mělo být zastaveno.", "Občané by měli mít možnost předložit návrh zákona pomocí petice.", "Reklama na léky hrazené ze zdravotního pojištění by měla být zakázána.", "Homosexuální páry by měly mít stejná práva na adopci dětí jako heterosexuální páry.", "Limity těžby uhlí v ČR by měly být zachovány.", "ČR by měla být i nadále členem NATO.", "Měla by existovat možnost vypsání celostátního referenda na základě petice.", "Poplatek za prázdná paměťová média by měl být zachován.", "Státní podpora stavebního spoření by měla být zachována.", "Zdraví škodlivé potraviny (např. limonády, cukrovinky, hranolky) by měly mít vyšší sazbu DPH.", "Měly by být zavedeny tzv. registrační pokladny.", "Marihuana by měla být legalizována.", "Měla by vzniknout státem vlastněná banka jako alternativa komerčních bank.", "Data vytvářená veřejnou správou by měla být poskytována zdarma a ve strojově čitelné podobě.", "Vlastnická struktura všech akciových společností by měla být dohledatelná na internetu.", "ČR by měla být i nadále členem EU.", "Stát by měl omezovat výrobu potravin z geneticky modifikovaných organizmů.", "Stát by měl garantovat základní připojení k internetu pro všechny občany.", "Obchodní řetězce by měly nabízet povinně předepsaný podíl potravin od českých výrobců.", "Měla by existovat povinnost prokázat původ určitého majetku s možností zabavení neprokázaného majetku.", "Pacienti by měli mít možnost připlatit si za nadstandardní zdravotní péči.", "Stahování \"pirátského\" obsahu z internetu by mělo být trestné.", "Systém datových schránek by se měl otevřít pro více provozovatelů.", "Regulační zdravotnické poplatky by měly být zachovány.", "V sociálně vyloučených lokalitách by měly být zakázány hazardní přístroje.", "Kontrolní pravomoci NKÚ by měly být rozšířeny na samosprávy a obchodní společnosti s vlastnickou účastí veřejné správy.", "Minimální hrubá mzda by měla být nejméně 10 000 Kč měsíčně.", "Pro obsazování volených funkcí by měly být zavedeny kvóty pro ženy.", "Občané docházející na pravidelné preventivní prohlídky by měli platit nižší zdravotní pojištění.", "Účetnictví politických stran včetně smluv a dokladů by mělo být pravidelně zveřejňováno na internetu.", "Poskytovatelé připojení k internetu by měli dodržovat tzv. síťovou neutralitu.", "Armáda ČR by se měla účastnit zahraničních vojenských misí.", "Domácí porody by měly být trestné.", "Stát by měl pravidelně zveřejňovat platy a odměny vrcholných politiků a vysokých státních úředníků.", "Tzv. 2. pilíř důchodového systému by měl být zachován.", "Na pozice v dozorčích a správních radách obchodních společností s vlastnickou účastí veřejné správy by měla být vypisována otevřená výběrová řízení.", "Stát by měl omezit přístup k webovým stránkám s obsahem nevhodným pro nezletilé.", "Těžba zemního plynu z břidlicových písků by měla být zakázána.", "Stát by měl garantovat místo v mateřské školce pro každé dítě určitého věku.", "Povinné přidávání biosložek do paliv by mělo být i nadále zachováno.", "Technické vzdělávání na středních a vysokých školách by mělo být státem podporováno na úkor jiných oborů.", "Očkování by mělo být vždy dobrovolné.", "Platnost smluv uzavřených veřejnou správnou by měla být podmíněna jejich zveřejněním v registru smluv.", "Poplatky za právníky vymáháné před exekucí po dlužnících, co dluží do 10000 Kč, by měly být omezeny zákonem pod 1000 Kč.", "Vyplácení podpory v nezaměstnanosti by mělo být vázáno na školní docházku dětí."]

var odpovedi = [
[0,1,1,1,0,1,1,0,0,0.25,1,1,1,1,1,1,0,1,0,1,1,1,1,0,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,0,1,1,1,1,0,1,1,1,1,0,1,1,1,0,1,1,1],
[1,1,1,1,0,1,0,0,0,0,0,1,0,0,1,1,0,1,1,0,1,1,1,1,1,0,0,0,0,1,1,1,1,0,0,1,1,0,1,1,1,1,0,0,1,1,0.25,1,0,1,1,1,1,1,1,0,0,0,1,1,1],
[1,1,1,1,1,0,1,1,0,1,1,1,0,0.25,1,1,0,0,0,0,1,1,0,0,1,0,0,0,0,1,0,1,1,0,0,1,1,0,1,1,1,1,0,0,1,1,1,1,0,1,1,1,0,1,1,1,0,0,1,1,1],
[1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,0,1,0,1,1,1,1,1,0,1,1,1,1],
[0,1,0,0,0,1,0,1,0,0,0,0,1,0,1,1,0,1,1,0,0,1,1,0,1,1,0,1,1,0,0,1,1,0,1,1,1,1,0,0,1,1,0,0,1,0,1,0,0,1,0,1,1,1,1,1,1,0,1,1,1],
[1,1,1,0,1,0.25,0,0,0,0,0,0,0.25,0,1,1,1,0,0,0.25,0,1,1,0,0,0,0,1,0,1,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0.25,0.25,0,0,0,1,0,0.25,0,0,0,0,0,1,1,0.25,0],
[1,1,0,1,0,0,1,0,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,0,0.25,1,1,1,0,1,1,1,1,0,1,0,1,0,0,1,1,0,0,1,1,1],
[1,1,0,1,1,0,0,0,1,0,0,0,1,0,1,1,0,1,0,0,1,1,1,0,1,1,1,0,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,0,1,1,1,1,0,1,0,1,0,0,1,0,0,1,1,1,1],
[1,1,1,1,0,1,0,1,0.25,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,0,0,1,0,1,1,1,1,1,0,1,1,0,1,0.25,1,1,1,0,0,1,1,0.25,0,1,0,1,0,1,1,0,0,1,1,1,0],
[1,1,0,1,0,0,0,1,0,0,1,1,1,0,1,1,1,1,1,0,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,0,1,1,1,1,0,1,0,1,1,1,1,1,0,1,1,1,1],
[1,1,0.25,1,0,0,0,1,0,0,0,1,0,0,1,1,0,0,0,0,0.25,1,0,0,1,0,0,0,0,0,0,1,0,1,0,0,1,1,1,1,0.25,0,0,0,1,1,1,1,0,0.25,1,0,0,0,0,0.25,1,0,0,1,1],
[1,1,0.25,1,0,0.25,1,0,0.25,1,1,0,1,0.25,0.25,1,1,1,0.25,1,0.25,1,1,0.25,1,0.25,1,0.25,0,0.25,1,1,0.25,0.25,0.25,1,0,0,1,0,1,1,0.25,1,1,1,0.25,0,0.25,1,0,1,0,0.25,0,0.25,0,1,1,0.25,0.25],
[0.25,1,1,1,0,0.25,1,1,1,0.25,1,0.25,1,0.25,1,1,1,1,1,0.25,0,0,1,0,1,0.25,1,0.25,1,1,1,1,0.25,1,1,1,1,0,0,0,1,1,1,0.25,1,1,1,0,0.25,1,0,0.25,0.25,0.25,1,1,0.25,0,1,1,1],
[1,1,1,0,0,0,0,1,0,0,1,1,1,0,1,1,0,1,1,0,1,1,0,0,1,0,0,0,0,1,1,1,0,0,1,0,1,0,1,1,1,1,0,0,1,1,1,1,0,1,1,1,0,0,1,0,0,0,1,1,1],
[1,1,1,1,0,0,1,1,0,0,1,1,1,0.25,1,1,0,0,0,0,0.25,1,0,0,1,0,1,0,0,1,1,1,0,0,1,1,1,1,0.25,1,1,0.25,0,0,1,1,0.25,1,0,1,0,1,1,1,1,1,1,0,1,1,1],
[1,1,0,0,0.25,0.25,0.25,1,0,1,1,1,0,1,1,0.25,0,0.25,0,0,0.25,1,0.25,0,1,0,0,0.25,0,1,1,1,1,0,1,0.25,1,1,0,1,1,1,0.25,0,0.25,1,0.25,1,0,1,1,1,0.25,0,1,1,0,0.25,1,1,1],
[1,1,0.25,1,0,1,0.25,1,0.25,0.25,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0.25,1,1,1,1,1,1,1,1,0.25,0.25,0.25,1,1,1,0.25,1,1,0.25,1,0,1,0.25,1,0.25,1,1,0.25,0.25,0.25,1,1,1],
[0,1,0,0.25,1,0,0,1,0,1,0.25,0,1,0,1,0.25,0.25,0,0,0,0,1,0,0.25,0.25,0,0.25,0,0,0.25,0,0.25,0.25,0,1,0.25,1,1,0,0,0,1,0,0,0.25,0,0.25,1,0,1,0,0.25,0,0,1,0,1,0,0.25,1,1],
[0,1,0,1,0,0.25,0,1,1,1,0,0,1,0,0,0.25,1,1,0.25,0,1,0,1,0.25,1,0,1,0,1,1,1,0,1,1,1,1,1,0,1,0,1,1,1,0,1,0,1,0,0,1,0,1,1,1,1,0.25,0,1,0,1,1],
[1,1,1,1,0,0,1,1,1,1,1,1,1,1,0,0.25,0.25,1,0,0.25,0.25,1,1,0.25,1,0,1,0,1,1,1,1,0.25,1,1,1,0,0,0,0,1,1,1,1,0.25,1,0.25,1,0,1,0,0.25,0,1,1,1,0,0,0.25,1,0]
]

var overlayOpen = 0

var xaxisContent = svg.append("g")
		.attr("class", "xaxis")
		.attr("transform", "translate(" + padding/2 + ", 26)")
		.call(xAxis)
	svg.selectAll("g.xaxis text")
		.attr("transform", "rotate(-90)")

var yaxisContent = svg.append("g")
		.attr("class", "yaxis")
		.attr("transform", "translate(" + (padding/2 - 57) + ", 61)")
		.call(yAxis)

function opovedText(odpoved) {
	if (odpoved == 1) {
		return "<td class=\"ano\">Ano</td>";
	} else if (odpoved == 0) {
		return "<td class=\"ne\">Ne</td>";
	} else {
		return "<td class=\"nevim\">Nevíme</td>";
	}
}

function overlayClose() {
	overlayOpen = 0
	div.transition()
		.duration(200)
		.style("opacity", 0)
		.style("display", "none")	
};

var values = svg.selectAll("g.value")
	.data(dataset)
	.enter()
	.append("g")
	.attr("class", "value")
	.on("mouseover", function (d, i) {
		icko = i
		svg.selectAll("rect")
			.filter(function (d, i) { 
				return ((i % 20) == (icko % 20) || Math.floor(i / 20) == Math.floor(icko / 20) ) 
			})
			.attr("class", "hover")
		
		xaxisContent.selectAll("text")
			.filter(function(d, i) {
				return ((i % 20) == (icko % 20))
			})
			.attr("class", "hoverBold")

		yaxisContent.selectAll("text")
			.filter(function(d, i) {
				return (i == Math.floor(icko / 20))
			})
			.attr("class", "hoverBold")		


	})
	.on("mouseout", function (d, i) {
		icko = i
		svg.selectAll("rect")
			.filter(function (d, i) {
				return ((i % 20) == (icko % 20) || Math.floor(i / 20) == Math.floor(icko / 20) ) 
			})
			.attr("class", "")
		xaxisContent.selectAll("text")
			.filter(function(d, i) {
				return ((i % 20) == (icko % 20))
			})
			.attr("class", "")		

		yaxisContent.selectAll("text")
			.filter(function(d, i) {
				return (i == Math.floor(icko / 20))
			})
			.attr("class", "")		
	})
	.on("click", function(d, i) {
		var tabulka = "<table><col width=\"300\"><col width=\"70\"><col width=\"70\"><tr><td><a href=\"#\" onclick=\"overlayClose();\"><img src=\"./close.png\"></a></td><td>" + celeStrany[i % 20] + "</td><td>" + celeStrany[Math.floor(i / 20)] + "</td></tr></table><div id = \"tabl\"><table id = \"tabulka\"><col width=\"300\"><col width=\"70\"><col width=\"70\">"
		if (d != -1) {
			if (overlayOpen == 0) {
				overlayOpen = 1
				div.style("display", "block")
				.transition()
					.duration(200)
					.style("opacity", 1)
				for (var q = 0; q < otazky.length; q++) {
					tabulka = tabulka + "<tr><td class=\"otazka\">" + otazky[q] + "</td>" + opovedText(odpovedi[i % 20][q]) + opovedText(odpovedi[Math.floor(i / 20)][q]) + "</tr>"
				}
				tabulka = tabulka + "</table></div>"
				div .html(tabulka)
				document.getElementById("tabl").focus()
			} else {
				overlayClose();	
			}			
		} else {
			overlayClose();			
		}		
	});
	$(document).keyup(function(e) {
  		if (e.keyCode == 27) { 
  			overlayClose();
  		 }
	});
	
	values.append("rect")
		.attr("x", function(d, i) {
			return (i % 20) * (width - padding)/20 + padding/2
		})
		.attr("y", function(d, i) {
			return Math.floor(i / 20) * (height - padding)/20 + padding/2
		})
		.attr("height", 25)
		.attr("width", 25)
		.attr("fill", function(d) {
			if (d == -1) {
				return "lightgray";
			} else {
				return colorScale(d);
			}
	});
	
	values.append("text")
		.attr("text-anchor", "middle")
		.text(function (d, i) {
			if (d == -1) {
				return "";
			} else {
				return Math.round(d / 0.64); //max. bodů je 64
			}
		})
		.attr("x", function(d, i) {
			return (i % 20) * (width - padding)/20 + padding/2 + 13
		})
		.attr("y", function(d, i) {
			return Math.floor(i / 20) * (height - padding)/20 + padding/2 + 15
		})
		.attr("font-family", "sans-serif")
    	.attr("font-size", "9px")
    	.attr("fill", "white");