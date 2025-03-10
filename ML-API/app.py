from flask import Flask, request, jsonify
from first import find_by_keyword, find_for_keywords, find_for_multiple, find_similar_products, top_products, find_by_sentence, lightfm, url_to_products, name_to_ids
from flask_cors import CORS # type: ignore

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
        initial_list = data.get("objects")

        if initial_list is None:
            return jsonify({"error" : "Missing 'initial_list' key in request"}), 400
        
        id_list = name_to_ids(initial_list)
        
        prediction = find_for_multiple((id_list))

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
    
@app.route("/imagesearch", methods=["POST"])
def img():

    try:
        data = request.get_json()
        img = data.get("url")

        if img is None:
            return jsonify({"error" : "Missing 'url' in request"}), 400

        list = url_to_products(img)

        return jsonify({"products" : list})
    
    except Exception as e:
        return jsonify({"error" : str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)