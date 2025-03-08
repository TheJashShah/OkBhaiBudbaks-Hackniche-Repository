import pandas as pd

'''
Index(['uniq_id', 'crawl_timestamp', 'product_url', 'product_name',
       'product_category_tree', 'pid', 'retail_price', 'discounted_price',
       'image', 'is_FK_Advantage_product', 'description', 'product_rating',
       'overall_rating', 'brand', 'product_specifications'],
      dtype='object')
'''

data = pd.read_csv('flipkart.csv')

data_modified = data[['product_name', 'product_category_tree', 'pid', 'retail_price', 'discounted_price', 'image', 'description', 'product_rating']]
data_modified.dropna(axis=0, how="any", inplace=True)

for i in range(data_modified.shape[0]):
    
    if data_modified['product_rating'][i] == "No rating available":
        data_modified['product_rating'][i] = data_modified['product_rating'].mean()

data_modified.to_csv('modified.csv')