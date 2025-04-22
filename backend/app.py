
from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM

app = Flask(__name__)
CORS(app)

# Load the model and tokenizer
model_path = "backend/Ara"
print("==== LOADING MODEL =====")
tokenizer = AutoTokenizer.from_pretrained(model_path)
model = AutoModelForCausalLM.from_pretrained(model_path)
model = model.to('cuda')
print("==== MODEL LOADED =====")



# Set pad token if not set
if tokenizer.pad_token is None:
    tokenizer.pad_token = tokenizer.eos_token

@app.route('/generate-chapter', methods=['POST'])
def generate_chapter():
    print("==== GENERATE CHAPTER =====")
    try:
        data = request.json
        topic = data.get('topic')
        
        if not topic:
            return jsonify({'error': 'Topic is required'}), 400

        # Prepare the prompt
        sys_prompt = "أنت كاتب مبدع وخبير في أدب الأطفال والناشئة. مختص في إنشاء الفصل التالي .يجب ان يحتوي الفصل التالي على 500 كلمة كحد أدنى"
        usr_prompt = f"قم بإنشاء الفصل الاول استنادا فقط الى الفكرة الرئيسية: الفكرة الرئيسية للقصة هي {topic}.\n"
        prompt = f"{sys_prompt}\n{usr_prompt}"

        # Tokenize
        encoded_input = tokenizer(prompt, return_tensors="pt", padding=True, truncation=True, max_length=512)
        input_ids = encoded_input.input_ids.to('cuda')
        attention_mask = encoded_input.attention_mask.to('cuda')

        # Generate text
        output_ids = model.generate(
            input_ids=input_ids,
            attention_mask=attention_mask,
            max_length=1000,
            do_sample=True,
            top_k=50,
            top_p=0.95,
            num_return_sequences=1,
        )

        # Decode the generated text
        generated_text = tokenizer.decode(output_ids[0], skip_special_tokens=True)
        
        return jsonify({'chapter': generated_text})

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': 'Failed to generate chapter'}), 500

if __name__ == '__main__':
    app.run(port=8163)
