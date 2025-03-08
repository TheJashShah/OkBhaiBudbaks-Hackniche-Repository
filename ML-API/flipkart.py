import pandas as pd

'''
Electronics|Phone, Mobile|Touchscreen|Smartphone
'''

'''
Index(['product_id', 'product_name', 'category', 'discounted_price',
       'actual_price', 'discount_percentage', 'rating', 'rating_count',
       'about_product', 'img_link', 'product_link'],
      dtype='object')
'''

data = pd.read_csv('flipkart.csv')

data = data[['product_id', 'product_name', 'category', 'discounted_price', 'actual_price', 'discount_percentage', 'rating', 'rating_count', 'about_product', 'img_link', 'product_link']]

for i in range(data.shape[0]):
    data['category'][i] = 'Electronics|Phone, Mobile|Touchscreen|Smartphone'

data = data[1:]

data.to_csv('phones.csv')