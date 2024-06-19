Based on [lm-evaluation-harness](https://github.com/EleutherAI/lm-evaluation-harness)

To locally run an evaluation
```
pip install -r requirements.txt
export OPENAI_API_KEY=###
lm_eval \
    --model openai-chat-completions \
    --model_args model=gpt-3.5-turbo-0125 \
    --tasks drop \
    --limit 5 \
    --output_path ./output/$(date +%F:%R)-drop.json
```

To run a local HTTP server
```
npx http-server
```