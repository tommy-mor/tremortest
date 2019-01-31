with open ('tremorlog1-24-2019:15:57:3.txt') as f:
	b = 0
	for line in f:
		l = line.strip()
		try:
			a = l.split()[0]
			print(int(a) - b)
			b = int(a)
		except:
			pass
