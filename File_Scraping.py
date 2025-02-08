from urllib.request import urlopen
import re

url = "https://www.bbc.co.uk/weather/2642465"
#url = input("please input the url of where you want your weather from: ")

page = urlopen(url)
html_bytes = page.read()
html = html_bytes.decode("utf-8")
#print(html_bytes)
start_index = html.find("<foreignObject>") + len("foreignObject")
end_index = html.find("</foreignObject>")
Weather = html[start_index:end_index]
start_index = html.find('<title>') + len('<title>')
end_index = html.find('</title>')
place = html[start_index:end_index]
print(Weather[2:])
print("in ", place[0:(len(place) - 13)])
  
# match_results = re.search("Forecast.*s", html, re.IGNORECASE)
# match_results.group()
# print(match_results)




