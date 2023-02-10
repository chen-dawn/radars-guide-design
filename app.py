from __future__ import print_function
from flask import Flask, send_from_directory
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS  # comment this on deployment
from api.GenerateGuidesApiHandler import GenerateGuidesApiHandler
import os

app = Flask(__name__, static_url_path='', static_folder='frontend/build')
# CORS(app) #comment this on deployment
api = Api(app)


@app.route('/')
@app.route('/about')
@app.route('/guide-design-tips')
def serve_index():
    return send_from_directory(app.static_folder, 'index.html')


api.add_resource(GenerateGuidesApiHandler, '/tools/generate')


if __name__ == '__main__':
    # app.run(debug=True)
    port = int(os.environ.get('PORT', 8050))
    app.run(host='0.0.0.0', port=port)
