from flask import Flask, request, jsonify
import requests
from bs4 import BeautifulSoup
import random
import time

app = Flask(__name__)

USER_AGENTS = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
    'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:40.0) Gecko/20100101 Firefox/40.0',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
]

@app.route('/search', methods=['GET'])
def search_duckduckgo():
    query = request.args.get('query')
    num_pages = int(request.args.get('pages', 1))
    
    base_url = f"https://duckduckgo.com/html/?q={query}&p={{}}"
    headers = {'User-Agent': random.choice(USER_AGENTS)}
    results = []

    for page in range(1, num_pages + 1):
        search_url = base_url.format(page)
        response = requests.get(search_url, headers=headers)

        if response.status_code == 200:
            soup = BeautifulSoup(response.text, 'html.parser')
            links = soup.find_all('a', class_='result__a')

            for link in links:
                results.append({'title': link.text, 'url': link['href']})

        time.sleep(random.uniform(2, 4))

    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)
