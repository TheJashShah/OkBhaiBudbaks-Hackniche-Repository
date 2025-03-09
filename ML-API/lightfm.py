import numpy as np

def recommend(model, purchased_products, item_encoder, num_recommendations=5):
    product_indices = item_encoder.transform(purchased_products)

    scores = model.predict(0, np.arange(len(item_encoder.classes_)))

    top_items = np.argsort(-scores)[:num_recommendations]
    
    return item_encoder.inverse_transform(top_items)

def output(model, item_encoder, user_purchases):
    recommendations = recommend(model, user_purchases, item_encoder)
    
    return recommendations