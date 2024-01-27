from flask import Flask,request,jsonify
app = Flask(__name__)

# ---------------------------------------------------------
# Library : Transformer Library from Hugging Face
# Model : Distelbert Fine-Tuned 
# Dataset : SST-2 [Standforf Sentiment Treebank]

from transformers import pipeline
model_name = "distilbert-base-uncased-finetuned-sst-2-english"
model_revision = "af0f99b"

# ---------------------------------------------------------
# Pipeline is created with specific model and specific model version.
def analyze_sentiment(comment):
    sentiment_pipeline = pipeline('sentiment-analysis',model=model_name, revision=model_revision)
    result = sentiment_pipeline(comment)
    return result
# ---------------------------------------------------------

def calculate_percentage(sentiments):
    total = len(sentiments)
    positive_count = sum(1 for sentiment in sentiments if sentiment['label'] == 'POSITIVE')
    negative_count = sum(1 for sentiment in sentiments if sentiment['label'] == 'NEGATIVE')
    neutral_count = sum(1 for sentiment in sentiments if sentiment['label'] == 'NEUTRAL')
    positive_percentage = (positive_count / total) * 100
    negative_percentage = (negative_count / total) * 100
    neutral_percentage = (neutral_count / total) * 100
    return positive_percentage, negative_percentage, neutral_percentage
# ---------------------------------------------------------


# ---------------------------------------------------------
# Below Route is for calculating Positivty Rate

from nltk.sentiment import SentimentIntensityAnalyzer
@app.route('/demo', methods=['POST'])
def demo():
    try:
        json_obj=request.get_json()
        comment=json_obj['feedback_reviews']
        sid = SentimentIntensityAnalyzer()
        sentiment_score = sid.polarity_scores(comment)['compound']
        if sentiment_score >= 0.05:
            return jsonify({"reviews":"Positive"})
        elif sentiment_score <= -0.05:
            return jsonify({"reviews":"Negative"})
        else:
            return jsonify({"reviews":"Neutral"})
    except Exception as e:
        return jsonify({'error': str(e)}), 400
@app.route('/positivityrate_endpoint', methods=['POST'])
def json_endpoint():
    print("Hello World")
    try:
        json_obj=request.get_json()
        comments=json_obj["reviews"]

        positivepercentage=[]

        for x in comments:
            sentiments = []
            for comment in x:
                result = analyze_sentiment(comment)
                sentiments.extend(result)
        
            positive_percentage, negative_percentage, neutral_percentage = calculate_percentage(sentiments)
            positivepercentage.append(positive_percentage)
        print(positivepercentage)

        json_result={"positivity_rates":positivepercentage}
        return json_result

    except Exception as e:
        return jsonify({'error': str(e)}), 400



@app.route('/')
def hello():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(debug=True)
