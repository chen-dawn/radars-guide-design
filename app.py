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

def serve_react_app(path=''):
    requested_path = os.path.join(app.static_folder, path)
    if path and os.path.exists(requested_path):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, 'index.html')


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_frontend(path):
    if path.startswith('tools/'):
        return {'message': 'Not found'}, 404
    return serve_react_app(path)

# API endpoint for generating guides
api.add_resource(GenerateGuidesApiHandler, '/tools/generate')

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
