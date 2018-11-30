import mistune as mst
from html.parser import HTMLParser

class parsedOne(HTMLParser):
    isList = False
    lis = []

    def handle_starttag(self, tag, attrs):
        if tag == "li":
            self.isList = True

    def handle_startendtag(self,tag,attrs):
        if tag == "li":
            self.isList = True
    def handle_data(self, data):
        if self.isList:
            self.lis.append(data)
    def ini(self,theHTML):
        self.feed(theHTML)
        self.close()
        self.lis = [j for j in self.lis if j!='\n']

def classify(lis):
    res = []
    i=0
    while(i<len(lis)):
        if "\nB." in lis[i]:
            word = lis[i].split("\n")
            wordques = word[0]
            wordans = word[1:]
            res.append([wordques,wordans])
            i+=1
        else:
            j = 0
            while(i+j+1<len(lis) and ("\nB." in lis[i+j+1])):
                j = j+1
            readcont = lis[i]
            readquesint = list(map(lambda x : [x.split("\n")[0],x.split("\n")[1:]],lis[i+1:i+j+1]))
            readques = [x[0] for x in readquesint]
            readans = [x[1] for x in readquesint]
            res.append([readcont,readques,readans])
            i = i+j+1
    return res

def ques2json(ques):
    if(len(ques)==2):
        return "{\"ques\":\""+ques[0]+"\",\"ans\":"+str(ques[1]).replace("\'","\"")+",\"type\":\"word\"}"
    if(len(ques)==3):
        return "{\"cont\":\""+ques[0]+"\",\"ques\":"+str(ques[1]).replace("\'","\"")+",\"ans\":"+str(ques[2]).replace("\'","\"")+",\"type\":\"read\"}"


with open("./quiz.md","r") as mdfile:
    cont = mdfile.read()
    ps = parsedOne()
    ps.ini(mst.markdown(cont).replace("\'","’").replace("\"","“"))
    jsonstr = list(map(ques2json,classify(ps.lis)))
    res = "data='["+jsonstr[0].replace("\\n","\\\\n")
    for j in jsonstr[1:]:
        res =res+","+(j.replace("\'","’").replace("\\n","\\\\n"))
    res = res+"]'"
with open("./quiz.json","w") as jsonfile:
    jsonfile.write(res)
