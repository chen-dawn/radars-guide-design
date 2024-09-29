from __future__ import print_function
from flask import Flask, send_from_directory
from flask_restful import Api
from flask_cors import CORS
from api.GenerateGuidesApiHandler import GenerateGuidesApiHandler
import os

app = Flask(__name__, static_url_path='', static_folder='frontend/build')

# Enable CORS for all routes in both development and production
CORS(app, resources={r"/*": {"origins": "*"}})  # Enable CORS for all origins

api = Api(app)

# Serve React app for different routes
@app.route('/')
@app.route('/about')
@app.route('/guide-design-tips')
def serve_index():
    return send_from_directory(app.static_folder, 'index.html')

# API endpoint for generating guides
api.add_resource(GenerateGuidesApiHandler, '/tools/generate')

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))  # Change 5000 to 5001
    app.run(host='0.0.0.0', port=port)
