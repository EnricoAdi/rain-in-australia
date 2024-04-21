<h2>Rain In Australia</h2>
This is a project for my Data Mining lecture.
This project predicts whether it will rain in Australia tomorrow based on historical weather data. 
It utilizes a decision tree model trained on a Kaggle dataset and deployed as a Flask web service.
Finally, a React application provides a user interface to interact with the service.

<h2>Processes</h2>
1. Model Training (Python):
- Script to load the Kaggle weather data (rain-in-australia.csv).
- Preprocessing and feature engineering of the data.
- Training a decision tree model using the ID3 algorithm
- Saving the trained model as a pickle file (tree_id3_rain_in_australia.pkl)

2. Web Service Deployment (Python): 
- Load the pickled decision tree model.
- Define an API endpoint to receive user input for prediction.
- Use the loaded model to predict rain probability (yes / no).
- Return the prediction result as JSON.

3. React App:
- Provide a user interface for entering location data.
- Send a request to the Flask web service API endpoint with user input.
- Display the predicted rain probability received from the web service.
- Providing CSV file reader for automatic input
- Using Material UI Library
<img src="https://github.com/EnricoAdi/rain-in-australia/blob/main/ui.png?raw=true" alt="UI React" width="700">
