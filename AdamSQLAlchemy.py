import json
import xmltodict
with open("siri.xml") as xml_file:
    data_dict = xmltodict.parse(xml_file.read())

json_data = json.dumps(data_dict)
with open("data.json", "w") as json_file:
        json_file.write(json_data)




with open('data.json', 'r') as json_file:
    json_object = json.load(json_file)



#print(json.dumps(json_object))

json_object = (json.dumps(json_object, indent=1))

with open("Pdata.json", "w") as json_file:
        json_file.write(json_data)

