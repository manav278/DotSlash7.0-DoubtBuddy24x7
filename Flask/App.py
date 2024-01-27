from flask import Flask
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

@app.route('/')
def hello():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(debug=True)
