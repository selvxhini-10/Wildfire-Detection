from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from ultralytics import YOLO
from PIL import Image
import io

app = FastAPI()

# CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # change to your frontend domain in production
    allow_methods=["*"],
    allow_headers=["*"],
)

model = YOLO("best.pt")  

@app.post("/ai_classifier")
async def ai_classifier(file: UploadFile = File(...)):
    contents = await file.read()
    image = Image.open(io.BytesIO(contents))
    results = model(image)

    detections = []
    for box in results[0].boxes:
        cls_id = int(box.cls[0].item())
        label = model.names[cls_id]   # e.g. "person", "car", etc.
        confidence = float(box.conf[0].item())
        xyxy = box.xyxy[0].tolist()   # [x1, y1, x2, y2]

        detections.append({
            "label": label,
            "confidence": round(confidence, 3),
            "bbox": xyxy
        })

    return {"detections": detections}



