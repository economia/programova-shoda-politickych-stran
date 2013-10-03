# coding=utf-8
import csv

f = open('/Users/jancibulka/DEVEL/IHNED/programova-shoda-politickych-stran/data/vystup.csv', 'w')

def compare(a, b):
	print a
	print b
	if (a == 'Nevíme' or b == 'Nevíme'):
		return 0.25
	elif (a != b):
		return 0
	else:
		return 1

with open('../data/volebni_kalkulacka_data.csv', 'rb') as csvfile:
	reader = csv.reader(csvfile, delimiter=';', quotechar='"')
	for row in reader:
		mustr = row
		print mustr[0]
		with open('../data/volebni_kalkulacka_data.csv', 'rb') as csvfile:
			xreader = csv.reader(csvfile, delimiter=';', quotechar='"')
			for xrow in xreader:
				print xrow[0]
				radek = []
				radek.append(str(mustr[0]) + ' - ' + str(xrow[0]))
				for i in range(1, len(row) - 0):
					radek.append(compare(mustr[i],xrow[i]))
				f.write(str(radek).encode('utf-8') + '\n')
f.close()