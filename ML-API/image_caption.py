from transformers import AutoProcessor, AutoModelForImageTextToText, pipeline, AutoTokenizer
import requests
from PIL import Image
import warnings
warnings.filterwarnings("ignore")

import nltk

pipe = pipeline("image-to-text", model="Salesforce/blip-image-captioning-base")
model="Salesforce/blip-image-captioning-base"

def caption_img(url):
    image = Image.open(requests.get(url, stream=True).raw)
    image_processor = AutoProcessor.from_pretrained(model)
    model_ = AutoModelForImageTextToText.from_pretrained(model)
    tokenizer = AutoTokenizer.from_pretrained(model)

    pixel_values = image_processor(image, return_tensors="pt").pixel_values

    generated_ids = model_.generate(
        pixel_values,
        temperature=0.7,
        top_p=0.8,
        top_k=50,
        num_beams=3,
        max_new_tokens=4
    )

    text = tokenizer.batch_decode(generated_ids, skip_special_tokens=True)[0]

    word_list = []
    text_list = text.split(" ")
    result = nltk.pos_tag(text_list)

    for word, tag in result:
        if tag in ['NN', 'NNS', 'NNPS', 'NNP']:
            word_list.append(word)

    print(word_list)

caption_img('https://stripedspatula.com/wp-content/uploads/2020/12/chocolate-peanut-butter-chip-cookies-4.jpg')