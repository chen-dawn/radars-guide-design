# RADARS Guide Design Tool

Web application for generating RADARS guide candidates from transcript sequence input.

Live app:
- https://radars-guide-design.herokuapp.com/

## Stack

- Backend: Flask + Flask-RESTful
- Frontend: React + MUI
- Deployment: Heroku

## Project Structure

- `app.py`: Flask entrypoint and static file serving
- `api/GenerateGuidesApiHandler.py`: guide-generation API endpoint and logic
- `frontend/src/`: React source
- `frontend/build/`: production frontend bundle served by Flask
- `Procfile`: Heroku web process
- `requirements.txt`: Python dependencies
- `.python-version`: Python runtime for Heroku

## Local Development

### Backend

Create a virtual environment and install Python dependencies:

```bash
uv venv .venv
uv pip install -r requirements.txt
uv run python app.py
```

The backend runs on `http://localhost:5000` by default.

### Frontend

From the `frontend/` directory:

```bash
npm install
npm start
```

The frontend runs on `http://localhost:3000`.

If you want the React dev server to call a non-default backend URL, set:

```bash
REACT_APP_API_URL=http://localhost:5001/tools/generate
```

## Deployment

GitHub is the source repository and Heroku serves the Flask app plus the built React frontend.

Deploy to Heroku:

```bash
git push heroku master
```

If the frontend source changes, rebuild the production bundle before deploy:

```bash
cd frontend
node node_modules/react-scripts/bin/react-scripts.js build
```

## Notes

- The app now forces HTTPS redirects in production on Heroku.
- Heroku serves the built frontend from `frontend/build`.
- The `Preview Table` button in the UI is for local visual testing when the API is not running.
