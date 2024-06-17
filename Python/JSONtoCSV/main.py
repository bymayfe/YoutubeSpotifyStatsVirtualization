import pandas as pd

dp=pd.read_json("../../Javascript/JSON/spotify2023.json")
dp.to_csv('spotify2023.csv', index=False)
