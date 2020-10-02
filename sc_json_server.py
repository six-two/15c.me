#!/usr/bin/env python3
from http.server import HTTPServer, SimpleHTTPRequestHandler, test
import sys
import os


class CORSRequestHandler (SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        SimpleHTTPRequestHandler.end_headers(self)


if __name__ == '__main__':
    PORT = 8000
    os.chdir('./public/')
    print(f'http://localhost:{PORT}/sc.json')
    test(CORSRequestHandler, HTTPServer, port=PORT)
