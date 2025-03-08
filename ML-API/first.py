import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import MinMaxScaler
import re

from sklearn.metrics.pairwise import cosine_similarity
import random
from language_querying import string_to_tokens

from image_caption import caption_img

'''
Index(['product_id', 'product_name', 'category', 'discounted_price',
       'actual_price', 'discount_percentage', 'rating', 'rating_count',
       'about_product', 'user_id', 'user_name', 'review_id', 'review_title',
       'review_content', 'img_link', 'product_link'],
      dtype='object')
'''

data = pd.read_csv('final_updated.csv')

# print(data.columns)
def clean_text(text):
    text = text.lower()
    text = re.sub(r'\W+', ' ', text)
    return text

data['product_name'] = data['product_name'].astype(str).apply(clean_text)
data['category'] = data['category'].astype(str).apply(clean_text)
data['about_product'] = data['about_product'].astype(str).apply(clean_text)

def convert_float(text):

    return float(re.sub(r"[^\d.]", "", text)) if isinstance(text, str) and re.search(r"\d", text) else np.nan

data['discounted_price'] = data['discounted_price'].apply(convert_float)
data['actual_price'] = data['actual_price'].apply(convert_float)
data['rating'] = pd.to_numeric(data['rating'], errors='coerce')
data['rating_count'] = data['rating_count'].str.replace(",", "").astype(float)
data['discount_percentage'] = data['discount_percentage'].apply(convert_float)

data['actual_price'] = data['actual_price'].replace(["", "nan", "NaN"], np.nan)
data['actual_price'] = data['actual_price'].apply(
    lambda x: random.randint(5000, 45000) if pd.isna(x) else x
)

def top_products():

    list = []
    seen = set()

    for i in range(data.shape[0]):

        if(data['rating'][i] >= 4.5 and data['rating_count'][i] >=data['rating_count'].median()):
           
           if data['product_id'][i] not in seen:
            list.append({'Name' : data['product_name'][i], 'ID' : data['product_id'][i], 'Rating' : data['rating'][i], 'image' : data['img_link'][i]})
            seen.add(data['product_id'][i])

    return list

text_vec = TfidfVectorizer(stop_words="english", max_features=500)
text_vec_matrix = text_vec.fit_transform(data['product_name'] + " " + data['category'] + " " + data['about_product'])

scaler = MinMaxScaler()
numeric_features = data[['discounted_price', 'actual_price', 'rating', 'rating_count', 'discount_percentage']].fillna(0)
numeric_matrix = scaler.fit_transform(numeric_features)

final_matrix = np.hstack((text_vec_matrix.toarray(), numeric_matrix))

# print("After Vectorization: ")
# print(final_matrix.shape)

similarity_matrix = cosine_similarity(final_matrix)
# print("After Finding Similarity: ")
# print(similarity_matrix)

map = {}

for i in range(data.shape[0]):

    array = similarity_matrix[i].tolist()
    map[data['product_id'][i]] = array



def find_similar_products(id):

    array = map[id]

    similar_products = []

    for idx, num in enumerate(array):
        if num >= 0.7:
            similar_products.append({'Name' : data['product_name'][idx], 'ID' : data['product_id'][idx], 'similarity': num, 'image' : data['img_link'][idx], 'actual price' : data['actual_price'][idx]})

    return similar_products

def find_for_multiple(id_list):
    
    list = []
    seen = set()

    for id in id_list:
        array = find_similar_products(id)

        for i in range(len(array)):
            
            if array[i]['Name'] not in seen:
                list.append(array[i])
                seen.add(array[i]['Name'])

    return list

def find_by_keyword(keyword, top):
    keyword = keyword.lower()

    matched_products = data[
        data['product_name'].str.contains(keyword, case=False, na=False) |
        data['category'].str.contains(keyword, case=False, na=False) | 
        data['about_product'].str.contains(keyword, case=False, na=False)
    ]

    if matched_products.empty:
        return f"No Products found for '{keyword}'."
    
    top_matches = matched_products.sort_values(by=['rating', 'rating_count'], ascending=[False, False]).head(top)

    result = []
    for _, row in top_matches.iterrows():
        result.append({'Name' : row['product_name'], 'ID' : row['product_id'], 'Rating' : row['rating'], 'image' : row['img_link'], 'price' : row['actual_price']})

    return result

def find_by_sentence(sentence, top):
    nouns, nums, condition = string_to_tokens(sentence)

    all_results = []
    for word in nouns:
        results = find_by_keyword(word, top)
        if isinstance(results, str):
            continue
        all_results.extend(results)

    if not all_results:
        return "No products found."

    if condition == "above" and nums:
        all_results = [item for item in all_results if item["price"] > int(nums[0])]
    elif condition == "below" and nums:
        all_results = [item for item in all_results if item["price"] < int(nums[0])]
    elif condition == "range" and len(nums) == 2:
        all_results = [item for item in all_results if int(nums[0]) <= item["price"] <= int(nums[1])]

    all_results.sort(key=lambda x: x["Rating"], reverse=True)

    return all_results[:top] if all_results else "No products match the criteria."

def find_for_keywords(keyword_list):

    product_ids = set()

    for keyword in keyword_list:
        matches = find_by_keyword(keyword, 3)
        if isinstance(matches, list):
            product_ids.update([p['ID'] for p in matches])

        if not product_ids:
            return "No matching products found for the given keywords."
        
        return find_for_multiple(list(product_ids))
    
def url_to_products(url):

    word_list = caption_img(url)
    return find_for_keywords(word_list)
    
