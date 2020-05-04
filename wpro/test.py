import codecs
import json

def format_obj( product):
        config = json.loads(product)
        for i in range(0, len(config[list(config)[0]])):
            secao = config[list(config)[0]][i]["seção"]
            config[list(config)[0]][i]["seção"]["file"] = get_file(secao["file"])
            for key, value in enumerate(config[list(config)[0]][i]["subseção"], start=0):
                config[list(config)[0]][i]["subseção"][key]["file"] = get_file(value["file"])
                # print("Antes do dumps")
                # print(config[list(config)[0]][i]["subseção"][key]["file"])
                # print("Depois do dumps")
                # print(json.dumps(config[list(config)[0]][i]["subseção"][key]["file"], indent=None, sort_keys=False, ensure_ascii=False))
        return config
        
def get_file( url):
    f = codecs.open(url , "r", "utf-8")
    content = f.read()
    f.close()
    return content


f = get_file("./products/ap310/config.json")
ap = format_obj(f)
print(json.dumps(ap,indent=None, sort_keys=False, ensure_ascii=False))
