import socket
s = socket.socket()
s.bind(('0.0.0.0', 3000))
s.listen(12)
while True:
	a = int(input())
	con, addr = s.accept()
	print(addr)
	print(con.recv(1000))
	
