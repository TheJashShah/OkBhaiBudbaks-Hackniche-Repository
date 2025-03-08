import numpy as np
import pandas as pd
import random

data = pd.read_csv('amazon.csv')
phone = pd.read_csv('phones.csv')
grocery = pd.read_csv('grocery.csv')

grocery.rename(columns={'description' : 'about_product'}, inplace=True)

product_id = [(i + 985) for i in range(grocery.shape[0])]
grocery['product_id'] = product_id

print(grocery.shape)
grocery = grocery[:1500]

for i in range(phone.shape[0]):
    phone['rating_count'][i] = phone['rating_count'][i].replace("Ratings", "")

new = pd.concat([data, phone])

rating_count = [random.randint(1235, 34590) for i in range(grocery.shape[0])]
grocery['rating_count'] = rating_count

for i in range(grocery.shape[0]):

    if grocery['rating'][i] == "":
        grocery['rating'][i] = random.uniform(2.7, 4.8)

new = pd.concat([new, grocery])
new.to_csv('try.csv')