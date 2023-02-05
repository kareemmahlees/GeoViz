from fastapi import FastAPI, Body

app = FastAPI()


@app.get("/analyze")
def analyze(payload=Body(...)):
    return
