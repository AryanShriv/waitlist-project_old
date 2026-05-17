import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract CSS
css_match = re.search(r'<style>(.*?)</style>', content, re.DOTALL)
if css_match:
    with open('style.css', 'w', encoding='utf-8') as f:
        f.write(css_match.group(1).strip() + '\n')
    
    # Replace style tag with link
    content = content[:css_match.start()] + '<link rel="stylesheet" href="style.css">' + content[css_match.end():]

# Extract JS
js_match = re.search(r'<script>(.*?)</script>', content, re.DOTALL)
if js_match:
    js_content = js_match.group(1).strip()
    
    with open('script.js', 'w', encoding='utf-8') as f:
        f.write(js_content + '\n')
        
    # Replace script tag with external script
    content = content[:js_match.start()] + '<script src="script.js"></script>' + content[js_match.end():]

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
