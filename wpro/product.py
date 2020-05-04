import codecs
import json
import http.server
import socketserver

PORT = 8000

Handler = http.server.SimpleHTTPRequestHandler

class RequestHandler(Handler):
    def do_GET(self):
            path=self.path.split('/')
            if path[1] == 'teste':
                try:
                    print("./products/"+path[2]+"/config.json")
                    f = self.get_file("./products/"+path[2]+"/config.json")
                    ap = self.format_obj(f)
                    self.send_response(200)
                    self.send_header('Access-Control-Allow-Origin', '*')
                    self.send_header("Content-type", "application/json")
                    self.end_headers()
                    
                    ## print(bytes(json.dumps(ap,indent=None, sort_keys=False, ensure_ascii=False),"utf8"))
                    # self.wfile.write(bytes(json.dumps(ap,indent=None, sort_keys=False, ensure_ascii=False),"utf8"))
                    self.wfile.write(bytes(json.dumps(ap,indent=None, sort_keys=False, ensure_ascii=False),"utf8"))
                
                    return
                except IOError:
                    self.send_error(404,'File not found!')
        
    def format_obj(self, product):
        config = json.loads(product)
        for i in range(0, len(config[list(config)[0]])):
            print('1')
            secao = config[list(config)[0]][i]["seção"]
            print('2')
            config[list(config)[0]][i]["seção"]["file"] = self.get_file(secao["file"])
            print('3')
            if config[list(config)[0]][i]["seção"]["anotation"] != "":    
                config[list(config)[0]][i]["seção"]["anotation"] = self.get_file(secao["anotation"])
                print('4')
            if config[list(config)[0]][i]["subseção"]:
                for key, value in enumerate(config[list(config)[0]][i]["subseção"], start=0):
                    print('5')
                    config[list(config)[0]][i]["subseção"][key]["file"] = self.get_file(value["file"])
                    print('6')
                    if config[list(config)[0]][i]["subseção"][key]["anotation"] != "":
                        # print("Procurando por: {}".format(config[list(config)[0]][i]["subseção"][key]["anotation"]))    
                        config[list(config)[0]][i]["subseção"][key]["anotation"] = self.get_file(value["anotation"])
            else: 
                print (config[list(config)[0]][i]["subseção"])
        
        print(config)
        return config
        
    def get_file(self, url):
        f = codecs.open(url , "r", "utf-8")
        content = f.read()
        f.close()
        return content

    def return_path(self, name):
        product = {
            "AP 310":   "./products/ap310/config.json",
            "AP 360":   "./products/ap360/config.json",
            "AP 1210":  "./products/ap1210/config.json",
            "AP 1350":  "./products/ap1350/config.json",
            "AP 1750":  "./products/ap1750/config.json"
        }
        return product[name]

with socketserver.TCPServer(("127.0.0.1", PORT), RequestHandler) as httpd:
    try:
        print("Servidor rodando na porta: {}".format(PORT))
        httpd.serve_forever()
    except KeyboardInterrupt:
        httpd.socket.close()

