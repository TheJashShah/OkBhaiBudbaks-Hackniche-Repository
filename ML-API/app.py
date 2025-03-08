from flask import Flask, request, jsonify
from first import find_by_keyword, find_for_keywords, find_for_multiple, find_similar_products, top_products, find_by_sentence
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
@app.route("/searchkeyword", methods=["POST"])
def search():

    try:
        data = request.get_json()
        keyword = data.get("keyword")

        if keyword is None:
            return jsonify({"error" : "Missing 'keyword' key in request"}), 400
        
        prediction = find_by_keyword(keyword, top=5)

        return jsonify({"search" : prediction})
    
    except Exception as e:
        return jsonify({"error" : str(e)}), 500

@app.route("/searchquery", methods=["POST"])
def query():

    try:
        data = request.get_json()
        sentence = data.get("sentence")

        if sentence is None:
            return jsonify({"error" : "Missing 'keyword' key in request"}), 400
        
        result = find_by_sentence(sentence, top=10)
        return jsonify({"search" : result})
    
    except Exception as e:
        return jsonify({"error" : str(e)}), 500

@app.route("/recommendproducts", methods=["POST"])
def recommend():

    try:
        data = request.get_json()
        keyword_list = data.get("keywords")

        if keyword_list is None:
            return jsonify({"error" : "Missing 'keyword_list' key in request"}), 400
        
        prediction = find_for_keywords(list(keyword_list))

        return jsonify({"recommendation" : prediction})

    except Exception as e:
        return jsonify({"error" : str(e)}), 500
    
@app.route("/topproducts", methods=["GET"])
def top():

    try:
        top_list = top_products()

        if top_list is None:
            return jsonify({"error" : 'No List Found'}), 400

        return jsonify({"top-products" : top_list})
    
    except Exception as e:
        return jsonify({"error" : str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)