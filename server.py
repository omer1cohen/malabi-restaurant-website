#!/usr/bin/env python3
"""
Development server for Malabi Palace with proper cache headers
"""

import http.server
import socketserver
from http.server import SimpleHTTPRequestHandler
import os
from urllib.parse import urlparse

class NoCacheHTTPRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add no-cache headers for development
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def guess_type(self, path):
        """Add proper MIME types"""
        mimetype, encoding = super().guess_type(path)
        
        # Ensure CSS files have correct MIME type
        if path.endswith('.css'):
            mimetype = 'text/css'
        elif path.endswith('.js'):
            mimetype = 'application/javascript'
        elif path.endswith('.html'):
            mimetype = 'text/html'
            
        return mimetype, encoding

if __name__ == "__main__":
    PORT = 8000
    
    # Change to the directory containing the website files
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    with socketserver.TCPServer(("", PORT), NoCacheHTTPRequestHandler) as httpd:
        print(f"Malabi Palace Premium Server running at http://localhost:{PORT}")
        print("No-cache headers enabled for development")
        print("Premium design changes will load immediately!")
        print("\nPress Ctrl+C to stop the server")
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n👋 Server stopped. Goodbye!")
            httpd.shutdown()