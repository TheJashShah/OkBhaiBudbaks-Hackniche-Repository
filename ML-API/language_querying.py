'''
Will support basic querying such as -> phones below 10000, laptop in range 60000-80000
'''
import nltk

def string_to_tokens(sentence):

    words = sentence.split(" ")
    ints = []
    condition = []
    nouns = []

    result = nltk.pos_tag(words)

    for word in words:
        if word.isnumeric():
            ints.append(word)

        elif (word.lower() in ["below", "above", "range"]):
            condition.append(word)

    for w, tag in result:
        if tag in ['NN', 'NNS', 'NNPS', 'NNP'] and w not in condition:
            nouns.append(w)

    return nouns, ints, condition
            


