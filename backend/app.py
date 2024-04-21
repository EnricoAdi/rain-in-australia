import os
from flask import Flask, request, jsonify
import pandas as pd
import pickle
from flask_cors import CORS
pat = os.path.abspath('./backend/tree_id3_rain_in_australia.pkl')

model_file = open(pat, 'rb')
model = pickle.load(model_file)
model_file.close()

app = Flask(__name__)
CORS(app)
def dictWindDir(x):
  # print(x)
  wind_direction_dict = {
    "W": 0, "WNW": 1, "WSW": 2, "NE": 3, "NNW": 4,
    "N": 5, "NNE": 6, "SW": 7, "ENE": 8, "SSE": 9, "S": 10,
    "NW": 11, "SE": 12, "ESE": 13, "E": 14,
    "SSW": 15
  }
  return wind_direction_dict.get(x)


def dictRainToday(x):
  if x == 'Yes':
    return 1
  else:
    return 0

@app.route("/", methods=['GET'])
def index():
  return "Hello, World!!"

@app.route('/predict', methods=['GET'])
def predict(): 
  query = request.args.to_dict() 
  minTemp = query['MinTemp']
  maxTemp = query['MaxTemp']
  rainfall = query['Rainfall']
  windGustDir = dictWindDir(query['WindGustDir'])
  windGustSpeed = query['WindGustSpeed']
  windDir9am = dictWindDir(query['WindDir9am'])
  windDir3pm = dictWindDir(query['WindDir3pm'])
  windSpeed9am = query['WindSpeed9am']
  windSpeed3pm = query['WindSpeed3pm']
  humidity9am = query['Humidity9am']
  humidity3pm = query['Humidity3pm']
  pressure9am = query['Pressure9am']
  pressure3pm = query['Pressure3pm']
  cloud9am = query['Cloud9am']
  cloud3pm = query['Cloud3pm']
  temp9am = query['Temp9am']
  temp3pm = query['Temp3pm']
  rainToday = dictRainToday(query['RainToday'])

  # inputData = [7.1, 13.0, 8.8, 5, 41.0, 5, 1, 24.0, 22.0, 100.0, 98.0, 1001.7, 1005.4, 8.0, 8.0, 8.6, 11.5, 0]
  # inputData = [13.2, 18.3, 0.0, 14, 48.0, 13, 13, 24.0, 20.0, 73.0, 73.0, 1027.6, 1023.8, 4.437189, 4.503167, 14.2, 17.0, 1] 
  inputData = [minTemp, maxTemp, rainfall, windGustDir, windGustSpeed, windDir9am, windDir3pm, windSpeed9am, windSpeed3pm, humidity9am, humidity3pm, pressure9am, pressure3pm, cloud9am, cloud3pm, temp9am, temp3pm, rainToday] 
  cbPredictData = [inputData]

  cbPredictHeader = ["MinTemp", "MaxTemp", "Rainfall", "WindGustDir", "WindGustSpeed", "WindDir9am","WindDir3pm","WindSpeed9am","WindSpeed3pm","Humidity9am","Humidity3pm","Pressure9am",
  "Pressure3pm", "Cloud9am", "Cloud3pm", "Temp9am", "Temp3pm", "RainToday"]
  xCobaPredict = pd.DataFrame(data = cbPredictData, columns = cbPredictHeader)
  yCobaPredict = model.predict(xCobaPredict)
  # print(xCobaPredict)
  prediction = yCobaPredict[0]
  response = jsonify({"prediction": prediction})
  # response.headers['Access-Control-Allow-Origin'] = '*'
  print(prediction)
  return response

if __name__ == '__main__':
  app.run(debug=True)

# py app.py