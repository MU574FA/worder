import random
from pathlib import Path

wordsFilePath = Path(__file__).parent / "words-en.csv"

class Worder():
    def __init__(self,
        length      : int = 0 ,
        startsWith  : str = "",
        xstartsWith : str = "",
        endsWith    : str = "",
        xendsWith   : str = "",
        includes    : str = "",
        excludes    : str = "",
        wildcard    : str = "",
        xwildcard   : str = "",

        *args, **kwargs)        -> None:

        self.length         = length
        self.startswith     = startsWith
        self.xstartswith    = xstartsWith
        self.endswith       = endsWith
        self.xendswith      = xendsWith
        self.includes       = includes
        self.excludes       = excludes
        self.wildcard       = wildcard
        self.xwildcard      = xwildcard
        self.kwargs         = kwargs
        self.args           = args

    
    @property
    def __words(self):
        with open(f"{wordsFilePath}", encoding="utf-8") as f:
            return (i.strip().upper().split(" ")[0] for i in f.readlines() if i.strip().split(" ")[0])


    def __length(self, word):
        try:

            length    = len(word)
            minLingth = int(self.length.split("-")[0 ])
            maxLingth = int(self.length.split("-")[-1])

            if   length > minLingth and length < maxLingth: 
                return True

            elif length == minLingth or length == maxLingth:
                return True 

            else:
                return False

        except Exception as e:
            return False


    def __stratswith(self, word):
        return word.startswith(self.startswith.upper())


    def __xstratswith(self, word):
        return word.startswith(self.xstartswith.upper()) == False


    def __endswith(self, word):
        return word.endswith(self.endswith.upper())
    

    def __xendswith(self, word):
        return word.endswith(self.xendswith.upper()) == False


    def __includes(self, word):
        for i in self.includes.upper():
            if i not in word:
                return False
                
        return True


    def __excludes(self, word):
        for i in self.excludes.upper():
            if i in word:
                return False
                
        return True

    def __wildcard(self, word):
        if len(word) != len(self.wildcard): return False

        for s, w in zip(self.wildcard.upper(), word.upper()):
            if s == "?":
                continue
            if s != w:
                return False
        
        return True
    
    def __xwildcard(self, word):
        if len(word) != len(self.xwildcard.split(",")[-1].strip()): return False
        res = []
        for wildcard in self.xwildcard.upper().split(","):
            for s, w in zip(wildcard.strip(), word.upper()):
                if s == "?":
                    continue
                if s == w:
                    res.append(False)
            res.append(True)
        return all(res)

    @property
    def find(self):

        words = self.__words

        if self.wildcard:
            words = filter(self.__wildcard, words)
            
        if self.length:
            words = filter(self.__length, words)
        
        if self.startswith:
            words = filter(self.__stratswith, words)
        
        if self.xstartswith:
            words = filter(self.__xstratswith, words)

        if self.endswith:
            words = filter(self.__endswith, words)
        
        if self.xendswith:
            words = filter(self.__xendswith, words)

        if self.includes:
            words = filter(self.__includes, words)

        if self.excludes:
            words = filter(self.__excludes, words)
        
        if self.xwildcard:
            words = filter(self.__xwildcard, words)


        if any([ self.wildcard, self.includes, self.excludes, self.length, self.endswith, self.startswith, self.xwildcard, self.xstartswith, self.xendswith]):
            return words

        else:
            return random.choices(list(words), k=2)




def wordle():
    with open(wordsFilePath) as f:
        words = set(i.strip().upper() for i in f.readlines() if i.strip().isalpha() and len(i.strip()) == 5)
        word = random.choice(list(words))
    return {"wordsList":list(words), "word":word.strip().upper()}
