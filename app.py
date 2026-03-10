from __future__ import print_function
from flask import Flask, redirect, request, send_from_directory
from flask_restful import Api
from flask_cors import CORS
from api.GenerateGuidesApiHandler import GenerateGuidesApiHandler
import os
from werkzeug.middleware.proxy_fix import ProxyFix

app = Flask(__name__, static_url_path='', static_folder='frontend/build')
app.wsgi_app = ProxyFix(app.wsgi_app, x_proto=1, x_host=1)

# Enable CORS for all routes in both development and production
CORS(app, resources={r"/*": {"origins": "*"}})  # Enable CORS for all origins

api = Api(app)


@app.before_request
def enforce_https():
    if os.environ.get('DYNO') and not request.is_secure:
        secure_url = request.url.replace('http://', 'https://', 1)
        return redirect(secure_url, code=301)

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
